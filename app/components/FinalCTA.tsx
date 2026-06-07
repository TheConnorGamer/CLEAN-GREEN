"use client";
import { useEffect, useRef } from "react";
import ParallaxImage from "./ParallaxImage";

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0"; el.style.transform = "translateY(48px)";
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.transition = "opacity 1.2s cubic-bezier(0.16,1,0.3,1), transform 1.2s cubic-bezier(0.16,1,0.3,1)";
        el.style.opacity = "1"; el.style.transform = "translateY(0)";
        obs.disconnect();
      }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative bg-[#0c0c0a] overflow-hidden" style={{ minHeight: "clamp(560px, 72vh, 860px)" }}>
      {/* Background — lawn at dusk, distinct from hero */}
      <ParallaxImage
        src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&q=88&auto=format&fit=crop"
        alt=""
        speed={0.14}
        className="absolute inset-0 w-full h-full"
        style={{ position: "absolute", inset: 0 }}
      />
      {/* Gradient: heavy black from bottom, let image breathe at top */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(to top, #0c0c0a 0%, rgba(12,12,10,0.82) 45%, rgba(12,12,10,0.25) 100%)"
      }} />
      {/* Green tint */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(25,48,18,0.45) 0%, transparent 70%)"
      }} />

      {/* Content — bottom-left aligned like the hero */}
      <div
        ref={ref}
        className="absolute inset-0 flex flex-col justify-end px-6 md:px-10 lg:px-16 pb-14 md:pb-20 lg:pb-28"
        style={{ maxWidth: "min(100%, 1500px)", margin: "0 auto", left: 0, right: 0 }}
      >
        <p className="t-label text-[#c8d5b0]/60 mb-8" style={{ fontSize: "0.65rem" }}>
          Ready when you are
        </p>
        <h2
          className="t-display text-[#f0ede6] mb-8 md:mb-10"
          style={{ fontSize: "clamp(3rem, 8.5vw, 8rem)", lineHeight: 0.94, maxWidth: "14ch" }}
        >
          Let&rsquo;s sort<br />
          <span className="t-display-italic text-[#c8d5b0]">your property.</span>
        </h2>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <a
            href="tel:2048993566"
            className="t-label bg-[#c8d5b0] text-[#0c0c0a] px-8 py-4 hover:bg-[#deeace] active:bg-[#b8c8a0] transition-colors duration-200"
            style={{ fontSize: "0.68rem", letterSpacing: "0.14em" }}
          >
            Call 204-899-3566
          </a>
          <a
            href="sms:2048993566"
            className="t-label border border-[#f0ede6]/20 text-[#f0ede6]/55 px-8 py-4 hover:border-[#f0ede6]/45 hover:text-[#f0ede6] transition-all duration-200"
            style={{ fontSize: "0.68rem", letterSpacing: "0.14em" }}
          >
            Send a text
          </a>
        </div>
      </div>
    </section>
  );
}
