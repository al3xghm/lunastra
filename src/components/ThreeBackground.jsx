"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

const ThreeBackground = () => {
  const canvasRef = useRef(null);
  const mouse = new THREE.Vector2(0, 0);
  const lerpedMouse = new THREE.Vector2(0, 0);

  useEffect(() => {
    if (!canvasRef.current) return;

    let ww = window.innerWidth;
    let wh = window.innerHeight;
    const canvas = canvasRef.current;
    canvas.width = ww;
    canvas.height = wh;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(ww, wh);
    renderer.setClearColor(0x000000);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, ww / wh, 0.1, 1000);
    camera.position.set(0, 30, 100);

    const container = new THREE.Object3D();
    scene.add(container);

    const width = 150, height = 150;
    const center = new THREE.Vector3(0, 0, 0);
    const maxDistance = new THREE.Vector3(width * 0.5, height * 0.5).distanceTo(center);

    const geom = new THREE.BufferGeometry();
    const positions = [];

    for (let x = -width * 0.5; x < width * 0.5; x++) {
      for (let z = -height * 0.5; z < height * 0.5; z++) {
        positions.push(x * 1.2, 0, z * 1.2);
      }
    }

    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({ color: 0xffffff, size: 2, transparent: true, alphaTest: 0.4 });

    const dots = new THREE.Points(geom, mat);
    container.add(dots);

    const onMouseMove = (event) => {
      mouse.x = (event.clientX / ww) * 2 - 1;
      mouse.y = ((event.clientY / wh) * 2 - 1);
    };

    window.addEventListener("mousemove", onMouseMove);

    const ease = { hole: 0, depth: 0.5 };

    const render = (a) => {
      requestAnimationFrame(render);

      lerpedMouse.x += (mouse.x - lerpedMouse.x) * 0.1;
      lerpedMouse.y += (mouse.y - lerpedMouse.y) * 0.1;

      const positions = geom.attributes.position.array;
      const mouseEffectStrength = 15;

      for (let i = 0; i < positions.length; i += 3) {
        let dist = Math.sqrt(positions[i] ** 2 + positions[i + 2] ** 2);
        let ratio = (maxDistance - dist) / (maxDistance * 0.9);
        let ratioA = (ratio * ease.depth) + ease.hole;
        ratioA *= ratio ** 4;

        positions[i + 1] = Math.max(ratioA * -150, -100) + Math.sin(-dist * 0.4 + a * 0.004);

        const mouseDist = Math.sqrt(
          Math.pow(positions[i] - lerpedMouse.x * 75, 2) +
          Math.pow(positions[i + 2] - lerpedMouse.y * 75, 2)
        );

        if (mouseDist < mouseEffectStrength) {
          const effectStrength = Math.cos((mouseDist / mouseEffectStrength) * Math.PI * 0.5) ** 2;
          positions[i + 1] -= effectStrength * 15;
        }
      }

      geom.attributes.position.needsUpdate = true;

      camera.lookAt(new THREE.Vector3(0, -20, 0));

      renderer.render(scene, camera);
    };

    requestAnimationFrame(render);

    const onResize = () => {
      ww = window.innerWidth;
      wh = window.innerHeight;
      camera.aspect = ww / wh;
      camera.updateProjectionMatrix();
      renderer.setSize(ww, wh);
      canvas.width = ww;
      canvas.height = wh;
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default ThreeBackground;
