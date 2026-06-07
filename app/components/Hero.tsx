"use client";
import { useEffect, useRef } from "react";
import ParallaxImage from "./ParallaxImage";

export default function Hero() {
  const lineRef = useRef<HTMLDivElement>(null);
  const h1Ref  = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const numRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Staggered entrance after mount
    const els = [lineRef, h1Ref, subRef, ctaRef, numRef];
    els.forEach((r, i) => {
      if (!r.current) return;
      r.current.style.opacity = "0";
      r.current.style.transform = "translateY(32px)";
      setTimeout(() => {
        if (!r.current) return;
        r.current.style.transition = "opacity 1.1s cubic-bezier(0.16,1,0.3,1), transform 1.1s cubic-bezier(0.16,1,0.3,1)";
        r.current.style.opacity = "1";
        r.current.style.transform = "translateY(0)";
      }, 200 + i * 140);
    });
  }, []);

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col justify-end overflow-hidden bg-[#0c0c0a]">
      {/* Background */}
      <div className="absolute inset-0">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=90&auto=format&fit=crop"
          alt=""
          speed={0.1}
          className="absolute inset-0 w-full h-full"
          style={{ position: "absolute", inset: 0 }}
        />
        {/* Multi-layer: keep top sky, aggressive crush at bottom */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(12,12,10,0.1) 0%, rgba(12,12,10,0.15) 30%, rgba(12,12,10,0.65) 65%, rgba(12,12,10,0.98) 100%)"
        }} />
        {/* Green atmosphere near horizon */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 100% 50% at 50% 85%, rgba(30,58,20,0.4) 0%, transparent 65%)"
        }} />
      </div>

      {/* Main content block */}
      <div className="relative z-10 w-full px-6 md:px-10 lg:px-16 pb-12 md:pb-20 lg:pb-28" style={{ maxWidth: "min(100%, 1500px)", margin: "0 auto" }}>

        {/* Location pill — top of content block */}
        <div ref={lineRef} className="flex items-center gap-4 mb-10 md:mb-14">
          <span className="t-label text-[#c8d5b0]/80">Winnipeg, Manitoba</span>
          <span className="w-8 h-px bg-[#f0ede6]/15" />
          <span className="t-label text-[#f0ede6]/25">Est. 2023</span>
        </div>

        {/* Headline */}
        <h1
          ref={h1Ref}
          className="t-display text-[#f0ede6] mb-8 md:mb-10"
          style={{ fontSize: "clamp(3.2rem, 9vw, 9rem)", maxWidth: "14ch" }}
        >
          Winnipeg homes{" "}
          <span className="t-display-italic text-[#c8d5b0]">deserve better.</span>
        </h1>

        {/* Sub + CTA row */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-12">
          <p
            ref={subRef}
            className="t-body text-[#f0ede6]/48"
            style={{ fontSize: "clamp(0.88rem, 1.4vw, 1rem)", maxWidth: "36ch", lineHeight: 1.75 }}
          >
            Window cleaning and lawn care done by two guys who actually care what their name is attached to.
          </p>
          <a
            ref={ctaRef}
            href="#contact"
            className="flex-shrink-0 t-label text-[#0c0c0a] bg-[#c8d5b0] px-8 py-4 hover:bg-[#deeace] active:bg-[#b8c8a0] transition-colors duration-200"
            style={{ letterSpacing: "0.12em" }}
          >
            Get a free estimate
          </a>
        </div>

        {/* Stats strip */}
        <div
          ref={numRef}
          className="mt-14 md:mt-20 pt-7 grid grid-cols-3 gap-4 md:gap-8"
          style={{ borderTop: "1px solid rgba(240,237,230,0.1)" }}
        >
          {[
            { n: "500+", l: "Properties serviced" },
            { n: "5.0★", l: "Google rating" },
            { n: "2 yrs", l: "Serving Winnipeg" },
          ].map(s => (
            <div key={s.l}>
              <div className="t-display text-[#f0ede6]" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.6rem)" }}>{s.n}</div>
              <div className="t-label text-[#f0ede6]/30 mt-1.5" style={{ fontSize: "0.65rem" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute right-6 md:right-10 bottom-8 hidden md:flex flex-col items-center gap-2.5 z-10">
        <span className="t-label text-[#f0ede6]/20" style={{ writingMode: "vertical-rl", fontSize: "0.6rem" }}>scroll</span>
        <span className="block w-px h-8 bg-[#f0ede6]/12" style={{ animation: "pulseHeight 2s ease-in-out infinite" }} />
      </div>
      <style>{`@keyframes pulseHeight { 0%,100%{opacity:0.3} 50%{opacity:0.8} }`}</style>
    </section>
  );
}
