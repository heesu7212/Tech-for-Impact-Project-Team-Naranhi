import { Suspense, useState, useRef, useCallback } from "react";
import BodySelector3D, { ZONE_COLORS } from "./components/BodySelector3D";

const HEAD_ZONE_IDS = [
  "top", "forehead", "leftTemple", "rightTemple",
  "leftEye", "rightEye", "backNeck",
];

export default function BodySelector({ onNext, onBack, setPainData, t }) {
  const [mode, setMode] = useState("body");
  const [activeBodyZone, setActiveBodyZone] = useState(null);
  const [headSelected, setHeadSelected] = useState([]);
  const [toast, setToast] = useState(false);
  const [hoveredZone, setHoveredZone] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const hoverClearTimer = useRef(null);

  const handleHeadZoneHover = useCallback((zoneId) => {
    if (hoverClearTimer.current) clearTimeout(hoverClearTimer.current);
    if (zoneId) {
      setHoveredZone(zoneId);
    } else {
      hoverClearTimer.current = setTimeout(() => setHoveredZone(null), 1400);
    }
  }, []);

  const handleBodyZoneTap = (zoneId) => {
    setActiveBodyZone(zoneId);
    if (zoneId === "head") {
      setHeadSelected([]);
      setIsTransitioning(true);
      setMode("head");
    } else {
      setToast(true);
      setTimeout(() => {
        setActiveBodyZone(null);
        setToast(false);
      }, 1800);
    }
  };

  const handleCameraComplete = useCallback((arrivedMode) => {
    if (arrivedMode === "head") setIsTransitioning(false);
  }, []);

  const handleHeadZoneToggle = (zoneId) => {
    setHeadSelected((prev) =>
      prev.includes(zoneId) ? prev.filter((k) => k !== zoneId) : [...prev, zoneId]
    );
  };

  const handleHeadConfirm = () => {
    setPainData((prev) => ({ ...prev, location: headSelected }));
    onNext("head");
  };

  const handleUnknown = () => {
    setPainData((prev) => ({ ...prev, location: ["unknown"] }));
    onNext("head");
  };

  const handleBack = () => {
    if (mode === "head") {
      setIsTransitioning(true);
      setMode("body");
      setActiveBodyZone(null);
    } else {
      onBack();
    }
  };

  const isHeadMode = mode === "head";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>

      {/* Header */}
      <div style={{ padding: "16px 20px 8px", flexShrink: 0 }}>
        <button
          onClick={handleBack}
          style={{
            background: "none", border: "none", color: "#6B21A8",
            fontSize: "15px", cursor: "pointer", fontWeight: "600",
            padding: "4px 0", marginBottom: "6px", display: "block",
          }}
        >
          {t.back}
        </button>
        <div style={{ display: "flex", gap: "4px", marginBottom: "6px" }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} style={{ flex: 1, height: "4px", borderRadius: "2px", backgroundColor: i < 2 ? "#6B21A8" : "#E9D5FF" }} />
          ))}
        </div>
        <div style={{ fontSize: "11px", color: "#7C3AED", fontWeight: "700", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          {t.stepArea}
        </div>
        <h2 style={{ margin: "0 0 2px", color: "#1F0A3C", fontSize: "20px", fontWeight: "700" }}>
          {isHeadMode ? t.whereDoesItHurt : t.selectBodyPart}
        </h2>
        <p style={{ margin: 0, color: "#888", fontSize: "13px" }}>
          {isHeadMode ? t.selectArea : t.tapBodyPart}
        </p>
      </div>

      {/* 3D 캔버스 */}
      <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
        <Suspense fallback={
          <div style={{
            height: "100%", display: "flex", alignItems: "center", justifyContent: "center",
            background: "linear-gradient(180deg, #0C0020 0%, #130030 100%)",
            color: "#A78BFA", fontSize: "13px", fontWeight: "600",
          }}>
            Loading model…
          </div>
        }>
          <BodySelector3D
            mode={mode}
            activeBodyZone={activeBodyZone}
            onBodyZoneTap={handleBodyZoneTap}
            selectedHeadZones={headSelected}
            onHeadZoneToggle={handleHeadZoneToggle}
            onHeadZoneHover={handleHeadZoneHover}
            onCameraComplete={handleCameraComplete}
            t={t}
          />
        </Suspense>

        {/* 카메라 전환 오버레이 */}
        {isTransitioning && (
          <div style={{
            position: "absolute", inset: 0, zIndex: 8,
            background: "linear-gradient(180deg, #0C0020 0%, #130030 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            pointerEvents: "none",
          }}>
            <div style={{ color: "#A78BFA", fontSize: "13px", fontWeight: "600", letterSpacing: "0.5px" }}>
              🔍 {isHeadMode ? t.whereDoesItHurt : t.selectBodyPart}…
            </div>
          </div>
        )}

        {/* 부위 이름 오버레이 */}
        {isHeadMode && hoveredZone && !isTransitioning && (
          <div style={{
            position: "absolute", top: "14px", left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: ZONE_COLORS[hoveredZone] || "#6B21A8",
            color: "#fff", padding: "7px 20px", borderRadius: "22px",
            fontSize: "14px", fontWeight: "700",
            pointerEvents: "none", zIndex: 10, whiteSpace: "nowrap",
            boxShadow: "0 4px 18px rgba(0,0,0,0.45)",
          }}>
            {t[hoveredZone]}
          </div>
        )}

        {toast && (
          <div style={{
            position: "absolute", bottom: "44px", left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(30,10,60,0.92)", color: "#fff",
            padding: "10px 20px", borderRadius: "20px",
            fontSize: "13px", fontWeight: "600",
            whiteSpace: "nowrap", boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            zIndex: 10, pointerEvents: "none",
          }}>
            {t.comingSoon}
          </div>
        )}
      </div>

      {/* Head mode — 하단 부위 선택 chips */}
      {isHeadMode && (
        <div style={{ padding: "8px 16px 16px", flexShrink: 0 }}>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "10px" }}>
            {HEAD_ZONE_IDS.map((id) => {
              const isSel = headSelected.includes(id);
              const chipColor = ZONE_COLORS[id] || "#7C3AED";
              return (
                <button
                  key={id}
                  onClick={() => handleHeadZoneToggle(id)}
                  style={{
                    display: "flex", alignItems: "center", gap: "5px",
                    padding: "5px 11px", borderRadius: "14px",
                    border: `1.5px solid ${isSel ? chipColor : "#E5E7EB"}`,
                    backgroundColor: isSel ? `${chipColor}20` : "#F9FAFB",
                    color: isSel ? chipColor : "#A0AEC0",
                    fontSize: "11px", fontWeight: isSel ? "700" : "400",
                    cursor: "pointer", transition: "all 0.15s",
                    boxShadow: isSel ? `0 0 0 2px ${chipColor}30` : "none",
                  }}
                >
                  <span style={{
                    width: "7px", height: "7px", borderRadius: "50%", flexShrink: 0,
                    backgroundColor: isSel ? chipColor : "#D1D5DB",
                    transition: "background-color 0.15s",
                  }} />
                  {t[id] || id}
                </button>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={handleUnknown}
              style={{
                flex: 1, padding: "12px", fontSize: "13px", fontWeight: "600",
                border: "1.5px solid #E5E7EB", borderRadius: "12px",
                backgroundColor: "#FAFAFA", color: "#666", cursor: "pointer",
              }}
            >
              {t.unknownArea}
            </button>
            <button
              onClick={handleHeadConfirm}
              disabled={headSelected.length === 0}
              style={{
                flex: 2, padding: "12px", fontSize: "15px", fontWeight: "700",
                backgroundColor: headSelected.length > 0 ? "#6B21A8" : "#D1D5DB",
                color: "#fff", border: "none", borderRadius: "12px",
                cursor: headSelected.length > 0 ? "pointer" : "not-allowed",
                boxShadow: headSelected.length > 0 ? "0 4px 14px rgba(107,33,168,0.35)" : "none",
              }}
            >
              {t.next}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
