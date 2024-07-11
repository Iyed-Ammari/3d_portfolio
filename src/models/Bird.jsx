import React, { useEffect, useRef } from "react";
import birdScene from "../assets/3d/bird.glb";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
const Bird = () => {
//   const axesHelper = new THREE.AxesHelper(10); // 5 is the length of the axes
// axesHelper.scale.set(10, 10, 10);
  const birdRef = useRef();

  const { scene, animations } = useGLTF(birdScene);
// scene.add(axesHelper);
  const { actions } = useAnimations(animations, birdRef);
  useEffect(() => {
    actions["Take 001"].play();
  }, []);
useFrame(({ clock, camera }) => {
  // Update the Y position to simulate bird-like motion using a sine wave
  birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2;

  // Check if the bird reached a certain endpoint relative to the camera
  


    // Check if the bird reached a certain endpoint relative to the camera
    if (birdRef.current.position.x > camera.position.x + 10) {
      // Change direction to backward and rotate the bird 180 degrees on the y-axis
      gsap.fromTo(
        birdRef.current.rotation,
        {
          y: birdRef.current.rotation.y,
        },
        {
          y: Math.PI,
          duration: 0.5,
        }
      );
  }
  if (birdRef.current.position.x < camera.position.x - 10) {
    console.log('eeeee')
      // Change direction to forward and reset the bird's rotation
    birdRef.current.rotation.y = 0;
    }

    // Update the X and Z positions based on the direction
  if (birdRef.current.rotation.y === 0) {
    // Moving forward
    birdRef.current.position.x += 0.04;
    birdRef.current.position.z -= 0.04;
  } else {
    // Moving backward
    birdRef.current.position.x -= 0.04;
    birdRef.current.position.z += 0.04;
  }
  });

  return (
    <mesh
      ref={birdRef}
      position={[-5, 2, 1]}
      scale={[0.003, 0.003, 0.003]}
      
    >
      <primitive object={scene} />
    </mesh>
  );
};

export default Bird;
