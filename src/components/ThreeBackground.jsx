"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

const ThreeBackground = () => {
  // Référence pour le canvas où sera affichée la scène Three.js
  const canvasRef = useRef(null);
  
  // Vecteurs pour stocker la position actuelle et interpolée de la souris
  const mouse = new THREE.Vector2(0, 0);
  const lerpedMouse = new THREE.Vector2(0, 0); // Position lissée

  useEffect(() => {
    if (!canvasRef.current) return;

    // Récupération des dimensions de l'écran
    let ww = window.innerWidth;
    let wh = window.innerHeight;

    // Récupération et configuration du canvas
    const canvas = canvasRef.current;
    canvas.width = ww;
    canvas.height = wh;

    // Création du renderer pour afficher la scène
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(ww, wh);
    renderer.setClearColor(0x000000); // Fond noir

    // Création de la scène
    const scene = new THREE.Scene();

    // Création et positionnement de la caméra
    const camera = new THREE.PerspectiveCamera(45, ww / wh, 0.1, 1000);
    camera.position.set(0, 30, 100);



    // Création d'un conteneur pour stocker les points
    const container = new THREE.Object3D();
    scene.add(container);

    // Définition de la grille
    const width = 150, height = 150;
    const center = new THREE.Vector3(0, 0, 0);
    const maxDistance = new THREE.Vector3(width * 0.5, height * 0.5).distanceTo(center);

    // Création de la géométrie pour la grille de points
    const geom = new THREE.BufferGeometry();
    const positions = [];

    // Génération des points dans une grille
    for (let x = -width * 0.5; x < width * 0.5; x++) {
      for (let z = -height * 0.5; z < height * 0.5; z++) {
        positions.push(x * 1.2, 0, z * 1.2); // Position initiale des points
      }
    }

    // Assignation des positions aux points
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));

    // Matériau des points (blancs, de taille 2)
    const mat = new THREE.PointsMaterial({ color: 0xffffff, size: 2, transparent: true, alphaTest: 0.4 });

    // Création de l'objet Three.js contenant les points
    const dots = new THREE.Points(geom, mat);
    container.add(dots);

    // Gestion du mouvement de la souris
    const onMouseMove = (event) => {
      mouse.x = (event.clientX / ww) * 2 - 1;  // Conversion de la position X en un ratio normalisé
      mouse.y = ((event.clientY / wh) * 2 - 1); // Conversion de la position Y (inversé pour correspondre au repère Three.js)
    };

    // Ajout d'un écouteur d'événements pour la souris
    window.addEventListener("mousemove", onMouseMove);

    // Variables pour contrôler l'effet de trou (animé avec GSAP)
    const ease = { hole: 0, depth: 0.5 };

    // Fonction de rendu, exécutée en boucle
    const render = (a) => {
      requestAnimationFrame(render);

      // Lissage de la position de la souris pour éviter des mouvements trop brusques
      lerpedMouse.x += (mouse.x - lerpedMouse.x) * 0.1;
      lerpedMouse.y += (mouse.y - lerpedMouse.y) * 0.1;

      // Récupération des positions des points
      const positions = geom.attributes.position.array;
      const mouseEffectStrength = 15;

      // Parcours de tous les points pour modifier leur hauteur
      for (let i = 0; i < positions.length; i += 3) {
        let dist = Math.sqrt(positions[i] ** 2 + positions[i + 2] ** 2);
        let ratio = (maxDistance - dist) / (maxDistance * 0.9);
        let ratioA = (ratio * ease.depth) + ease.hole;
        ratioA *= ratio ** 4;

        // Modifie la hauteur des points en fonction du ratio et d'une légère oscillation
        positions[i + 1] = Math.max(ratioA * -150, -100) + Math.sin(-dist * 0.4 + a * 0.004);

        // Effet dynamique sous la souris (création d'un trou)
        const mouseDist = Math.sqrt(
          Math.pow(positions[i] - lerpedMouse.x * 75, 2) +
          Math.pow(positions[i + 2] - lerpedMouse.y * 75, 2)
        );

        if (mouseDist < mouseEffectStrength) {
          const effectStrength = Math.cos((mouseDist / mouseEffectStrength) * Math.PI * 0.5) ** 2;
          positions[i + 1] -= effectStrength * 15; // Création du trou
        }
      }

      // Mise à jour des positions dans le GPU
      geom.attributes.position.needsUpdate = true;

      // Orientation de la caméra
      camera.lookAt(new THREE.Vector3(0, -20, 0));

      // Rendu de la scène
      renderer.render(scene, camera);
    };

    // Lancement du rendu en boucle
    requestAnimationFrame(render);

    // Gestion du redimensionnement de l'écran
    const onResize = () => {
      ww = window.innerWidth;
      wh = window.innerHeight;
      camera.aspect = ww / wh;
      camera.updateProjectionMatrix();
      renderer.setSize(ww, wh);
      canvas.width = ww;
      canvas.height = wh;
    };

    // Ajout de l'écouteur d'événement pour le redimensionnement
    window.addEventListener("resize", onResize);

    // Nettoyage des écouteurs d'événements et destruction du renderer lors du démontage du composant
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
    };
  }, []);

  // Retourne le canvas qui servira de support à Three.js
  return <canvas ref={canvasRef} />;
};

export default ThreeBackground;
