import Container from "src/components/ui/Container";
import Section from "src/components/ui/Section";
import stls from "./index.module.scss";
import Heading from "src/components/ui/Heading";
import Button from "src/components/ui/Button";
import { imgsDir, imgsObject } from "src/tools/const";
import { Suspense, useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";

import { fragmentAtmosphere, vertexAtmosphere } from "src/tools/shaders";
import {
  AdditiveBlending,
  BackSide,
  DoubleSide,
  Euler,
  TextureLoader,
} from "three";
import { OrbitControls } from "@react-three/drei";
function BannerFisrt() {
  return (
    <Section
      className="relative overflow-hidden z-10"
      bgImageUrl={imgsDir(imgsObject.home_banner)}
    >
      <Container>
        <div className={`relative ${stls.box}`}>
          <div className="w-full md:w-2/3 lg:w-1/2">
            <Heading Tag={"h1"} className={stls.heading}>
              <span className={stls.strong}>Dcarbon</span> a Trustless and
              autonomous Carbon system
            </Heading>
            <p className={stls.sub_heading}>
              Accurately measure, report and verify carbon footprints reduced,
              then bring them to the Web3.
            </p>
            <Button href={"/how-does-it-work"}>Learn more</Button>
          </div>
          <div className={stls.earth}>
            <CanvasEarth />
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default BannerFisrt;
function CanvasEarth() {
  return (
    <Canvas gl={{ antialias: true }}>
      <EarthBox scale={0.8} />
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} color="#ffffff" />
        <pointLight color={"#ffffff"} position={[10, 10, 10]} />
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.3}
          rotateSpeed={0.2}
          enableZoom={false}
        />
      </Suspense>
    </Canvas>
  );
}
function EarthBox(props) {
  const earthRef = useRef(null);
  const cloudsRef = useRef(null);
  const [colorMap, cloudsMap] = useLoader(TextureLoader, [
    imgsDir(imgsObject.Earths.DayMap),
    imgsDir(imgsObject.Earths.Clouds),
  ]);

  return (
    <group>
      {/* Earth */}

      <mesh {...props} ref={earthRef} rotation={new Euler(0.26, 2.95, 0)}>
        <sphereGeometry args={[3, 23, 23]} />
        <meshPhysicalMaterial
          map={imgsDir(imgsObject.Earths.DayMap)}
          clearcoat={1}
          clearcoatRoughness={0}
          roughness={0}
          metalness={0.5}
        />
        <meshStandardMaterial map={colorMap} roughness={1} metalness={0} />
      </mesh>

      {/* Cloud */}

      <mesh {...props} ref={cloudsRef}>
        <sphereGeometry args={[3, 200, 200]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.2}
          transparent={true}
          side={DoubleSide}
        />
      </mesh>

      <mesh {...props}>
        <sphereGeometry args={[3, 23, 23]} />
        <shaderMaterial
          vertexShader={vertexAtmosphere}
          fragmentShader={fragmentAtmosphere}
          blending={AdditiveBlending}
          side={BackSide}
          opacity={1}
          transparent={true}
        />
      </mesh>
    </group>
  );
}
