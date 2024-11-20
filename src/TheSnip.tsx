import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { PresentationControls } from "@react-three/drei";
import { Suspense, useState } from "react";
import type { FC } from "react";

const Scissors = () => {
  const scissors = useLoader(OBJLoader, "./Forbici.obj");
  const [rotationAngle, setRotationAngle] = useState(0);

  scissors.traverse((child) => {
    if (child.isObject3D && (child.name === "vt" || child.name === "f")) {
      child.rotation.z = rotationAngle;
    }
  });

  useFrame(() => {
    if (rotationAngle < Math.PI / 4) {
      setRotationAngle((prev) => prev + 0.01);
    }
  });
  return <primitive object={scissors} />;
};

interface TheSnipProps {
  className: string;
}

export const TheSnip: FC<TheSnipProps> = (props) => {
  return (
    <Canvas className={props.className}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      <PresentationControls
        enabled={true}
        global={false} // Spin globally or by dragging the model
        cursor={true} // Whether to toggle cursor style on drag
        snap={true} // Snap-back to center (can also be a spring config)
        speed={1} // Speed factor
        zoom={1} // Zoom factor when half the polar-max is reached
        rotation={[4, 1, 0.5]} // Default rotation
      >
        <Suspense fallback={null}>
          <Scissors />
        </Suspense>
      </PresentationControls>
    </Canvas>
  );
};

export default TheSnip;
