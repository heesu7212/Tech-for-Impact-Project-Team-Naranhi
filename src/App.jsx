import { useState, useRef, useEffect } from "react";
import "./App.css";
import translations from "./translations";
import BodySelector from "./BodySelector";
import { savePainRecord } from "./lib/supabase";

function emptyEntry() {
  return { location: [], painTypes: [], intensity: 5, onset: null };
}

// ─── Progress Bar ───────────────────────────────────────────
function ProgressBar({ step, total, label }) {
  return (
    <div style={{ paddingBottom: "12px" }}>
      {label && (
        <div style={{
          fontSize: "11px", color: "#7C3AED", fontWeight: "700",
          marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px",
        }}>
          {label}
        </div>
      )}
      <div style={{ display: "flex", gap: "4px" }}>
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            style={{
              flex: 1, height: "4px", borderRadius: "2px",
              backgroundColor: i < step ? "#6B21A8" : "#E9D5FF",
              transition: "background-color 0.3s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Pain Types ──────────────────────────────────────────────
const PAIN_TYPES = [
  { id: "throbbing", color: "#DC2626", bg: "#FEF2F2", border: "#FECACA" },
  { id: "stabbing",  color: "#9333EA", bg: "#FAF5FF", border: "#E9D5FF" },
  { id: "electric",  color: "#2563EB", bg: "#EFF6FF", border: "#BFDBFE" },
  { id: "pressure",  color: "#7C3AED", bg: "#F5F3FF", border: "#DDD6FE" },
  { id: "burning",   color: "#EA580C", bg: "#FFF7ED", border: "#FED7AA" },
  { id: "hollow",    color: "#6B7280", bg: "#F9FAFB", border: "#E5E7EB" },
];

// ─── Pain Type Icons ─────────────────────────────────────────
function PainTypeIcon({ id, color, selected, size = 52 }) {
  const dim = selected ? undefined : 0.38;

  if (id === "throbbing") {
    const ripple = (delay) => selected ? {
      animation: `throb-ripple 1.1s ease-out ${delay}s infinite`,
      transformOrigin: "28px 28px",
    } : { opacity: 0.12 };
    const core = selected ? {
      animation: "throb-core 1.1s cubic-bezier(0.25,0.8,0.25,1) infinite",
      transformOrigin: "28px 28px",
    } : { opacity: 0.35 };
    return (
      <svg viewBox="0 0 56 56" width={size} height={size} style={{ overflow: "visible" }}>
        <circle cx="28" cy="28" r="9" fill="none" stroke={color} strokeWidth="2.5" style={ripple(0.55)} />
        <circle cx="28" cy="28" r="9" fill="none" stroke={color} strokeWidth="2"   style={ripple(0)} />
        <circle cx="28" cy="28" r="9" fill={color} style={core} />
      </svg>
    );
  }

  if (id === "stabbing") {
    return (
      <svg viewBox="0 0 56 56" width={size} height={size}>
        <path
          d="M28,2 L33,16 L46,10 L40,23 L54,28 L40,33 L46,46 L33,40 L28,54 L23,40 L10,46 L16,33 L2,28 L16,23 L10,10 L23,16 Z"
          fill={color} style={{ opacity: dim }}
        />
      </svg>
    );
  }

  if (id === "electric") {
    return (
      <svg viewBox="0 0 56 56" width={size} height={size}>
        <polygon points="36,2 20,30 29,30 18,54 38,26 29,26" fill={color} style={{ opacity: dim }} />
      </svg>
    );
  }

  if (id === "pressure") {
    return (
      <svg viewBox="0 0 56 56" width={size} height={size}>
        <circle cx="28" cy="28" r="9" fill={color} style={{ opacity: dim }} />
        <polygon points="2,28 13,21 13,25.5 21,25.5 21,30.5 13,30.5 13,35"  fill={color} style={{ opacity: dim }} />
        <polygon points="54,28 43,21 43,25.5 35,25.5 35,30.5 43,30.5 43,35" fill={color} style={{ opacity: dim }} />
      </svg>
    );
  }

  if (id === "burning") {
    return (
      <svg viewBox="0 0 56 56" width={size} height={size}>
        <path
          d="M28,54 C16,52 10,44 12,36 C12,27 18,20 20,14 C21,8 22,4 22,4 C25,11 23,18 27,22 C28,15 31,9 36,5 C37,14 33,20 37,28 C41,21 43,16 43,16 C46,24 46,32 44,38 C42,48 36,54 28,54 Z"
          fill={color} style={{ opacity: dim }}
        />
      </svg>
    );
  }

  if (id === "hollow") {
    return (
      <svg viewBox="0 0 56 56" width={size} height={size}>
        <circle cx="28" cy="28" r="24" fill={color} style={{ opacity: selected ? 0.11 : 0.05 }} />
        <circle cx="28" cy="28" r="17" fill={color} style={{ opacity: selected ? 0.24 : 0.09 }} />
        <circle cx="28" cy="28" r="11" fill={color} style={{ opacity: selected ? 0.55 : 0.18 }} />
        <circle cx="28" cy="28" r="5"  fill={color} style={{ opacity: selected ? 0.90 : 0.30 }} />
      </svg>
    );
  }

  return null;
}

// ─── Mini Entry Card ─────────────────────────────────────────
function MiniEntryCard({ entry, index, t, totalEntries }) {
  const { location, painTypes, intensity } = entry;
  const intensityColor = intensity <= 4 ? "#F59E0B" : intensity <= 7 ? "#F97316" : "#EF4444";
  const firstType = PAIN_TYPES.find(p => p.id === (painTypes?.[0]));
  const locationLabel = location?.includes("unknown")
    ? t.unknownArea
    : (location?.map(k => t[k]).join(", ") || "—");

  return (
    <div style={{
      borderRadius: "12px", padding: "12px 14px",
      border: "1.5px solid #E9D5FF", backgroundColor: "#FDFBFF",
      marginBottom: "10px", display: "flex", alignItems: "center", gap: "12px",
    }}>
      {totalEntries > 1 && (
        <div style={{
          width: "22px", height: "22px", borderRadius: "50%",
          backgroundColor: "#6B21A8", color: "#fff",
          fontSize: "11px", fontWeight: "700",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          {index + 1}
        </div>
      )}
      {firstType && (
        <div style={{ flexShrink: 0 }}>
          <PainTypeIcon id={firstType.id} color={firstType.color} selected={true} size={36} />
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "13px", fontWeight: "700", color: "#1F0A3C", marginBottom: "2px" }}>
          {locationLabel}
        </div>
        <div style={{ fontSize: "12px", color: firstType?.color || "#666" }}>
          {painTypes?.map(id => t[id]).join(", ") || "—"}
        </div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ fontSize: "20px", fontWeight: "800", color: intensityColor, lineHeight: 1 }}>{intensity}</div>
        <div style={{ fontSize: "10px", color: "#9CA3AF" }}>/10</div>
      </div>
    </div>
  );
}

// ─── Start Screen ───────────────────────────────────────────
function StartScreen({ onNext, t }) {
  const [history] = useState(() => {
    try { return JSON.parse(localStorage.getItem("pain-app-sessions") || "[]"); }
    catch { return []; }
  });

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflowY: "auto" }}>
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center",
        padding: "40px 28px", textAlign: "center",
        minHeight: "100%", boxSizing: "border-box",
        position: "relative",
      }}>
        <div style={{
          width: "80px", height: "80px", borderRadius: "24px",
          background: "linear-gradient(135deg, #7C3AED, #A855F7)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "40px", margin: "0 auto 28px",
          boxShadow: "0 8px 24px rgba(124,58,237,0.4)",
        }}>
          🧠
        </div>

        <h1 style={{ color: "#1F0A3C", fontWeight: "700", fontSize: "26px", margin: "0 0 14px" }}>
          {t.appTitle}
        </h1>
        <p style={{ color: "#6B7280", lineHeight: "1.75", fontSize: "14px", margin: "0 0 40px", maxWidth: "300px", wordBreak: "keep-all" }}>
          {t.appDesc}
        </p>

        <button
          onClick={onNext}
          style={{
            padding: "16px 44px", fontSize: "16px", fontWeight: "700",
            backgroundColor: "#6B21A8", color: "#fff", border: "none",
            borderRadius: "14px", cursor: "pointer", letterSpacing: "0.3px",
            boxShadow: "0 4px 18px rgba(107,33,168,0.45)",
            width: "100%", maxWidth: "280px",
          }}
        >
          {t.start}
        </button>

        {history.length > 0 && (
          <div style={{
            position: "absolute", bottom: "18px", left: 0, right: 0,
            display: "flex", flexDirection: "column", alignItems: "center", gap: "3px",
          }}>
            <span style={{ fontSize: "11px", color: "#C4B5FD", fontWeight: "600", letterSpacing: "0.5px" }}>
              {t.pastRecords}
            </span>
            <span style={{ fontSize: "14px", color: "#C4B5FD", lineHeight: 1 }}>↓</span>
          </div>
        )}
      </div>

      {history.length > 0 && (
        <div style={{ padding: "20px 20px 28px", borderTop: "1px solid #F3E8FF" }}>
          <div style={{ fontSize: "12px", color: "#7C3AED", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "12px" }}>
            📋 {t.pastRecords}
          </div>
          {history.map((session, si) => (
            <div key={si} style={{
              borderRadius: "12px", border: "1.5px solid #E9D5FF",
              backgroundColor: "#FDFBFF", padding: "12px 14px", marginBottom: "10px",
            }}>
              <div style={{ fontSize: "11px", color: "#9CA3AF", fontWeight: "600", marginBottom: "10px" }}>
                {formatDate(session.date)} · {session.entries.length}개 부위
              </div>
              {session.entries.map((entry, ei) => {
                const type = PAIN_TYPES.find(p => p.id === (entry.painTypes?.[0] || entry.painType));
                const locLabel = entry.location?.includes("unknown")
                  ? t.unknownArea
                  : (entry.location?.map(k => t[k]).join(", ") || "—");
                const iColor = entry.intensity <= 4 ? "#F59E0B" : entry.intensity <= 7 ? "#F97316" : "#EF4444";
                return (
                  <div key={ei} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: ei < session.entries.length - 1 ? "6px" : 0 }}>
                    {type && <PainTypeIcon id={type.id} color={type.color} selected={false} size={24} />}
                    <span style={{ fontSize: "12px", color: "#374151", flex: 1 }}>{locLabel}</span>
                    <span style={{ fontSize: "12px", fontWeight: "700", color: iColor }}>{entry.intensity}/10</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Onset Selector (Step 1) ─────────────────────────────────
const ONSET_OPTIONS = [
  { key: "onset_today",     dayNum: "0"    },
  { key: "onset_1to3days",  dayNum: "1–3"  },
  { key: "onset_1week",     dayNum: "7"    },
  { key: "onset_2to3weeks", dayNum: "14–21"},
  { key: "onset_1month",    dayNum: "30+"  },
];

function OnsetBar({ onset, setPainData, t }) {
  const display = [...ONSET_OPTIONS].reverse();
  const selDispIdx = onset
    ? ONSET_OPTIONS.length - 1 - ONSET_OPTIONS.findIndex(o => o.key === onset)
    : -1;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ fontSize: "10px", color: "#9CA3AF", fontWeight: "600", letterSpacing: "0.5px" }}>{t.pastLabel}</span>
        <span style={{ fontSize: "10px", color: "#9CA3AF", fontWeight: "600", letterSpacing: "0.5px" }}>{t.nowLabel}</span>
      </div>
      <div style={{ display: "flex", gap: "3px" }}>
        {display.map((opt, di) => {
          const filled = selDispIdx !== -1 && di >= selDispIdx;
          const sel = onset === opt.key;
          const isToday = opt.dayNum === "0";
          return (
            <div
              key={opt.key}
              onClick={() => setPainData(prev => ({ ...prev, onset: opt.key }))}
              style={{
                flex: 1, height: "56px",
                borderRadius: di === 0 ? "12px 4px 4px 12px" : di === display.length - 1 ? "4px 12px 12px 4px" : "4px",
                backgroundColor: filled ? "#6B21A8" : "#EDE9FE",
                border: sel ? "2.5px solid #4C1D95" : "2.5px solid transparent",
                cursor: "pointer",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                transition: "background-color 0.2s",
                boxShadow: sel ? "0 2px 10px rgba(107,33,168,0.45)" : "none",
              }}
            >
              {isToday ? (
                <span style={{ fontSize: "9px", fontWeight: "800", color: filled ? "#fff" : "#7C3AED", lineHeight: 1, textAlign: "center" }}>
                  {t.onset_today}
                </span>
              ) : (
                <>
                  <span style={{ fontSize: opt.dayNum.length > 3 ? "9px" : "13px", fontWeight: "800", color: filled ? "#fff" : "#7C3AED", lineHeight: 1 }}>
                    {opt.dayNum}
                  </span>
                  <span style={{ fontSize: "7px", fontWeight: "600", color: filled ? "rgba(255,255,255,0.75)" : "#A78BFA", lineHeight: 1.4 }}>
                    {t.daysUnit}
                  </span>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Pain Type Selector (Step 3) ─────────────────────────────
function PainTypeSelector({ onNext, onBack, painData, setPainData, t }) {
  const selected = painData.painTypes || [];

  const handleToggle = (id) => {
    setPainData(prev => {
      const cur = prev.painTypes || [];
      return { ...prev, painTypes: cur.includes(id) ? cur.filter(x => x !== id) : [...cur, id] };
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "16px 20px 4px", flexShrink: 0 }}>
        <button
          onClick={onBack}
          style={{ background: "none", border: "none", color: "#6B21A8", fontSize: "15px", cursor: "pointer", fontWeight: "600", padding: "4px 0", marginBottom: "8px", display: "block" }}
        >
          {t.back}
        </button>
        <ProgressBar step={3} total={5} label={t.stepType} />
        <h2 style={{ margin: "0 0 4px", color: "#1F0A3C", fontSize: "20px", fontWeight: "700" }}>
          {t.whatKindOfPain}
        </h2>
        <p style={{ margin: 0, color: "#888", fontSize: "13px" }}>{t.selectType}</p>
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "10px", padding: "12px 20px", flex: 1, overflowY: "auto",
      }}>
        {PAIN_TYPES.map(type => {
          const sel = selected.includes(type.id);
          return (
            <div
              key={type.id}
              onClick={() => handleToggle(type.id)}
              style={{
                borderRadius: "16px", padding: "16px 10px 14px",
                border: "2.5px solid",
                borderColor: sel ? type.color : type.border,
                backgroundColor: sel ? type.bg : "#fff",
                cursor: "pointer", textAlign: "center",
                transition: "all 0.15s ease",
                boxShadow: sel ? `0 4px 16px ${type.color}28` : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60px", marginBottom: "8px" }}>
                <div className={sel ? `pain-icon-${type.id}` : ""}>
                  <PainTypeIcon id={type.id} color={type.color} selected={sel} />
                </div>
              </div>
              <div style={{ fontWeight: "700", fontSize: "14px", color: sel ? type.color : "#374151" }}>
                {t[type.id]}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ padding: "0 20px 20px", flexShrink: 0 }}>
        <div style={{
          minHeight: "28px", fontSize: "13px", fontWeight: "600",
          color: selected.length > 0 ? "#6B21A8" : "#BBB", marginBottom: "10px",
        }}>
          {selected.length > 0 ? `✓ ${selected.map(id => t[id]).join(", ")}` : t.tapPainType}
        </div>
        <button
          onClick={onNext}
          disabled={selected.length === 0}
          style={{
            width: "100%", padding: "14px", fontSize: "16px", fontWeight: "600",
            backgroundColor: selected.length > 0 ? "#6B21A8" : "#D1D5DB",
            color: "#fff", border: "none", borderRadius: "12px",
            cursor: selected.length > 0 ? "pointer" : "not-allowed",
            boxShadow: selected.length > 0 ? "0 4px 14px rgba(107,33,168,0.35)" : "none",
          }}
        >
          {t.next}
        </button>
      </div>
    </div>
  );
}

// ─── Shared intensity helpers ────────────────────────────────
const FACES = ["🙂", "😶", "😐", "😕", "😟", "😣", "😖", "😫", "😩", "😭"];

function intensityColor(v) {
  if (v <= 2) return "#FCD34D";
  if (v <= 4) return "#FBBF24";
  if (v <= 6) return "#F97316";
  if (v <= 8) return "#EF4444";
  return "#DC2626";
}
function intensityLabel(v, t) {
  return v <= 3 ? t.mild : v <= 6 ? t.moderate : v <= 8 ? t.severe : t.verySevere;
}

// ─── Intensity Slider (Step 4) ───────────────────────────────
function IntensitySlider({ onNext, onBack, painData, setPainData, t }) {
  const intensity = painData.intensity ?? 5;
  const color = intensityColor(intensity);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "16px 20px 4px", flexShrink: 0 }}>
        <button
          onClick={onBack}
          style={{ background: "none", border: "none", color: "#6B21A8", fontSize: "15px", cursor: "pointer", fontWeight: "600", padding: "4px 0", marginBottom: "8px", display: "block" }}
        >
          {t.back}
        </button>
        <ProgressBar step={4} total={5} label={t.stepIntensity} />
        <h2 style={{ margin: "0 0 4px", color: "#1F0A3C", fontSize: "20px", fontWeight: "700" }}>
          {t.howIntense}
        </h2>
        <p style={{ margin: 0, color: "#888", fontSize: "13px" }}>{t.dragSlider}</p>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "16px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div style={{ fontSize: "96px", lineHeight: 1, marginBottom: "8px" }}>
            {FACES[intensity - 1]}
          </div>
          <div style={{ fontSize: "60px", fontWeight: "800", color, lineHeight: 1, transition: "color 0.25s" }}>
            {intensity}
          </div>
          <div style={{ fontSize: "18px", fontWeight: "700", color, marginTop: "6px", transition: "color 0.25s" }}>
            {intensityLabel(intensity, t)}
          </div>
        </div>

        <input
          type="range" min="1" max="10" value={intensity}
          onChange={e => setPainData(prev => ({ ...prev, intensity: Number(e.target.value) }))}
          style={{ width: "100%", accentColor: color, height: "8px", cursor: "pointer", marginBottom: "10px" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#9CA3AF", marginBottom: "24px" }}>
          <span>{t.littlePain}</span>
          <span>{t.worstPain}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "5px" }}>
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} style={{
              width: "22px", height: "22px", borderRadius: "50%",
              backgroundColor: intensityColor(i + 1),
              opacity: i + 1 === intensity ? 1 : 0.22,
              transform: i + 1 === intensity ? "scale(1.25)" : "scale(1)",
              transition: "opacity 0.2s, transform 0.2s",
              boxShadow: i + 1 === intensity ? `0 0 8px ${intensityColor(i + 1)}88` : "none",
            }} />
          ))}
        </div>
      </div>

      <div style={{ padding: "0 20px 20px", flexShrink: 0 }}>
        <button
          onClick={onNext}
          style={{
            width: "100%", padding: "14px", fontSize: "16px", fontWeight: "600",
            backgroundColor: "#6B21A8", color: "#fff", border: "none",
            borderRadius: "12px", cursor: "pointer",
            boxShadow: "0 4px 14px rgba(107,33,168,0.35)",
          }}
        >
          {t.next}
        </button>
      </div>
    </div>
  );
}

// ─── Add More Screen ─────────────────────────────────────────
function AddMoreScreen({ entries, currentEntry, onAddMore, onGoSummary, onBack, t }) {
  const allSoFar = currentEntry.location.length > 0
    ? [...entries, currentEntry]
    : entries;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "16px 20px 4px", flexShrink: 0 }}>
        <button
          onClick={onBack}
          style={{ background: "none", border: "none", color: "#6B21A8", fontSize: "15px", cursor: "pointer", fontWeight: "600", padding: "4px 0", marginBottom: "8px", display: "block" }}
        >
          {t.back}
        </button>
        <h2 style={{ margin: "0 0 4px", color: "#1F0A3C", fontSize: "20px", fontWeight: "700" }}>
          {t.anotherAreaQ}
        </h2>
        <p style={{ margin: 0, color: "#888", fontSize: "13px" }}>
          {allSoFar.length === 1 ? `${t.entryLabel} 1` : `${allSoFar.length}개 부위 선택됨`}
        </p>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 0" }}>
        {allSoFar.map((entry, i) => (
          <MiniEntryCard key={i} entry={entry} index={i} t={t} totalEntries={allSoFar.length} />
        ))}
      </div>

      <div style={{ padding: "12px 20px 20px", flexShrink: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
        <button
          onClick={onAddMore}
          style={{
            width: "100%", padding: "14px", fontSize: "15px", fontWeight: "600",
            backgroundColor: "#fff", color: "#6B21A8",
            border: "2px solid #6B21A8", borderRadius: "12px", cursor: "pointer",
          }}
        >
          {t.addAnotherArea}
        </button>
        <button
          onClick={onGoSummary}
          style={{
            width: "100%", padding: "14px", fontSize: "16px", fontWeight: "600",
            backgroundColor: "#6B21A8", color: "#fff", border: "none",
            borderRadius: "12px", cursor: "pointer",
            boxShadow: "0 4px 14px rgba(107,33,168,0.35)",
          }}
        >
          {t.seeSummary}
        </button>
      </div>
    </div>
  );
}

// ─── Entry Block ─────────────────────────────────────────────
function StepBadge({ n }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: "18px", height: "18px", borderRadius: "50%",
      backgroundColor: "#7C3AED", color: "#fff",
      fontSize: "10px", fontWeight: "700", flexShrink: 0,
    }}>{n}</span>
  );
}

function EntryBlock({ entry, index, t, totalEntries, dateLabel }) {
  const { location, painTypes, intensity, onset } = entry;

  const getColor = (v) => {
    if (v <= 2) return "#FCD34D";
    if (v <= 4) return "#FBBF24";
    if (v <= 6) return "#F97316";
    if (v <= 8) return "#EF4444";
    return "#DC2626";
  };
  const getLabel = (v) => v <= 3 ? t.mild : v <= 6 ? t.moderate : v <= 8 ? t.severe : t.verySevere;

  const color = getColor(intensity);
  const label = getLabel(intensity);
  const locationLabel = location?.includes("unknown")
    ? t.unknownArea
    : (location?.map(k => t[k]).join(", ") || "—");

  const renderRow = (stepNum, lbl, value, valueColor) => (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "flex-start",
      borderBottom: "1px solid #F3E8FF", paddingBottom: "10px", marginBottom: "10px",
    }}>
      <span style={{ color: "#888", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}>
        <StepBadge n={stepNum} /> {lbl}
      </span>
      <span style={{ fontWeight: "700", color: valueColor || "#6B21A8", fontSize: "13px", textAlign: "right", maxWidth: "55%" }}>{value}</span>
    </div>
  );

  return (
    <div style={{ marginBottom: "16px" }}>
      {totalEntries > 1 && (
        <div style={{
          fontSize: "11px", fontWeight: "700", color: "#7C3AED",
          textTransform: "uppercase", letterSpacing: "0.8px",
          marginBottom: "8px",
        }}>
          {t.entryLabel} {index + 1}
        </div>
      )}

      <div style={{
        backgroundColor: "#FDFBFF", border: "2px solid #E9D5FF",
        borderRadius: "16px", padding: "16px", marginBottom: "10px",
      }}>
        {(dateLabel || onset) && renderRow(1, t.painOnset, dateLabel ?? t[onset])}
        {renderRow(2, t.painLocation, locationLabel)}
        {painTypes?.length > 0 && renderRow(3, t.painType, painTypes.map(id => t[id]).join(", "))}

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ color: "#888", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}>
              <StepBadge n={4} /> {t.intensity}
            </span>
            <span style={{ fontWeight: "700", color, fontSize: "13px" }}>
              {intensity} / 10 — {label}
            </span>
          </div>
          <div style={{ display: "flex", gap: "4px" }}>
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} style={{
                flex: 1, height: "8px", borderRadius: "4px",
                backgroundColor: i < intensity ? getColor(i + 1) : "#E5E7EB",
              }} />
            ))}
          </div>
        </div>
      </div>

      {painTypes?.length > 0 && (
        <div style={{
          backgroundColor: "#F5F3FF", borderRadius: "16px",
          padding: "16px", border: "1.5px solid #DDD6FE",
        }}>
          <div style={{ fontSize: "12px", color: "#7C3AED", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "12px" }}>
            💬 {t.expressionTitle}
          </div>
          {painTypes.map(pt => {
            const expr = t.medicalExpressions?.[pt];
            if (!expr) return null;
            return (
              <div key={pt} style={{ marginBottom: "12px" }}>
                <div style={{ backgroundColor: "#EDE9FE", borderRadius: "10px", padding: "10px 14px", marginBottom: "8px" }}>
                  <div style={{ fontSize: "11px", color: "#7C3AED", fontWeight: "600", marginBottom: "4px" }}>
                    {t.medicalTerm}
                  </div>
                  <div style={{ fontSize: "14px", color: "#3B0764", fontWeight: "700" }}>
                    {expr.medical}
                  </div>
                </div>
                <div style={{ backgroundColor: "#fff", borderRadius: "10px", padding: "10px 14px", borderLeft: "4px solid #7C3AED" }}>
                  <div style={{ fontSize: "11px", color: "#7C3AED", fontWeight: "600", marginBottom: "6px" }}>
                    {t.koreanExpr}
                  </div>
                  <div style={{ fontSize: "14px", color: "#1F0A3C", lineHeight: "1.65" }}>
                    "{expr.phrase(locationLabel)}"
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Summary Card (Step 5) ───────────────────────────────────
function SummaryCard({ entries, currentEntry, onConsent, onBack, painPattern, timelineEvents, sessionOnset, lang, t, sessionNote, setSessionNote }) {
  const [pdfToast, setPdfToast] = useState(false);
  const allEntries = [...entries, currentEntry].filter(e => e.location?.length > 0 && e.painTypes?.length > 0);
  const isTimelineMode = painPattern && painPattern !== "same" && timelineEvents?.length > 0;
  const patternOpt = PATTERN_OPTIONS.find(p => p.key === painPattern);

  const handleDownloadPdf = () => {
    setPdfToast(true);
    setTimeout(() => setPdfToast(false), 2500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "16px 20px 4px", flexShrink: 0 }}>
        <button
          onClick={onBack}
          style={{ background: "none", border: "none", color: "#6B21A8", fontSize: "15px", cursor: "pointer", fontWeight: "600", padding: "4px 0", marginBottom: "8px", display: "block" }}
        >
          {t.back}
        </button>
        <ProgressBar step={5} total={5} label={t.stepSummary} />
        <h2 style={{ margin: "0 0 2px", color: "#1F0A3C", fontSize: "20px", fontWeight: "700" }}>
          {t.painSummary}
        </h2>
        <p style={{ margin: 0, color: "#888", fontSize: "13px" }}>{t.reviewShare}</p>
      </div>

      <div style={{ padding: "0 20px 4px", flexShrink: 0 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          background: "linear-gradient(135deg, #FEF3C7, #FDE68A)",
          border: "1.5px solid #F59E0B",
          borderRadius: "10px", padding: "10px 14px",
        }}>
          <span style={{ fontSize: "18px", flexShrink: 0 }}>⚠️</span>
          <span style={{ fontSize: "12px", fontWeight: "700", color: "#92400E", lineHeight: 1.4 }}>
            {t.disclaimer}
          </span>
        </div>
      </div>

      <div style={{ padding: "12px 20px 0", flex: 1, overflowY: "auto" }}>
        {patternOpt && (
          <div style={{
            display: "flex", alignItems: "center", gap: "12px",
            backgroundColor: "#FDFBFF", border: "1.5px solid #E9D5FF",
            borderRadius: "14px", padding: "12px 16px", marginBottom: "14px",
          }}>
            <PatternIcon type={patternOpt.key} color={patternOpt.color} size={36} />
            <div>
              <div style={{ fontSize: "11px", color: "#9CA3AF", fontWeight: "600", marginBottom: "2px" }}>{t.painTrend}</div>
              <div style={{ fontSize: "14px", fontWeight: "700", color: patternOpt.color }}>{t[`pattern_${patternOpt.key}`]}</div>
            </div>
          </div>
        )}
        {isTimelineMode
          ? <TimelineSummaryBlock events={timelineEvents} sessionOnset={sessionOnset} lang={lang} t={t} />
          : allEntries.map((entry, i) => (
              <EntryBlock key={i} entry={entry} index={i} t={t} totalEntries={allEntries.length} />
            ))
        }

        {/* Note preview — live-updates as user types */}
        {sessionNote.length > 0 && (
          <div style={{
            backgroundColor: "#F5F3FF", borderRadius: "14px",
            padding: "14px 16px", border: "1.5px solid #DDD6FE",
            marginBottom: "12px",
          }}>
            <div style={{ fontSize: "11px", color: "#7C3AED", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>
              📝 {t.sessionNoteLabel}
            </div>
            <div style={{ fontSize: "14px", color: "#374151", lineHeight: "1.65", whiteSpace: "pre-wrap" }}>
              {sessionNote}
            </div>
          </div>
        )}

        {/* Note input */}
        <div style={{ marginBottom: "12px" }}>
          <div style={{ fontSize: "12px", color: "#9CA3AF", fontWeight: "600", marginBottom: "6px" }}>
            📝 {t.sessionNoteLabel}
          </div>
          <textarea
            value={sessionNote}
            onChange={e => setSessionNote(e.target.value)}
            placeholder={t.sessionNotePlaceholder}
            rows={3}
            style={{
              width: "100%", padding: "12px", fontSize: "14px",
              borderRadius: "12px", border: "1.5px solid #DDD6FE",
              resize: "none", outline: "none", boxSizing: "border-box",
              fontFamily: "inherit", color: "#374151",
              transition: "border-color 0.2s",
            }}
            onFocus={e => e.target.style.borderColor = "#7C3AED"}
            onBlur={e => e.target.style.borderColor = "#DDD6FE"}
          />
        </div>

        <button
          onClick={onConsent}
          style={{
            width: "100%", padding: "14px", fontSize: "16px", fontWeight: "600",
            backgroundColor: "#6B21A8", color: "#fff", border: "none",
            borderRadius: "12px", cursor: "pointer", marginBottom: "10px",
            boxShadow: "0 4px 14px rgba(107,33,168,0.35)",
          }}
        >
          {t.shareBtn}
        </button>

        <button
          onClick={handleDownloadPdf}
          style={{
            width: "100%", padding: "13px", fontSize: "14px", fontWeight: "600",
            backgroundColor: "#fff", color: "#6B21A8",
            border: "1.5px solid #DDD6FE", borderRadius: "12px",
            cursor: "pointer", marginBottom: "24px",
          }}
        >
          ⬇ {t.downloadPdf}
        </button>
      </div>

      {pdfToast && (
        <div style={{
          position: "fixed", bottom: "28px", left: "50%", transform: "translateX(-50%)",
          background: "rgba(30,10,60,0.92)", color: "#fff",
          padding: "10px 22px", borderRadius: "20px",
          fontSize: "13px", fontWeight: "600",
          whiteSpace: "nowrap", boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          zIndex: 100, pointerEvents: "none",
        }}>
          ✓ {t.pdfDownloaded}
        </div>
      )}
    </div>
  );
}

// ─── Data Consent Modal ──────────────────────────────────────
function DataConsentModal({ onAgree, onDecline, t }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      backgroundColor: "rgba(15,0,40,0.78)",
      display: "flex", alignItems: "flex-end",
    }}>
      <div
        className="modal-slide-up"
        style={{
          width: "100%", maxHeight: "92vh",
          backgroundColor: "#fff", borderRadius: "24px 24px 0 0",
          display: "flex", flexDirection: "column", overflow: "hidden",
        }}
      >
        {/* Purple header */}
        <div style={{
          background: "linear-gradient(135deg, #4C1D95, #7C3AED)",
          padding: "24px 24px 20px", color: "#fff", flexShrink: 0,
        }}>
          <div style={{ fontSize: "28px", marginBottom: "10px" }}>🔐</div>
          <h2 style={{ margin: "0 0 10px", fontSize: "17px", fontWeight: "700", lineHeight: 1.35, wordBreak: "keep-all" }}>
            {t.consentTitle}
          </h2>
          <p style={{ margin: 0, fontSize: "13px", opacity: 0.85, lineHeight: 1.65, wordBreak: "keep-all" }}>
            {t.consentDesc}
          </p>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 22px 4px" }}>

          {/* What we collect */}
          <div style={{ marginBottom: "16px" }}>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#059669", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "10px" }}>
              ✓ {t.consentCollects}
            </div>
            {t.consentCollectsList.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "7px" }}>
                <div style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#059669", flexShrink: 0 }} />
                <span style={{ fontSize: "13px", color: "#374151" }}>{item}</span>
              </div>
            ))}
          </div>

          {/* What we DON'T collect */}
          <div style={{ backgroundColor: "#F9FAFB", borderRadius: "14px", padding: "14px 16px", marginBottom: "16px" }}>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#DC2626", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "10px" }}>
              ✗ {t.consentNotCollects}
            </div>
            {t.consentNotCollectsList.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "7px" }}>
                <div style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#DC2626", flexShrink: 0 }} />
                <span style={{ fontSize: "13px", color: "#6B7280" }}>{item}</span>
              </div>
            ))}
          </div>

          <p style={{ fontSize: "12px", color: "#6B7280", lineHeight: 1.65, margin: "0 0 8px", wordBreak: "keep-all" }}>
            {t.consentNote}
          </p>
          <p style={{ fontSize: "13px", fontWeight: "600", color: "#7C3AED", margin: "0 0 4px", wordBreak: "keep-all" }}>
            {t.consentCanDecline}
          </p>
        </div>

        {/* Question + buttons */}
        <div style={{ padding: "16px 22px 30px", borderTop: "1px solid #F3E8FF", flexShrink: 0 }}>
          <p style={{ margin: "0 0 14px", fontSize: "14px", fontWeight: "700", color: "#1F0A3C", textAlign: "center", wordBreak: "keep-all" }}>
            {t.consentQuestion}
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={onDecline}
              style={{
                flex: 1, padding: "13px", fontSize: "13px", fontWeight: "600",
                backgroundColor: "#fff", color: "#9CA3AF",
                border: "1.5px solid #E5E7EB", borderRadius: "12px", cursor: "pointer",
              }}
            >
              {t.consentDecline}
            </button>
            <button
              onClick={onAgree}
              style={{
                flex: 1, padding: "13px", fontSize: "14px", fontWeight: "700",
                backgroundColor: "#6B21A8", color: "#fff", border: "none",
                borderRadius: "12px", cursor: "pointer",
                boxShadow: "0 4px 14px rgba(107,33,168,0.4)",
              }}
            >
              {t.consentAgree}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Pain Setup Screen (Step 1) ──────────────────────────────
const PATTERN_OPTIONS = [
  { key: "same",        color: "#7C3AED" },
  { key: "worse",       color: "#EF4444" },
  { key: "better",      color: "#10B981" },
  { key: "fluctuating", color: "#F97316" },
];

function PatternIcon({ type, color, size = 48 }) {
  const w = size * 1.4, h = size * 0.7;
  const dotStyle = { r: "4", fill: color };
  if (type === "same") return (
    <svg width={w} height={h} viewBox="0 0 60 28" overflow="visible">
      <line x1="6" y1="14" x2="50" y2="14" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.25" />
      <polyline points="42,8 50,14 42,20" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle {...dotStyle}>
        <animateMotion dur="2s" repeatCount="indefinite" path="M6,14 L50,14" calcMode="linear" />
      </circle>
    </svg>
  );
  if (type === "worse") return (
    <svg width={w} height={h} viewBox="0 0 60 28" overflow="visible">
      <path d="M6,24 C20,20 36,12 54,4" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.25" />
      <polyline points="46,2 54,4 52,12" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle {...dotStyle}>
        <animateMotion dur="2s" repeatCount="indefinite" path="M6,24 C20,20 36,12 54,4" calcMode="linear" />
      </circle>
    </svg>
  );
  if (type === "better") return (
    <svg width={w} height={h} viewBox="0 0 60 28" overflow="visible">
      <path d="M6,4 C20,8 36,16 54,24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.25" />
      <polyline points="46,26 54,24 52,16" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle {...dotStyle}>
        <animateMotion dur="2s" repeatCount="indefinite" path="M6,4 C20,8 36,16 54,24" calcMode="linear" />
      </circle>
    </svg>
  );
  if (type === "fluctuating") return (
    <svg width={w} height={h} viewBox="0 0 60 28" overflow="visible">
      <path d="M6,14 C14,2 20,2 28,14 C36,26 42,26 54,14" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.25" />
      <circle {...dotStyle}>
        <animateMotion dur="2s" repeatCount="indefinite" path="M6,14 C14,2 20,2 28,14 C36,26 42,26 54,14" calcMode="linear" />
      </circle>
    </svg>
  );
  return null;
}

function PainSetupScreen({ onNext, onBack, painData, setPainData, onPatternChosen, t }) {
  const { onset } = painData;
  const [pattern, setPattern] = useState(null);

  const handleNext = () => {
    setPainData(prev => ({ ...prev, onset }));
    onPatternChosen(pattern);
    onNext(pattern);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflowY: "auto" }}>
      <div style={{ padding: "16px 20px 4px", flexShrink: 0 }}>
        <button
          onClick={onBack}
          style={{ background: "none", border: "none", color: "#6B21A8", fontSize: "15px", cursor: "pointer", fontWeight: "600", padding: "4px 0", marginBottom: "8px", display: "block" }}
        >
          {t.back}
        </button>
        <ProgressBar step={1} total={5} label={t.stepOnset} />
        <h2 style={{ margin: 0, color: "#1F0A3C", fontSize: "20px", fontWeight: "700" }}>
          {t.painSetupTitle}
        </h2>
      </div>

      <div style={{ padding: "20px 20px 0", flexShrink: 0 }}>
        <div style={{ fontSize: "13px", fontWeight: "700", color: "#374151", marginBottom: "12px" }}>
          🕐 {t.whenDidItStart}
        </div>
        <OnsetBar onset={onset} setPainData={setPainData} t={t} />
      </div>

      <div style={{ padding: "20px 20px 0", flex: 1 }}>
        <div style={{ fontSize: "13px", fontWeight: "700", color: "#374151", marginBottom: "12px" }}>
          📊 {t.painPatternTitle}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          {PATTERN_OPTIONS.map(opt => {
            const sel = pattern === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => setPattern(opt.key)}
                style={{
                  borderRadius: "14px", padding: "14px 10px",
                  border: `2px solid ${sel ? "#6B21A8" : "#E9D5FF"}`,
                  backgroundColor: sel ? "#EDE9FE" : "#FDFBFF",
                  cursor: "pointer", textAlign: "center",
                  transition: "all 0.15s",
                  boxShadow: sel ? "0 4px 14px rgba(107,33,168,0.2)" : "none",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
                  <PatternIcon type={opt.key} color={sel ? opt.color : "#C4B5FD"} />
                </div>
                <div style={{ fontSize: "13px", fontWeight: "700", color: sel ? opt.color : "#374151" }}>
                  {t[`pattern_${opt.key}`]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ padding: "16px 20px 20px", flexShrink: 0 }}>
        <button
          onClick={handleNext}
          disabled={!onset || !pattern}
          style={{
            width: "100%", padding: "14px", fontSize: "16px", fontWeight: "600",
            backgroundColor: onset && pattern ? "#6B21A8" : "#D1D5DB",
            color: "#fff", border: "none", borderRadius: "12px",
            cursor: onset && pattern ? "pointer" : "not-allowed",
            boxShadow: onset && pattern ? "0 4px 14px rgba(107,33,168,0.35)" : "none",
          }}
        >
          {t.next}
        </button>
      </div>
    </div>
  );
}

// ─── Timeline helpers ────────────────────────────────────────
function intensityToY(intensity, svgH, padTop, padBot) {
  return padTop + ((10 - intensity) / 9) * (svgH - padTop - padBot);
}
function yToIntensity(y, svgH, padTop, padBot) {
  const raw = 10 - ((y - padTop) / (svgH - padTop - padBot)) * 9;
  return Math.min(10, Math.max(1, Math.round(raw)));
}
function nodeColor(intensity) {
  if (intensity <= 3) return "#FCD34D";
  if (intensity <= 6) return "#F97316";
  return "#EF4444";
}
function buildInitialNodes(pattern) {
  if (pattern === "worse")       return [{ intensity: 3 }, { intensity: 7 }];
  if (pattern === "better")      return [{ intensity: 8 }, { intensity: 3 }];
  if (pattern === "fluctuating") return [{ intensity: 4 }, { intensity: 8 }, { intensity: 4 }];
  return [{ intensity: 5 }, { intensity: 5 }];
}
function attachIds(nodes) {
  return nodes.map((n, i) => ({ ...n, id: i, memo: "" }));
}

// ─── Date label helpers ───────────────────────────────────────
const ONSET_DAYS = {
  onset_today: 0,
  onset_1to3days: 2,
  onset_1week: 7,
  onset_2to3weeks: 14,
  onset_1month: 30,
};

const MONTHS_EN   = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const MONTHS_EN_S = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONTHS_MS   = ['Januari','Februari','Mac','April','Mei','Jun','Julai','Ogos','September','Oktober','November','Disember'];
const MONTHS_MS_S = ['Jan','Feb','Mac','Apr','Mei','Jun','Jul','Ogs','Sep','Okt','Nov','Dis'];

function ordinalEn(n) {
  const s = ['th','st','nd','rd'], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// Returns per-node date info: { full, svgDate, svgCtx }
// full    → "4th March 2026 (now)"       used in list items & summary
// svgDate → "4 Mar"                       used on SVG x-axis (line 1)
// svgCtx  → "now" | "7 days ago" | null  used on SVG x-axis (line 2)
function nodeDateInfo(nodes, onset, lang = 'en') {
  const totalDays = ONSET_DAYS[onset] || 0;
  const now = new Date();
  return nodes.map((_, i) => {
    const ratio = nodes.length === 1 ? 0 : i / (nodes.length - 1);
    const daysAgo = Math.round(totalDays * (1 - ratio));
    const d = new Date(now);
    d.setDate(now.getDate() - daysAgo);
    const day = d.getDate(), mo = d.getMonth(), yr = d.getFullYear();

    let full, svgDate;
    if (lang === 'ko') {
      full    = `${yr}년 ${mo + 1}월 ${day}일`;
      svgDate = `${mo + 1}월${day}일`;
    } else if (lang === 'ms') {
      full    = `${day} ${MONTHS_MS[mo]} ${yr}`;
      svgDate = `${day} ${MONTHS_MS_S[mo]}`;
    } else {
      full    = `${ordinalEn(day)} ${MONTHS_EN[mo]} ${yr}`;
      svgDate = `${day} ${MONTHS_EN_S[mo]}`;
    }

    let svgCtx = null;
    if (daysAgo === 0) {
      svgCtx = lang === 'ko' ? '지금' : lang === 'ms' ? 'sekarang' : 'now';
    } else if (i === 0 && daysAgo > 0) {
      svgCtx = lang === 'ko' ? `${daysAgo}일 전` : lang === 'ms' ? `${daysAgo} hari lepas` : `${daysAgo} days ago`;
    }

    return { full: svgCtx ? `${full} (${svgCtx})` : full, svgDate, svgCtx };
  });
}

// ─── Timeline Editor (Step 20) ───────────────────────────────
const SVG_W = 340, SVG_H = 150, PAD_L = 32, PAD_R = 16, PAD_T = 12, PAD_B = 30;

function TimelineEditor({ onNext, onBack, timelineEvents, setTimelineEvents, sessionOnset, lang, t }) {
  const [nodes, setNodes] = useState(() =>
    timelineEvents.length > 0 ? timelineEvents : attachIds(buildInitialNodes("worse"))
  );
  const [activeNodeIdx, setActiveNodeIdx] = useState(0);
  const [dragListIdx, setDragListIdx] = useState(null);
  const svgRef = useRef(null);

  // Sync to parent on every node change so data is never lost when navigating back
  useEffect(() => { setTimelineEvents(nodes); }, [nodes]); // eslint-disable-line

  const dateInfos = nodeDateInfo(nodes, sessionOnset, lang);

  const xOf = (i, total) => PAD_L + (i / (total - 1)) * (SVG_W - PAD_L - PAD_R);
  const yOf = (v) => intensityToY(v, SVG_H, PAD_T, PAD_B);

  const buildPath = (ns) => {
    if (ns.length < 2) return "";
    const pts = ns.map((n, i) => [xOf(i, ns.length), yOf(n.intensity)]);
    let d = `M ${pts[0][0]},${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const mx = (pts[i-1][0] + pts[i][0]) / 2;
      d += ` C ${mx},${pts[i-1][1]} ${mx},${pts[i][1]} ${pts[i][0]},${pts[i][1]}`;
    }
    return d;
  };

  // Single handler for both drag-intensity and tap-to-edit.
  // Tracks movement — if pointer moves > 5px it's a drag; otherwise opens the editor on release.
  const handleNodePointerDown = (idx, e) => {
    e.stopPropagation();
    if (e.cancelable) e.preventDefault();
    setActiveNodeIdx(idx);
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const scaleY = SVG_H / rect.height;
    const startClientY = e.touches ? e.touches[0].clientY : e.clientY;
    let moved = false;

    const onMove = (ev) => {
      const clientY = ev.touches ? ev.touches[0].clientY : ev.clientY;
      if (Math.abs(clientY - startClientY) > 5) moved = true;
      const svgY = (clientY - rect.top) * scaleY;
      setNodes(prev => prev.map((n, i) => i === idx ? { ...n, intensity: yToIntensity(svgY, SVG_H, PAD_T, PAD_B) } : n));
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);
  };

  const addNode = () => {
    if (nodes.length >= 5) return;
    const mid = Math.floor(nodes.length / 2);
    const avgI = Math.round((nodes[mid - 1].intensity + nodes[mid].intensity) / 2);
    const newNode = { id: Date.now(), intensity: avgI, memo: "" };
    const next = [...nodes];
    next.splice(mid, 0, newNode);
    setNodes(next.map((n, i) => ({ ...n, id: i })));
  };

  const removeNode = (idx) => {
    if (nodes.length <= 2) return;
    setNodes(prev => prev.filter((_, i) => i !== idx).map((n, i) => ({ ...n, id: i })));
  };

  // DnD list reorder
  const handleListDrop = (dropIdx) => {
    if (dragListIdx === null || dragListIdx === dropIdx) return;
    const next = [...nodes];
    const [removed] = next.splice(dragListIdx, 1);
    next.splice(dropIdx, 0, removed);
    setNodes(next.map((n, i) => ({ ...n, id: i })));
    setDragListIdx(null);
  };


  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "16px 20px 4px", flexShrink: 0 }}>
        <button
          onClick={onBack}
          style={{ background: "none", border: "none", color: "#6B21A8", fontSize: "15px", cursor: "pointer", fontWeight: "600", padding: "4px 0", marginBottom: "8px", display: "block" }}
        >
          {t.back}
        </button>
        <ProgressBar step={4} total={5} label={t.stepIntensity} />
        <h2 style={{ margin: "0 0 4px", color: "#1F0A3C", fontSize: "20px", fontWeight: "700" }}>{t.timelineTitle}</h2>
        <p style={{ margin: 0, color: "#888", fontSize: "13px" }}>{t.timelineSub}</p>
      </div>

      {/* Intensity display — mirrors IntensitySlider without the slider */}
      {(() => {
        const ai = nodes[activeNodeIdx]?.intensity ?? 5;
        const ac = intensityColor(ai);
        return (
          <div style={{ padding: "0 20px 20px", flexShrink: 0, textAlign: "center" }}>
            <div style={{ fontSize: "72px", lineHeight: 1, marginBottom: "2px" }}>
              {FACES[ai - 1]}
            </div>
            <div style={{ fontSize: "16px", fontWeight: "700", color: ac, marginTop: "6px", marginBottom: "10px", transition: "color 0.2s" }}>
              {intensityLabel(ai, t)}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "4px" }}>
              {Array.from({ length: 10 }, (_, i) => {
                const hit = i + 1 === ai;
                return (
                  <div key={i} style={{
                    width: "20px", height: "20px", borderRadius: "50%",
                    backgroundColor: intensityColor(i + 1),
                    opacity: hit ? 1 : 0.22,
                    transform: hit ? "scale(1.25)" : "scale(1)",
                    transition: "opacity 0.15s, transform 0.15s",
                    boxShadow: hit ? `0 0 8px ${intensityColor(i + 1)}88` : "none",
                  }} />
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* SVG Graph */}
      <div style={{ padding: "0 16px", flexShrink: 0 }}>
        <div style={{ backgroundColor: "#0C0020", borderRadius: "16px", overflow: "hidden" }}>
          {/* Y-axis label */}
          <div style={{ display: "flex", justifyContent: "flex-end", padding: "4px 12px 0 0" }}>
            <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.5px" }}>INTENSITY ▲</span>
          </div>
          <svg ref={svgRef} viewBox={`0 0 ${SVG_W} ${SVG_H}`} style={{ width: "100%", display: "block", touchAction: "none" }}>
            {/* Y-axis grid */}
            {[2, 4, 6, 8, 10].map(v => {
              const y = yOf(v);
              return (
                <g key={v}>
                  <line x1={PAD_L} y1={y} x2={SVG_W - PAD_R} y2={y} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                  <text x={PAD_L - 4} y={y + 4} textAnchor="end" fontSize="9" fill="rgba(255,255,255,0.4)">{v}</text>
                </g>
              );
            })}

            {/* Area fill */}
            {nodes.length >= 2 && (
              <path
                d={buildPath(nodes) + ` L ${xOf(nodes.length-1, nodes.length)},${SVG_H - PAD_B} L ${xOf(0, nodes.length)},${SVG_H - PAD_B} Z`}
                fill="rgba(124,58,237,0.13)"
              />
            )}

            {/* Bezier path */}
            <path d={buildPath(nodes)} fill="none" stroke="rgba(167,139,250,0.75)" strokeWidth="2.5" strokeLinecap="round" />

            {/* Nodes */}
            {nodes.map((node, i) => {
              const cx = xOf(i, nodes.length), cy = yOf(node.intensity);
              const col = nodeColor(node.intensity);
              return (
                <g key={node.id} style={{ cursor: "ns-resize" }}>
                  <circle cx={cx} cy={cy} r="14"
                    fill={col}
                    stroke="#fff"
                    strokeWidth="2.5"
                    onMouseDown={e => handleNodePointerDown(i, e)}
                    onTouchStart={e => handleNodePointerDown(i, e)}
                  />
                  <text x={cx} y={cy + 4} textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff" style={{ pointerEvents: "none" }}>
                    {node.intensity}
                  </text>
                </g>
              );
            })}

            {/* X date labels */}
            {nodes.map((_, i) => {
              const cx = xOf(i, nodes.length);
              const { svgDate, svgCtx } = dateInfos[i];
              return (
                <g key={i}>
                  <text x={cx} y={SVG_H - PAD_B + 12} textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.6)">{svgDate}</text>
                  {svgCtx && <text x={cx} y={SVG_H - PAD_B + 22} textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.35)">{svgCtx}</text>}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Node list — draggable for reordering */}
      <div style={{ flex: 1, overflowY: "auto", padding: "8px 16px 0" }}>
        {nodes.map((node, i) => {
          const col = nodeColor(node.intensity);
          return (
            <div
              key={node.id}
              draggable
              onDragStart={() => setDragListIdx(i)}
              onDragOver={e => e.preventDefault()}
              onDrop={() => handleListDrop(i)}
              onDragEnd={() => setDragListIdx(null)}
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "10px 14px", borderRadius: "12px",
                border: "1.5px solid #E9D5FF",
                backgroundColor: dragListIdx === i ? "#F5F3FF" : "#FDFBFF",
                marginBottom: "8px", cursor: "grab", userSelect: "none",
                opacity: dragListIdx === i ? 0.5 : 1,
                transition: "opacity 0.15s",
              }}
            >
              <span style={{ color: "#C4B5FD", fontSize: "16px", cursor: "grab" }}>⠿</span>
              <div style={{
                width: "34px", height: "34px", borderRadius: "50%",
                backgroundColor: col, display: "flex", alignItems: "center",
                justifyContent: "center", flexShrink: 0,
              }}>
                <span style={{ fontSize: "12px", fontWeight: "800", color: "#fff" }}>{node.intensity}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "12px", fontWeight: "700", color: "#374151" }}>{dateInfos[i].full}</div>
              </div>
              {nodes.length > 2 && (
                <button
                  onClick={e => { e.stopPropagation(); removeNode(i); }}
                  style={{ background: "none", border: "none", color: "#D1D5DB", fontSize: "14px", cursor: "pointer", padding: "4px" }}
                >
                  ✕
                </button>
              )}
              <span style={{ fontSize: "16px", color: "#A78BFA" }}>›</span>
            </div>
          );
        })}
      </div>

      {/* Add node + Next */}
      <div style={{ padding: "8px 16px 16px", flexShrink: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
        {nodes.length < 5 && (
          <button
            onClick={addNode}
            style={{
              padding: "10px", fontSize: "13px", fontWeight: "600",
              backgroundColor: "#fff", color: "#6B21A8",
              border: "1.5px solid #DDD6FE", borderRadius: "10px", cursor: "pointer",
            }}
          >
            {t.addNode}
          </button>
        )}
        <button
          onClick={() => { setTimelineEvents(nodes); onNext(); }}
          style={{
            padding: "14px", fontSize: "16px", fontWeight: "600",
            backgroundColor: "#6B21A8",
            color: "#fff", border: "none", borderRadius: "12px",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(107,33,168,0.35)",
          }}
        >
          {t.next}
        </button>
      </div>

    </div>
  );
}

// ─── Timeline Summary Block ───────────────────────────────────
function TimelineSummaryBlock({ events, sessionOnset, lang, t }) {
  if (!events.length) return null;
  const SVG_W2 = 300, SVG_H2 = 90, PL = 28, PR = 12, PT = 10, PB = 24;
  const xOf = (i, n) => PL + (i / (n - 1)) * (SVG_W2 - PL - PR);
  const yOf = (v) => intensityToY(v, SVG_H2, PT, PB);
  const buildPath2 = (ns) => {
    const pts = ns.map((n, i) => [xOf(i, ns.length), yOf(n.intensity)]);
    let d = `M ${pts[0][0]},${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const mx = (pts[i-1][0] + pts[i][0]) / 2;
      d += ` C ${mx},${pts[i-1][1]} ${mx},${pts[i][1]} ${pts[i][0]},${pts[i][1]}`;
    }
    return d;
  };
  const dateInfos = nodeDateInfo(events, sessionOnset, lang);

  return (
    <div style={{ marginBottom: "8px" }}>
      {/* Mini chart */}
      <div style={{ backgroundColor: "#0C0020", borderRadius: "14px", overflow: "hidden", marginBottom: "16px" }}>
        <svg viewBox={`0 0 ${SVG_W2} ${SVG_H2}`} style={{ width: "100%", display: "block" }}>
          {[2, 4, 6, 8, 10].map(v => (
            <g key={v}>
              <line x1={PL} y1={yOf(v)} x2={SVG_W2 - PR} y2={yOf(v)} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <text x={PL - 3} y={yOf(v) + 3} textAnchor="end" fontSize="7" fill="rgba(255,255,255,0.35)">{v}</text>
            </g>
          ))}
          {events.length >= 2 && (
            <path
              d={buildPath2(events) + ` L ${xOf(events.length-1, events.length)},${SVG_H2 - PB} L ${xOf(0, events.length)},${SVG_H2 - PB} Z`}
              fill="rgba(124,58,237,0.15)"
            />
          )}
          <path d={buildPath2(events)} fill="none" stroke="rgba(167,139,250,0.85)" strokeWidth="2" strokeLinecap="round" />
          {events.map((n, i) => {
            const cx = xOf(i, events.length), cy = yOf(n.intensity);
            const col = nodeColor(n.intensity);
            const { svgDate, svgCtx } = dateInfos[i];
            return (
              <g key={i}>
                <circle cx={cx} cy={cy} r="7" fill={col} stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
                <text x={cx} y={cy + 3} textAnchor="middle" fontSize="7" fontWeight="700" fill="#fff">{n.intensity}</text>
                <text x={cx} y={SVG_H2 - PB + 12} textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.55)">{svgDate}</text>
                {svgCtx && <text x={cx} y={SVG_H2 - PB + 21} textAnchor="middle" fontSize="6" fill="rgba(255,255,255,0.3)">{svgCtx}</text>}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Full EntryBlock per node */}
      {events.map((node, i) => (
        <EntryBlock
          key={i}
          entry={{ location: node.location || [], painTypes: node.painTypes || [], intensity: node.intensity, onset: null }}
          index={i}
          t={t}
          totalEntries={events.length}
          dateLabel={dateInfos[i].full}
        />
      ))}
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────
export default function App() {
  const [step, setStep] = useState(0);
  const [lang, setLang] = useState("ko");
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState(emptyEntry());
  const [painPattern, setPainPattern] = useState(null);
  const [timelineEvents, setTimelineEvents] = useState([]);

  // null = not yet answered this session, true = agreed, false = declined
  const [sessionNote, setSessionNote] = useState("");

  // null = not yet answered this session, true = agreed, false = declined
  const [consentGiven, setConsentGiven] = useState(null);
  const [showDataConsent, setShowDataConsent] = useState(false);

  const t = translations[lang];

  const goNext = () => {
    // After PainTypeSelector (step 4): non-same patterns jump to timeline instead of intensity slider
    if (step === 4 && painPattern && painPattern !== "same") {
      setTimelineEvents(attachIds(buildInitialNodes(painPattern)));
      setStep(20);
    } else {
      setStep(p => p + 1);
    }
  };

  const goBack = () => {
    if (step === 2 && entries.length > 0) {
      setStep(6);
    } else if (step === 4) {
      setStep(2); // always back to BodySelector (head detail handled inside it)
    } else if (step === 20) {
      setStep(4); // timeline back → PainTypeSelector
    } else if (step === 7 && painPattern && painPattern !== "same") {
      setStep(20);
    } else {
      setStep(p => p - 1);
    }
  };

  const handlePatternChosen = (pattern) => {
    setPainPattern(pattern);
  };

  const handleSetupNext = () => {
    setStep(2);
  };

  // Only reached for "same" pattern (step 3 → step 4)

  // Head detail selection now happens inside BodySelector — always go to step 4
  const handleBodyNext = () => {
    setStep(4);
  };

  const handleTimelineNext = () => setStep(7);

  const handleAddMore = () => {
    setEntries(prev => [...prev, currentEntry]);
    setCurrentEntry({ ...emptyEntry(), onset: currentEntry.onset });
    setStep(2);
  };

  const handleGoSummary = () => setStep(7);

  // Called from StartScreen — always show consent modal before entering the flow
  const handleStartNext = () => {
    setShowDataConsent(true);
  };

  const handleDataConsentAgree = () => {
    setConsentGiven(true);
    setShowDataConsent(false);
    goNext();
  };

  const handleDataConsentDecline = () => {
    setConsentGiven(false);
    setShowDataConsent(false);
    goNext();
  };

  const restart = () => {
    setStep(0);
    setEntries([]);
    setCurrentEntry(emptyEntry());
    setPainPattern(null);
    setTimelineEvents([]);
    setSessionNote("");
    setConsentGiven(null);
  };

  const handleSave = () => {
    const isTimeline = painPattern && painPattern !== "same" && timelineEvents.length > 0;
    const sessionEntries = isTimeline
      ? timelineEvents.map(e => ({
          location: currentEntry.location || [],
          painTypes: currentEntry.painTypes || [],
          intensity: e.intensity,
          onset: currentEntry.onset,
          memo: e.memo || "",
        }))
      : [...entries, currentEntry].filter(e => e.location?.length > 0 && e.painTypes?.length > 0);

    // Always save locally
    try {
      const session = {
        date: new Date().toISOString(),
        entries: sessionEntries,
        painPattern,
        timelineEvents: isTimeline ? timelineEvents : undefined,
        note: sessionNote || undefined,
      };
      const existing = JSON.parse(localStorage.getItem("pain-app-sessions") || "[]");
      localStorage.setItem("pain-app-sessions", JSON.stringify([session, ...existing].slice(0, 20)));
    } catch {}

    // Send to Supabase only if consent given (fire-and-forget)
    if (consentGiven) {
      const allAreas = [...new Set(sessionEntries.flatMap(e => e.location || []))];
      const allTypes = [...new Set(sessionEntries.flatMap(e => e.painTypes || []))];
      const avgIntensity = sessionEntries.length > 0
        ? Math.round(sessionEntries.reduce((s, e) => s + (e.intensity || 0), 0) / sessionEntries.length)
        : null;
      savePainRecord({
        pain_started_at: currentEntry.onset,
        pain_change_pattern: painPattern,
        pain_area: allAreas,
        pain_type: allTypes,
        pain_intensity: avgIntensity,
        timeline_data: isTimeline ? sessionEntries : null,
        lang,
        created_at: new Date().toISOString(),
      }).catch(() => {});
    }

    restart();
  };

  return (
    <div style={{
      width: "100%", height: "100%",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      backgroundColor: "#fff",
      display: "flex", flexDirection: "column",
    }}>
      {/* Language selector */}
      <div style={{
        display: "flex", justifyContent: "flex-end", alignItems: "center",
        padding: "12px 18px", borderBottom: "1px solid #F3E8FF",
        backgroundColor: "#FDFBFF", flexShrink: 0,
      }}>
        <select
          value={lang}
          onChange={e => setLang(e.target.value)}
          style={{
            padding: "5px 10px", borderRadius: "8px",
            border: "1.5px solid #DDD6FE", color: "#6B21A8",
            fontWeight: "600", cursor: "pointer",
            backgroundColor: "#fff", fontSize: "13px", outline: "none",
          }}
        >
          <option value="en">🇬🇧 EN</option>
          <option value="ko">🇰🇷 한국어</option>
          <option value="ms">🇲🇾 BM</option>
        </select>
      </div>

      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        {step === 0 && <StartScreen onNext={handleStartNext} t={t} />}
        {step === 1 && (
          <PainSetupScreen
            onNext={handleSetupNext} onBack={goBack}
            painData={currentEntry} setPainData={setCurrentEntry}
            onPatternChosen={handlePatternChosen} t={t}
          />
        )}
        {step === 2 && (
          <BodySelector
            onNext={handleBodyNext} onBack={goBack}
            setPainData={setCurrentEntry} t={t}
          />
        )}
        {step === 4 && (
          <PainTypeSelector
            onNext={goNext} onBack={goBack}
            painData={currentEntry} setPainData={setCurrentEntry} t={t}
          />
        )}
        {step === 5 && (
          <IntensitySlider
            onNext={goNext} onBack={goBack}
            painData={currentEntry} setPainData={setCurrentEntry} t={t}
          />
        )}
        {step === 6 && (
          <AddMoreScreen
            entries={entries} currentEntry={currentEntry}
            onAddMore={handleAddMore} onGoSummary={handleGoSummary}
            onBack={goBack} t={t}
          />
        )}
        {step === 7 && (
          <SummaryCard
            entries={entries} currentEntry={currentEntry}
            onConsent={handleSave} onBack={goBack}
            painPattern={painPattern} timelineEvents={timelineEvents}
            sessionOnset={currentEntry.onset}
            lang={lang} t={t}
            sessionNote={sessionNote} setSessionNote={setSessionNote}
          />
        )}
        {step === 20 && (
          <TimelineEditor
            onNext={handleTimelineNext} onBack={() => setStep(1)}
            timelineEvents={timelineEvents} setTimelineEvents={setTimelineEvents}
            sessionOnset={currentEntry.onset} lang={lang} t={t}
          />
        )}
      </div>

      {/* Data consent modal — shown once after first "Start" tap */}
      {showDataConsent && (
        <DataConsentModal
          onAgree={handleDataConsentAgree}
          onDecline={handleDataConsentDecline}
          t={t}
        />
      )}
    </div>
  );
}
