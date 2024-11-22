import { Canvas, useFrame } from "@react-three/fiber";
import {
  PresentationControls,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { Suspense, useState } from "react";
import type { FC } from "react";

interface ScissorsProps {
  closePercent: number;
}

const Scissors: FC<ScissorsProps> = (props) => {
  const { closePercent } = props;
  const { scene, animations } = useGLTF("./tailors_scissors/scene.gltf");
  const { actions, mixer } = useAnimations(animations, scene);

  actions?.Scene.play();

  // const [progress, setProgress] = useState(0);
  // const [isSnipping, setIsSnipping] = useState(true);

  // useFrame(() => {
  //   const action = actions?.Scene;

  //   if (action) {
  //     const clipDuration = action.getClip().duration;
  //     action.time = (progress / 100) * clipDuration;
  //     action.paused = true;
  //     mixer.update(0);
  //   }
  // });

  // const playToPercentage = (percent: number) => {
  //   setProgress(percent);
  //   setIsSnipping(true);
  // };

  // if (isSnipping) {
  //   setIsSnipping(false);
  // } else {
  //   playToPercentage(progress === 100 ? 0 : progress + closePercent);
  // }

  return <primitive object={scene} />;
};

interface TheSnipProps {
  className: string;
}

export const TheSnip: FC<TheSnipProps> = (props) => {
  return (
    <Canvas className={props.className}>
      <ambientLight intensity={0.75} />
      <directionalLight position={[20, 5, 25]} />
      <PresentationControls
        enabled={true}
        global={false} // Spin globally or by dragging the model
        cursor={true} // Whether to toggle cursor style on drag
        snap={true} // Snap-back to center (can also be a spring config)
        speed={1} // Speed factor
        zoom={1} // Zoom factor when half the polar-max is reached
        rotation={[0, 0.5, 0.75]} // Default rotation
      >
        <Suspense fallback={null}>
          <Scissors closePercent={100} />
        </Suspense>
      </PresentationControls>
    </Canvas>
  );
};

export default TheSnip;
