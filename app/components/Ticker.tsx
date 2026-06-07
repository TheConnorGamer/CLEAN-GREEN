"use client";

const items = [
  "Window Cleaning",
  "Lawn Mowing",
  "Spring Cleanup",
  "Exterior Glass",
  "Lawn Edging",
  "Fertilizer",
  "Weed Control",
  "Core Aeration",
  "Winnipeg, MB",
];

export default function Ticker() {
  const repeated = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden border-t border-b border-[#f0ede6]/8 py-4 bg-[#0c0c0a]">
      <div
        className="flex gap-10 whitespace-nowrap"
        style={{
          animation: "ticker 28s linear infinite",
          width: "max-content",
        }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="t-label text-[#f0ede6]/20 flex items-center gap-10">
            {item}
            <span className="text-[#c8d5b0]/30">·</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
