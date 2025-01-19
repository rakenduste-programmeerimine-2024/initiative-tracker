"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true });

      renderer.setSize(200, 200);

      if (containerRef.current?.children.length) {
        containerRef.current.removeChild(containerRef.current.children[0]);
      }
      containerRef.current?.appendChild(renderer.domElement);

      const loader = new THREE.TextureLoader();
      const materials = [
        new THREE.MeshBasicMaterial({ map: loader.load("/side1.png") }),
        new THREE.MeshBasicMaterial({ map: loader.load("/side2.png") }),
        new THREE.MeshBasicMaterial({ map: loader.load("/side3.png") }),
        new THREE.MeshBasicMaterial({ map: loader.load("/side4.png") }),
        new THREE.MeshBasicMaterial({ map: loader.load("/side5.png") }),
        new THREE.MeshBasicMaterial({ map: loader.load("/side6.png") }),
      ];

      const geometry = new THREE.BoxGeometry();
      const cube = new THREE.Mesh(geometry, materials);
      scene.add(cube);

      camera.position.z = 2;

      const renderScene = () => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
        requestAnimationFrame(renderScene);
      };

      const handleResize = () => {
        const width = 200;
        const height = 200;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
      };

      window.addEventListener('resize', handleResize);

      renderScene();

      return () => {

        window.removeEventListener('resize', handleResize);
        if (containerRef.current?.children.length) {
          containerRef.current.removeChild(containerRef.current.children[0]);
        }
        renderer.dispose();
      };
    }
  }, []);

  return <div ref={containerRef} />;
};

export default ThreeScene;
