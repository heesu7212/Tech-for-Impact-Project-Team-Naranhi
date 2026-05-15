import { Suspense, useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
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

// ─── 10 head zone boxes ──────────────────────────────────────
const HEAD_ZONES = [
  { id: "top",          pos: [0,      0.97,   0],    size: [0.14, 0.05, 0.14] },
  { id: "forehead",     pos: [0,      0.92,   0.09], size: [0.13, 0.06, 0.04] },
  { id: "leftTemple",   pos: [-0.13,  0.89,   0.02], size: [0.04, 0.07, 0.07] },
  { id: "rightTemple",  pos: [0.13,   0.89,   0.02], size: [0.04, 0.07, 0.07] },
  { id: "leftEye",      pos: [-0.06,  0.87,   0.09], size: [0.05, 0.04, 0.03] },
  { id: "rightEye",     pos: [0.06,   0.87,   0.09], size: [0.05, 0.04, 0.03] },
  { id: "leftCheek",    pos: [-0.08,  0.82,   0.08], size: [0.05, 0.05, 0.04] },
  { id: "rightCheek",   pos: [0.08,   0.82,   0.08], size: [0.05, 0.05, 0.04] },
  { id: "leftSide",     pos: [-0.13,  0.84,   0],    size: [0.04, 0.09, 0.09] },
  { id: "rightSide",    pos: [0.13,   0.84,   0],    size: [0.04, 0.09, 0.09] },
];

const LABEL_OFFSET = {
  top:          [0,     0.06,  0],
  forehead:     [0.17,  0.02,  0],
  leftTemple:   [-0.17, 0,     0],
  rightTemple:  [0.17,  0,     0],
  leftEye:      [-0.15, 0,     0],
  rightEye:     [0.15,  0,     0],
  leftCheek:    [-0.15, 0,     0],
  rightCheek:   [0.15,  0,     0],
  leftSide:     [-0.18, 0,     0],
  rightSide:    [0.18,  0,     0],
};

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

// ─── Body zone (visible hint glow + invisible tap target) ────
function BodyZone({ zone, active, onTap }) {
  const handlers = useTapHandler(onTap);
  // Show a faint outline so users can see where to tap
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

// ─── Head zone with floating label ───────────────────────────
function HeadZone({ zone, selected, onToggle, t }) {
  const handlers = useTapHandler(() => onToggle(zone.id));
  const off = LABEL_OFFSET[zone.id] || [0.14, 0, 0];
  const labelPos = [zone.pos[0] + off[0], zone.pos[1] + off[1], zone.pos[2] + off[2]];

  return (
    <group>
      <mesh position={zone.pos} {...handlers}>
        <boxGeometry args={zone.size} />
        <meshStandardMaterial
          color="#7C3AED"
          transparent
          opacity={selected ? 0.55 : 0.22}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <Html position={labelPos} center distanceFactor={1.2}>
        <div style={{
          background: selected ? "#6B21A8" : "rgba(20,5,48,0.82)",
          color: "#fff",
          padding: "2px 7px",
          borderRadius: "8px",
          fontSize: "10px",
          fontWeight: "700",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          border: selected ? "1.5px solid #A78BFA" : "1px solid rgba(167,139,250,0.3)",
          userSelect: "none",
        }}>
          {t[zone.id] || zone.id}
        </div>
      </Html>
    </group>
  );
}

// ─── Camera animator ─────────────────────────────────────────
// ONLY runs lerp/slerp when an actual mode transition is in progress.
// When idle it is a complete no-op so it cannot fight OrbitControls.
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
    // ← critical: bail out when not animating so nothing fights OrbitControls
    if (!isAnimating.current || !orbitRef.current) return;

    const preset = mode === "head" ? HEAD_CAM : BODY_CAM;

    camera.position.lerp(preset.pos, 0.07);

    dummy.position.copy(preset.pos);
    dummy.lookAt(preset.target);
    camera.quaternion.slerp(dummy.quaternion, 0.09);

    if (camera.position.distanceTo(preset.pos) < 0.025) {
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
function Scene({ mode, activeBodyZone, onBodyZoneTap, selectedHeadZones, onHeadZoneToggle, onCameraComplete, t }) {
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
          t={t}
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
        onCameraComplete={onCameraComplete}
        t={t}
      />
    </Canvas>
  );
}
