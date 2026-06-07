"use client";
import { useCallback, useEffect, useRef, useState } from "react";

/*
  Image strategy:
  - "After" = the clean/finished state (a good-quality Unsplash photo)
  - "Before" = the same image rendered with CSS filters that simulate dirty/neglected state
    (desaturated, lower contrast, slight warm haze)
  - This guarantees the transformation is immediately legible at any screen size.
*/

function Slider({
  img, imgAlt, label, location, index,
  beforeFilter,
}: {
  img: string; imgAlt: string; label: string; location: string; index: number;
  beforeFilter: string;
}) {
  const root     = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(38); // start left so "after" is dominant
  const dragging = useRef(false);

  const clamp = (v: number) => Math.min(100, Math.max(0, v));

  const moveFromClient = useCallback((clientX: number) => {
    if (!root.current) return;
    const { left, width } = root.current.getBoundingClientRect();
    setPct(clamp(((clientX - left) / width) * 100));
  }, []);

  // Pointer events (mouse + stylus)
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    moveFromClient(e.clientX);
  }, [moveFromClient]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    moveFromClient(e.clientX);
  }, [moveFromClient]);

  const onPointerUp = useCallback(() => { dragging.current = false; }, []);

  // Touch events (mobile)
  const onTouchMove = useCallback((e: React.TouchEvent) => {
    moveFromClient(e.touches[0].clientX);
  }, [moveFromClient]);

  // Keyboard accessibility
  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft")  setPct(p => clamp(p - 5));
    if (e.key === "ArrowRight") setPct(p => clamp(p + 5));
  }, []);

  // Scroll reveal
  const wrapRef  = useRef<HTMLDivElement>(null);
  const revealed = useRef(false);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(48px)";
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !revealed.current) {
        revealed.current = true;
        el.style.transition = `opacity 1s cubic-bezier(0.16,1,0.3,1) ${index * 100}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${index * 100}ms`;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        obs.disconnect();
      }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div ref={wrapRef}>
      {/* Meta row */}
      <div className="max-w-[1500px] mx-auto px-6 md:px-10 lg:px-16 flex items-center justify-between py-4 md:py-5">
        <div className="flex items-center gap-5">
          <span className="t-label text-[#f0ede6]/18">{String(index + 1).padStart(2, "0")}</span>
          <span className="t-label text-[#f0ede6]/65">{label}</span>
        </div>
        <span className="t-label text-[#f0ede6]/28 hidden sm:block">{location}</span>
      </div>

      {/* Slider */}
      <div
        ref={root}
        className="ba-root w-full select-none"
        style={{ height: "clamp(280px, 50vw, 680px)" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onTouchMove={onTouchMove}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="slider"
        aria-label={`${label} before and after comparison`}
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
          {/* AFTER — clean result, sits behind, always full-width */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt={`After: ${imgAlt}`}
          className="ba-after"
          draggable={false}
        />

        {/* BEFORE — same image, clipped right with clip-path, filter makes it look dirty */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt={`Before: ${imgAlt}`}
          className="ba-before"
          style={{
            filter: beforeFilter,
            clipPath: `inset(0 ${100 - pct}% 0 0)`,
          }}
          draggable={false}
        />
        {/* Grime overlay — only visible on before side */}
        <div
          style={{
            position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
            clipPath: `inset(0 ${100 - pct}% 0 0)`,
            background: "linear-gradient(135deg, rgba(55,38,15,0.32) 0%, rgba(35,35,25,0.22) 100%)",
          }}
        />

        {/* Divider line + handle */}
        <div className="ba-line" style={{ left: `${pct}%` }}>
          <div className="ba-handle">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M8 5L3 11L8 17M14 5L19 11L14 17" stroke="#1c3a1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Labels — anchored to outer edges, never overlap handle */}
        <div style={{ position: "absolute", bottom: 20, left: 20, zIndex: 12, pointerEvents: "none" }}>
          <span className="t-label text-[#f0ede6]/70 bg-[#0c0c0a]/60 px-3 py-2"
            style={{ backdropFilter: "blur(8px)", fontSize: "0.6rem" }}>
            Before
          </span>
        </div>
        <div style={{ position: "absolute", bottom: 20, right: 20, zIndex: 12, pointerEvents: "none" }}>
          <span className="t-label text-[#0c0c0a] bg-[#c8d5b0]/95 px-3 py-2"
            style={{ fontSize: "0.6rem" }}>
            After
          </span>
        </div>

        {/* Drag hint — fades after first interaction */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 13, pointerEvents: "none", opacity: pct === 38 ? 1 : 0, transition: "opacity 0.4s" }}>
          <div className="t-label text-[#f0ede6]/50 text-center" style={{ fontSize: "0.6rem", letterSpacing: "0.2em", whiteSpace: "nowrap" }}>
            drag to compare
          </div>
        </div>
      </div>
    </div>
  );
}

const pairs = [
  {
    label: "Window Cleaning",
    location: "St. Vital, Winnipeg",
    img: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1600&q=88&auto=format&fit=crop",
    imgAlt: "Residential windows — crystal clear after professional cleaning",
    // Makes it look foggy, grimy, low contrast
    beforeFilter: "saturate(0.35) contrast(0.75) brightness(0.82) sepia(0.25)",
  },
  {
    label: "Lawn Care",
    location: "River Heights, Winnipeg",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=88&auto=format&fit=crop",
    imgAlt: "Manicured Winnipeg lawn — clean edges and even cut",
    // Makes it look dry, patchy, overgrown
    beforeFilter: "saturate(0.4) contrast(0.8) brightness(0.78) sepia(0.3) hue-rotate(8deg)",
  },
  {
    label: "Exterior Glass & Property",
    location: "Tuxedo, Winnipeg",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=88&auto=format&fit=crop",
    imgAlt: "Well-maintained Winnipeg home exterior after full property service",
    // Makes it look weathered, dirty, dull
    beforeFilter: "saturate(0.3) contrast(0.7) brightness(0.75) sepia(0.2)",
  },
];

export default function Transformations() {
  const labelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = labelRef.current;
    if (!el) return;
    el.style.opacity = "0"; el.style.transform = "translateY(32px)";
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.transition = "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)";
        el.style.opacity = "1"; el.style.transform = "translateY(0)";
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="work" className="bg-[#0c0c0a] pt-24 md:pt-32">
      <div className="max-w-[1500px] mx-auto px-6 md:px-10 lg:px-16 mb-12 md:mb-16">
        <div ref={labelRef} className="flex items-center gap-6">
          <span className="t-label text-[#c8d5b0]/60">02 — Transformations</span>
          <span className="flex-1 h-px bg-[#f0ede6]/8 max-w-[80px]" />
          <span className="t-label text-[#f0ede6]/20 hidden sm:block">Drag to compare</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {pairs.map((p, i) => (
          <Slider
            key={p.label}
            img={p.img}
            imgAlt={p.imgAlt}
            label={p.label}
            location={p.location}
            index={i}
            beforeFilter={p.beforeFilter}
          />
        ))}
      </div>
    </section>
  );
}
