import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from '@/styles/exposition.module.scss';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
// spline
import spline from '../utils/spline';
import getStarfield from '../utils/getStarfield';


const Exposition = () => {
    const canvasRef = useRef(null);
    const [showCanvas, setShowCanvas] = useState(false);

    useEffect(() => {
        if (!showCanvas) return;

        let w = window.innerWidth;
        let h = window.innerHeight;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000000, 0.3);

        const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
        camera.position.z = 5;
        scene.add(camera);

        if (!canvasRef.current) return; // Vérifie que le canvas existe avant d'initialiser WebGLRenderer
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
        renderer.setSize(w, h);

        const renderScene = new RenderPass(scene, camera);
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 1.5, 0.4, 100);
        bloomPass.threshold = 0.002;
        bloomPass.strength = 3.5;
        bloomPass.radius = 0;


        const composer = new EffectComposer(renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);

        const stars = getStarfield();
        scene.add(stars);

        const tubeGeo = new THREE.TubeGeometry(spline, 222, 0.65, 16, true);
        const tubeColor = 0xffffff;
        const edges = new THREE.EdgesGeometry(tubeGeo, 0.2);
        const lineMat = new THREE.LineBasicMaterial({ color: tubeColor });
        const tubeLines = new THREE.LineSegments(edges, lineMat);
        scene.add(tubeLines);

        const boxGroup = new THREE.Group();
        scene.add(boxGroup);

        const size = 0.6;
        // const boxGeo = new THREE.BoxGeometry(size, size, size);
        const boxGeo = new THREE.SphereGeometry(size, 10, 10);
        const tubeLength = tubeGeo.parameters.path.getLength();
        const numBoxes = 6;
        const spacing = tubeLength / numBoxes;

        for (let i = 0; i < numBoxes; i++) {
            const p = (i + 1) / numBoxes;
            const pos = tubeGeo.parameters.path.getPointAt(p);

            const color = new THREE.Color().setHSL(0.7 + p, 1, 0.5);
            const boxMat = new THREE.MeshBasicMaterial({ color });
            const box = new THREE.Mesh(boxGeo, boxMat);

            box.name = `box-${i + 1}`;
            box.userData.id = i + 1;

            box.position.copy(pos);
            boxGroup.add(box);
        }

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        function onMouseMove(event) {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        }

        function checkIntersections() {
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(boxGroup.children);
            if (intersects.length > 0) {
                const box = intersects[0].object;
                const color = box.material.color.getStyle(); // Récupère la couleur de la sphère
                showPopup(box.userData.id, color);
                stopCamera();
            }
        }


        async function showPopup(id, color) {
            let popup = document.getElementById('popup');

            if (!popup) {
                popup = document.createElement('div');
                popup.id = 'popup';

                document.body.appendChild(popup);

                // Appliquer la classe popupVisible pour l'animation d'apparition
                setTimeout(() => {
                    popup.classList.add(styles.popupVisible);
                }, 10);
            }

            try {
                // Fetch des données depuis le fichier JSON
                const response = await fetch('/exposition.json'); // Assurez-vous que le chemin est correct
                const data = await response.json();

                // Trouver l'événement correspondant à l'id
                const event = data.find(item => item.id === id);

                if (event) {
                    // Mettre à jour le contenu du popup avec les informations de l'événement
                    popup.innerHTML = `
                        <div class="${styles.popupContent}">
                            <div class="${styles.popupContentHeader}">
                                <svg width="57" height="57" viewBox="0 0 57 57" fill="${color}" xmlns="http://www.w3.org/2000/svg"><path d="M15.4916 30.3496L0.274414 28.4129L16.1502 25.5264C21.408 24.5704 25.4766 20.3778 26.2742 15.0936L28.5286 0.157715L31.1033 15.3197C31.9814 20.4904 35.9938 24.5631 41.1508 25.5181L56.7828 28.4129L41.8192 30.3526C36.3302 31.0642 31.9627 35.3007 31.0845 40.7654L28.5287 56.6681L26.2878 40.9818C25.4921 35.4118 21.0731 31.06 15.4916 30.3496Z" fill="${color}"/></svg>
                                <small style="color:${color}">${id}/6</small>
                            </div>
                            <h2 class="${styles.popupTitle}" >${event.nom}</h2>
                            <h3 class="${styles.popupSubtitle}" style="color:${color}">${event.date}</h3>
                            <p class="${styles.popupText}">
                                ${event.description}
                            </p>
                            <button id="popupCloseButton" title="Fermer" >✕</button>
                        </div>
                    `;
                } else {
                    // Si l'événement n'est pas trouvé
                    popup.innerHTML = `
                        <div class="${styles.popupContent}">
                            <p>Événement non trouvé.</p>
                            <button class="${styles.popupCloseButton}" id="popupCloseButton">Fermer</button>
                        </div>
                    `;
                }

                // Attacher l'événement de fermeture au bouton uniquement
                const closeButton = popup.querySelector(`#popupCloseButton`);
                closeButton.addEventListener('click', closePopup);

            } catch (error) {
                console.error("Erreur lors du chargement des données :", error);
                popup.innerHTML = `
                    <div class="${styles.popupContent}">
                        <p>Erreur de chargement des informations.</p>
                        <button class="${styles.popupCloseButton}" id="popupCloseButton">Fermer</button>
                    </div>
                `;

                // Attacher l'événement de fermeture au bouton en cas d'erreur
                const closeButton = popup.querySelector(`#popupCloseButton`);
                closeButton.addEventListener('click', closePopup);
            }
        }

        function closePopup() {
            const popup = document.getElementById('popup');
            if (popup) {
                popup.classList.remove(styles.popupVisible); // Effet de disparition
                setTimeout(() => {
                    popup.remove();
                    resumeCamera();
                }, 300); // Temps d'attente pour que l'animation disparaisse
            }
        }


        let cameraSpeed = 0.35;
        let isCameraStopped = false;

        function updateCamera(t) {
            if (!isCameraStopped) {
                const time = t * cameraSpeed;
                const looptime = 20 * 1000;
                const p = (time % looptime) / looptime;
                const pos = tubeGeo.parameters.path.getPointAt(p);
                const lookAt = tubeGeo.parameters.path.getPointAt((p + 0.03) % 1);

                camera.position.copy(pos);
                camera.lookAt(lookAt);
            }
        }

        function stopCamera() {
            if (!isCameraStopped) {
                isCameraStopped = true;
                cameraSpeed *= 0.95;
                if (cameraSpeed < 0.01) {
                    cameraSpeed = 0;
                }
            }
        }

        function resumeCamera() {
            if (isCameraStopped) {
                isCameraStopped = false;
                cameraSpeed = 0.35;
            }
        }

        function animate(t = 0) {
            requestAnimationFrame(animate);
            updateCamera(t);
            composer.render(scene, camera);
        }
        animate();

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('click', checkIntersections);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('click', checkIntersections);
        };

    }, [showCanvas]);

    return (
        <>
            <Navbar />
            <div className={styles.enterExperience} id='enterButton'>
                <h1>Interactive Exposition</h1>
                <p>Explorez l'exposition interactive</p>
                <p>Utilisez votre curseur pour interagir avec les cubes</p>
                <button
                    className='button'
                    onClick={() => {
                        setShowCanvas(true);
                        document.getElementById('enterButton').style.display = 'none';
                    }}
                >Enter the Exposition</button>
            </div>

            {
                showCanvas && <canvas className='canvas' ref={canvasRef}></canvas>
            }
            <Footer />
        </>
    );
};

export default Exposition;
