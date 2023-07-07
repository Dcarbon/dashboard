import { MapIcon } from "@heroicons/react/24/solid";
import { Html, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Vector3 } from "three";
export default function Model(props) {
  /*
    Auto-generated by: https://github.com/pmndrs/gltfjsx
    author: JasperTobias (https://sketchfab.com/JasperTobias)
    license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
    source: https://sketchfab.com/3d-models/lowpoly-earth-ce0cce9b528b47c7984bf0b2b600d705
    title: LowPoly Earth
    */
  const { nodes, materials } = useGLTF("/earth.gltf");
  return (
    <group rotation={[-Math.PI / 2, 0, Math.PI]} {...props} dispose={null}>
      <mesh
        geometry={nodes["URF-Height_Lampd_Ice_0"].geometry}
        material={materials.Lampd_Ice}
      />
      <mesh
        geometry={nodes["URF-Height_watr_0"].geometry}
        material={materials.watr}
        material-roughness={0}
      />
      <mesh
        geometry={nodes["URF-Height_Lampd_0"].geometry}
        material={materials.Lampd}
        material-color="lightgreen"
      >
        <Marker rotation={[0, Math.PI / 2, 0]} position={[0, 1.3, 0]}>
          {/* Anything in here is regular HTML, these markers are from font-awesome */}
          <MapIcon style={{ color: "orange" }} />
        </Marker>
        <group position={[0, 0, 1.3]} rotation={[0, 0, Math.PI]}>
          <Marker rotation={[0, Math.PI / 2, Math.PI / 2]}>
            <div
              style={{
                position: "absolute",
                fontSize: 10,
                letterSpacing: -0.5,
                left: 17.5,
              }}
            >
              north
            </div>
            <MapIcon style={{ color: "indianred" }} />
          </Marker>
        </group>
      </mesh>
    </group>
  );
}

// Let's make the marker into a component so that we can abstract some shared logic
function Marker({ children, ...props }) {
  const ref = useRef();
  // This holds the local occluded state
  const [isOccluded, setOccluded] = useState();
  const [isInRange, setInRange] = useState();
  const isVisible = isInRange && !isOccluded;
  // Test distance
  const vec = new Vector3();
  useFrame((state) => {
    const range =
      state.camera.position.distanceTo(ref.current.getWorldPosition(vec)) <= 10;
    if (range !== isInRange) setInRange(range);
  });
  return (
    <group ref={ref}>
      <Html
        // 3D-transform contents
        transform
        // Hide contents "behind" other meshes
        occlude
        // Tells us when contents are occluded (or not)
        onOcclude={setOccluded}
        // We just interpolate the visible state into css opacity and transforms
        style={{
          transition: "all 0.2s",
          opacity: isVisible ? 1 : 0,
          transform: `scale(${isVisible ? 1 : 0.25})`,
        }}
        {...props}
      >
        {children}
      </Html>
    </group>
  );
}
