import { Suspense, useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH =
  "/human-ecorche-full-body-anatomy-3d-model/source/Meshy_AI_Human_ecorche_full_bo_0506161047_texture.glb";

useGLTF.preload(MODEL_PATH);

// ─── Camera targets ──────────────────────────────────────────
const BODY_CAM = {
  pos: new THREE.Vector3(0, 0, 3.2),
  target: new THREE.Vector3(0, 0, 0),
};
const HEAD_CAM = {
  pos: new THREE.Vector3(0, 0.75, 1.4),
  target: new THREE.Vector3(0, 0.75, 0),
};

// ─── 8 body zone boxes ───────────────────────────────────────
export const BODY_ZONES = [
  { id: "head",        pos: [0,      0.88,   0],    size: [0.30,  0.28,  0.30] },
  { id: "front_torso", pos: [0,      0.40,   0.07], size: [0.30,  0.55,  0.09] },
  { id: "back_torso",  pos: [0,      0.40,  -0.12], size: [0.30,  0.55,  0.06] },
  { id: "right_hand",  pos: [-0.34,  0.26,   0],    size: [0.13,  0.62,  0.12] },
  { id: "left_hand",   pos: [0.34,   0.26,   0],    size: [0.13,  0.62,  0.12] },
  { id: "hip",         pos: [0,      0.04,   0],    size: [0.28,  0.16,  0.14] },
  { id: "right_leg",   pos: [-0.12, -0.57,   0],    size: [0.17,  0.60,  0.14] },
  { id: "left_leg",    pos: [0.12,  -0.57,   0],    size: [0.17,  0.60,  0.14] },
];

// ─── 7 head zone slabs — all thin-slab style like "top" ──────
const HEAD_ZONES = [
  // horizontal slab — crown
  { id: "top",         pos: [0,       0.991,  0     ], size: [0.190, 0.028, 0.190] },
  // front-facing slabs
  { id: "forehead",    pos: [0,       0.920,  0.111 ], size: [0.155, 0.075, 0.026] },
  { id: "leftEye",     pos: [-0.065,  0.874,  0.104 ], size: [0.068, 0.042, 0.026] },
  { id: "rightEye",    pos: [ 0.065,  0.874,  0.104 ], size: [0.068, 0.042, 0.026] },
  // side-facing slabs
  { id: "leftTemple",  pos: [-0.099,  0.886,  0.010 ], size: [0.026, 0.090, 0.095] },
  { id: "rightTemple", pos: [ 0.099,  0.886,  0.010 ], size: [0.026, 0.090, 0.095] },
  // back-facing slab — moved up, wider
  { id: "backNeck",    pos: [0,       0.905, -0.106 ], size: [0.215, 0.075, 0.026] },
];

// ─── Head zone colours ────────────────────────────────────────
const ZONE_COLORS = {
  top:          "#7C3AED",
  forehead:     "#2563EB",
  leftTemple:   "#D97706",
  rightTemple:  "#D97706",
  leftEye:      "#DC2626",
  rightEye:     "#DC2626",
  backNeck:     "#059669",
};
export { ZONE_COLORS };

// ─── Model ───────────────────────────────────────────────────
function BodyModel() {
  const { scene } = useGLTF(MODEL_PATH);
  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) obj.raycast = () => {};
    });
  }, [scene]);
  return <primitive object={scene} />;
}

// ─── Drag-threshold pointer helpers ──────────────────────────
function useTapHandler(onTap) {
  const dragRef = useRef(null);
  return {
    onPointerDown(e) {
      e.stopPropagation();
      dragRef.current = { x: e.clientX, y: e.clientY };
    },
    onPointerUp(e) {
      if (!dragRef.current) return;
      const dx = e.clientX - dragRef.current.x;
      const dy = e.clientY - dragRef.current.y;
      dragRef.current = null;
      if (Math.sqrt(dx * dx + dy * dy) < 8) onTap();
    },
  };
}

// ─── Body zone ────────────────────────────────────────────────
function BodyZone({ zone, active, onTap }) {
  const handlers = useTapHandler(onTap);
  return (
    <mesh position={zone.pos} {...handlers}>
      <boxGeometry args={zone.size} />
      <meshStandardMaterial
        color="#7C3AED"
        transparent
        opacity={active ? 0.50 : 0.08}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ─── Head zone ────────────────────────────────────────────────
function HeadZone({ zone, selected, onToggle, onHover }) {
  const color = ZONE_COLORS[zone.id] || "#7C3AED";
  const handlers = useTapHandler(() => {
    onToggle(zone.id);
    onHover(zone.id);
  });
  return (
    <mesh
      position={zone.pos}
      {...handlers}
      onPointerEnter={() => onHover(zone.id)}
      onPointerLeave={() => onHover(null)}
    >
      <boxGeometry args={zone.size} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={selected ? 0.65 : 0.32}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ─── Camera animator ─────────────────────────────────────────
function CameraAnimator({ mode, orbitRef, onComplete }) {
  const { camera } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const isAnimating = useRef(false);
  const prevMode = useRef(mode);
  const completedMode = useRef(mode);

  useEffect(() => {
    if (mode === prevMode.current) return;
    prevMode.current = mode;
    isAnimating.current = true;
    if (orbitRef.current) orbitRef.current.enabled = false;
  }, [mode, orbitRef]);

  useFrame(() => {
    if (!isAnimating.current || !orbitRef.current) return;

    const preset = mode === "head" ? HEAD_CAM : BODY_CAM;

    camera.position.lerp(preset.pos, 0.18);

    dummy.position.copy(preset.pos);
    dummy.lookAt(preset.target);
    camera.quaternion.slerp(dummy.quaternion, 0.18);

    if (camera.position.distanceTo(preset.pos) < 0.012) {
      isAnimating.current = false;
      camera.position.copy(preset.pos);
      camera.quaternion.copy(dummy.quaternion);
      orbitRef.current.target.copy(preset.target);
      orbitRef.current.enabled = true;
      orbitRef.current.update();
      if (completedMode.current !== mode) {
        completedMode.current = mode;
        onComplete?.(mode);
      }
    }
  });

  return null;
}

// ─── Scene ───────────────────────────────────────────────────
function Scene({
  mode, activeBodyZone, onBodyZoneTap,
  selectedHeadZones, onHeadZoneToggle, onHeadZoneHover,
  onCameraComplete,
}) {
  const orbitRef = useRef();

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[1.5, 3, 3]} intensity={1.1} />
      <directionalLight position={[-1.5, 1, -2]} intensity={0.35} />

      <Suspense fallback={null}>
        <BodyModel />
      </Suspense>

      {mode === "body" && BODY_ZONES.map((zone) => (
        <BodyZone
          key={zone.id}
          zone={zone}
          active={activeBodyZone === zone.id}
          onTap={() => onBodyZoneTap(zone.id)}
        />
      ))}

      {mode === "head" && HEAD_ZONES.map((zone) => (
        <HeadZone
          key={zone.id}
          zone={zone}
          selected={selectedHeadZones.includes(zone.id)}
          onToggle={onHeadZoneToggle}
          onHover={onHeadZoneHover}
        />
      ))}

      <CameraAnimator mode={mode} orbitRef={orbitRef} onComplete={onCameraComplete} />

      <OrbitControls
        ref={orbitRef}
        makeDefault
        enablePan={false}
        enableZoom
        minDistance={0.3}
        maxDistance={4.5}
        enableDamping
        dampingFactor={0.12}
        rotateSpeed={0.7}
        zoomSpeed={0.8}
      />
    </>
  );
}

// ─── Exported component ───────────────────────────────────────
export default function BodySelector3D({
  mode,
  activeBodyZone,
  onBodyZoneTap,
  selectedHeadZones,
  onHeadZoneToggle,
  onHeadZoneHover,
  onCameraComplete,
  t,
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.2], fov: 42 }}
      style={{
        background: "linear-gradient(180deg, #0C0020 0%, #130030 100%)",
        touchAction: "none",
        display: "block",
      }}
    >
      <Scene
        mode={mode}
        activeBodyZone={activeBodyZone}
        onBodyZoneTap={onBodyZoneTap}
        selectedHeadZones={selectedHeadZones || []}
        onHeadZoneToggle={onHeadZoneToggle}
        onHeadZoneHover={onHeadZoneHover || (() => {})}
        onCameraComplete={onCameraComplete}
      />
    </Canvas>
  );
}
