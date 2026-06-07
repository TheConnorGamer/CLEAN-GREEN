"use client";
import { useEffect, useRef } from "react";
import ParallaxImage from "./ParallaxImage";

function useReveal(cls = "r") {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add(cls);
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("in"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [cls]);
  return ref;
}

export default function Story() {
  const label   = useReveal("r");
  const heading = useReveal("r-slow");
  const p1      = useReveal("r");
  const p2      = useReveal("r");
  const img1    = useReveal("r-img");
  const img2    = useReveal("r-img");
  const pullRef = useReveal("r-slow");

  return (
    <section id="story" className="bg-[#0c0c0a] pt-24 md:pt-32 pb-0">
      {/* ── Chapter label ── */}
      <div className="max-w-[1500px] mx-auto px-6 md:px-10 lg:px-16">
        <div ref={label} className="flex items-center gap-6 mb-16 md:mb-20">
          <span className="t-label text-[#c8d5b0]/60">01 — Story</span>
          <span className="flex-1 h-px bg-[#f0ede6]/8 max-w-[80px]" />
        </div>
      </div>

      {/* ── Large editorial grid ── */}
      <div className="max-w-[1500px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">

          {/* Left — portrait image */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 self-start">
            <div ref={img1} style={{ aspectRatio: "3/4", position: "relative" }}>
              <ParallaxImage
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=90&auto=format&fit=crop"
                alt="Clean & Green Services — hands-on property maintenance in Winnipeg"
                speed={0.14}
                className="w-full"
                style={{ aspectRatio: "3/4" }}
              />
              <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(12,12,10,0.55) 0%, transparent 55%)" }} />
              <div className="absolute bottom-0 left-0 p-8">
                <p className="t-label text-[#f0ede6]/50 mb-1">Idan &amp; Tristin</p>
                <p className="t-body text-[#f0ede6]/80 text-sm">Co-founders · Winnipeg</p>
              </div>
            </div>
          </div>

          {/* Right — text column */}
          <div className="lg:col-span-7 lg:pl-12 pt-0 lg:pt-24 flex flex-col gap-10 md:gap-12">
            <div>
              <h2
                ref={heading}
                className="t-display text-[#f0ede6]"
                style={{ fontSize: "clamp(2.4rem, 5.5vw, 5rem)" }}
              >
                Two guys who got tired of
                <br />
                <span className="t-display-italic text-[#c8d5b0]">watching it be done badly.</span>
              </h2>
            </div>

            <div ref={p1} className="flex flex-col gap-6 max-w-[580px]">
              <p className="t-body text-[#f0ede6]/65" style={{ fontSize: "1.05rem" }}>
                Idan and Tristin started Clean&nbsp;&amp;&nbsp;Green in 2023. Not because they spotted a market gap in a spreadsheet. Because they kept seeing homes with grimy windows, overgrown lawns, and properties that looked like nobody cared — and they knew they could do better.
              </p>
              <p className="t-body text-[#f0ede6]/65" style={{ fontSize: "1.05rem" }}>
                They&rsquo;re both still on the tools. When you book, you get them. Not a subcontractor. Not a random crew. The two people whose name is on the van, who have a reason to care about the finish.
              </p>
            </div>

            <div ref={p2} className="flex flex-col gap-6 max-w-[580px]">
              <p className="t-body text-[#f0ede6]/65" style={{ fontSize: "1.05rem" }}>
                In two years, they&rsquo;ve worked on over 500 properties across Winnipeg. Every Google review is five stars. That&rsquo;s not a stat they bought — it&rsquo;s what happens when you show up on time, do the work properly, and leave the place better than you found it.
              </p>
            </div>

            {/* Inline second image — offset, editorial */}
            <div ref={img2} className="overflow-hidden">
              <ParallaxImage
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=85&auto=format&fit=crop"
                alt="Perfectly maintained Winnipeg property lawn"
                speed={0.1}
                style={{ aspectRatio: "16/9" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Full-width pull quote ── */}
      <div className="mt-24 md:mt-32 border-t border-b border-[#f0ede6]/8 py-16 md:py-24 lg:py-28 px-6 md:px-10 lg:px-16">
        <div className="max-w-[1500px] mx-auto">
          <div ref={pullRef}>
            <p
              className="t-display-italic text-[#c8d5b0]"
              style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", maxWidth: "18ch" }}
            >
              &ldquo;We show up. We do it right. We&rsquo;re done before noon.&rdquo;
            </p>
            <p className="t-label text-[#f0ede6]/30 mt-8">— Idan, co-founder</p>
          </div>
        </div>
      </div>
    </section>
  );
}
