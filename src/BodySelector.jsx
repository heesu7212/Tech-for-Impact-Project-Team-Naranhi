import { Suspense, useState } from "react";
import BodySelector3D from "./components/BodySelector3D";

const HEAD_ZONE_IDS = [
  "top", "forehead", "leftTemple", "rightTemple",
  "leftEye", "rightEye", "leftCheek", "rightCheek",
  "leftSide", "rightSide",
];

export default function BodySelector({ onNext, onBack, setPainData, t }) {
  const [mode, setMode] = useState("body");   // "body" | "head"
  const [activeBodyZone, setActiveBodyZone] = useState(null);
  const [headSelected, setHeadSelected] = useState([]);
  const [toast, setToast] = useState(false);

  // ── Body zone tap ───────────────────────────────────────────
  const handleBodyZoneTap = (zoneId) => {
    setActiveBodyZone(zoneId);

    if (zoneId === "head") {
      setHeadSelected([]);
      setMode("head");
    } else {
      setToast(true);
      setTimeout(() => {
        setActiveBodyZone(null);
        setToast(false);
      }, 1800);
    }
  };

  // ── Head zone toggle ────────────────────────────────────────
  const handleHeadZoneToggle = (zoneId) => {
    setHeadSelected((prev) =>
      prev.includes(zoneId) ? prev.filter((k) => k !== zoneId) : [...prev, zoneId]
    );
  };

  // ── Confirm head selection → navigate to pain type ──────────
  const handleHeadConfirm = () => {
    setPainData((prev) => ({ ...prev, location: headSelected }));
    onNext("head");
  };

  const handleUnknown = () => {
    setPainData((prev) => ({ ...prev, location: ["unknown"] }));
    onNext("head");
  };

  // ── Back: zoom out to body, or exit the screen ───────────────
  const handleBack = () => {
    if (mode === "head") {
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
            <div
              key={i}
              style={{
                flex: 1, height: "4px", borderRadius: "2px",
                backgroundColor: i < 2 ? "#6B21A8" : "#E9D5FF",
              }}
            />
          ))}
        </div>
        <div style={{
          fontSize: "11px", color: "#7C3AED", fontWeight: "700",
          marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px",
        }}>
          {t.stepArea}
        </div>
        <h2 style={{ margin: "0 0 2px", color: "#1F0A3C", fontSize: "20px", fontWeight: "700" }}>
          {isHeadMode ? t.whereDoesItHurt : t.selectBodyPart}
        </h2>
        <p style={{ margin: 0, color: "#888", fontSize: "13px" }}>
          {isHeadMode ? t.selectArea : t.tapBodyPart}
        </p>
      </div>

      {/* 3D canvas — stays mounted throughout; mode drives the camera */}
      <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
        <Suspense fallback={
          <div style={{
            height: "100%",
            display: "flex", alignItems: "center", justifyContent: "center",
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
            t={t}
          />
        </Suspense>

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

      {/* Head mode — bottom action bar */}
      {isHeadMode && (
        <div style={{ padding: "8px 16px 16px", flexShrink: 0 }}>
          {/* Selected chips */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <div style={{ fontSize: "12px", color: "#BBB", fontWeight: "500" }}>
              {headSelected.length > 0 ? "" : t.tapToSelect}
            </div>
            <button
              onClick={() =>
                headSelected.length === HEAD_ZONE_IDS.length
                  ? setHeadSelected([])
                  : setHeadSelected([...HEAD_ZONE_IDS])
              }
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: "12px", fontWeight: "700",
                color: "#6B21A8", padding: "2px 0",
              }}
            >
              {headSelected.length === HEAD_ZONE_IDS.length ? "✕ Clear" : t.selectAll}
            </button>
          </div>

          {headSelected.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "8px" }}>
              {headSelected.map((id) => (
                <button
                  key={id}
                  onClick={() => handleHeadZoneToggle(id)}
                  style={{
                    display: "flex", alignItems: "center", gap: "4px",
                    padding: "3px 9px", borderRadius: "14px",
                    border: "1.5px solid #7C3AED",
                    backgroundColor: "#EDE9FE", color: "#6B21A8",
                    fontSize: "11px", fontWeight: "700", cursor: "pointer",
                  }}
                >
                  {t[id] || id}
                  <span style={{ fontSize: "13px", lineHeight: 1 }}>×</span>
                </button>
              ))}
            </div>
          )}

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
