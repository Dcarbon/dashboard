import { OrbitControls, useProgress } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { imgsDir, imgsObject } from "src/tools/const";
import { fragmentAtmosphere, vertexAtmosphere } from "src/tools/shaders";
import {
  AdditiveBlending,
  BackSide,
  DoubleSide,
  Euler,
  TextureLoader,
} from "three";
import Model from "./Marker";

export default function CanvasEarth() {
  return (
    <Canvas gl={{ antialias: true }} dpr={[1, 2]}>
      <EarthBox scale={0.95} />
      <Suspense fallback={null}>
        <ambientLight intensity={1} color='#ffffff' />
        <pointLight color={"#ffffff"} position={[10, 10, 10]} />
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.3}
          rotateSpeed={0.2}
          enablePan={false}
          enableZoom={false}
          // enableDamping={false}
        />
      </Suspense>
      <Model />
    </Canvas>
  );
}
function EarthBox(props) {
  const earthRef = useRef(null);
  const cloudsRef = useRef(null);
  const { progress } = useProgress();
  const [imgDayMap, setimgDayMap] = useState("DayMap_quality_low");
  const [imgCloudMap, setimgCloudMap] = useState("Clouds_quality_low");
  const [colorMap, cloudsMap] = useLoader(TextureLoader, [
    imgsDir(imgsObject.Earths[imgDayMap]),
    imgsDir(imgsObject.Earths[imgCloudMap]),
  ]);
  useEffect(() => {
    if (progress === 100) {
      setimgDayMap("DayMap");
      setimgCloudMap("Clouds");
    }
  }, [progress]);

  return (
    <group>
      {/* Earth */}

      <mesh {...props} ref={earthRef} rotation={new Euler(0.26, 2.95, 0)}>
        <sphereGeometry args={[3, 90, 33]} />
        <meshStandardMaterial map={colorMap} roughness={1} metalness={0} />
      </mesh>

      {/* Cloud */}

      <mesh {...props} ref={cloudsRef}>
        <sphereGeometry args={[3, 300, 300]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.2}
          transparent={true}
          side={DoubleSide}
        />
      </mesh>

      <mesh {...props}>
        <sphereGeometry args={[3, 30, 33]} />
        <shaderMaterial
          vertexShader={vertexAtmosphere}
          fragmentShader={fragmentAtmosphere}
          blending={AdditiveBlending}
          side={BackSide}
          opacity={0.4}
          transparent={true}
        />
      </mesh>
    </group>
  );
}
