"use client";
import { useEffect, useRef } from "react";

function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.transition = `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

interface ServiceData {
  index: string;
  title: string;
  description: string;
  detail: string[];
  img: string;
  imgAlt: string;
  isEven: boolean;
}

function ServiceRow({ s }: { s: ServiceData }) {
  const imgRef  = useReveal(0);
  const textRef = useReveal(80);

  return (
    <div className="border-t border-[#f0ede6]/8">
      <div className="max-w-[1500px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image */}
          <div
            ref={imgRef}
            className={`relative overflow-hidden ${s.isEven ? "lg:order-1" : "lg:order-2"}`}
            style={{ aspectRatio: "4/3", minHeight: "300px" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.img}
              alt={s.imgAlt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>

          {/* Text */}
          <div
            ref={textRef}
            className={`flex flex-col justify-between py-12 lg:py-20 ${s.isEven ? "lg:order-2 lg:pl-16 xl:pl-24" : "lg:order-1 lg:pr-16 xl:pr-24"}`}
          >
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="t-label text-[#f0ede6]/18" style={{ fontSize: "0.62rem" }}>{s.index}</span>
                <span className="flex-1 h-px bg-[#f0ede6]/8 max-w-[40px]" />
              </div>
              <h3
                className="t-display text-[#f0ede6] mb-6 whitespace-pre-line"
                style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)" }}
              >
                {s.title}
              </h3>
              <p className="t-body text-[#f0ede6]/50" style={{ fontSize: "0.95rem", maxWidth: "40ch", lineHeight: 1.8 }}>
                {s.description}
              </p>
            </div>
            <div className="mt-10 md:mt-14">
              <ul className="flex flex-col gap-3.5 border-t border-[#f0ede6]/8 pt-8">
                {s.detail.map(d => (
                  <li key={d} className="flex items-center gap-4">
                    <span className="w-1 h-1 rounded-full bg-[#c8d5b0]/40 flex-shrink-0" />
                    <span className="t-label text-[#f0ede6]/38" style={{ fontSize: "0.65rem", letterSpacing: "0.14em" }}>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const sections = [
  {
    index: "01",
    title: "Window\nCleaning",
    description: "Hard water stains, winter grime, oxidation — we strip it all. Inside, outside, tracks and screens. Every residential window left spotless.",
    detail: ["Residential windows", "Storm windows", "Screens & tracks", "Hard water removal"],
    img: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1000&q=88&auto=format&fit=crop",
    imgAlt: "Spotless residential window after professional cleaning",
  },
  {
    index: "02",
    title: "Exterior\nGlass",
    description: "Commercial-grade cleaning for exterior glass panels, patio doors, and high windows. Equipment purpose-built for the job.",
    detail: ["Exterior panels", "Patio doors", "High-reach glass", "Post-construction clean"],
    img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1000&q=88&auto=format&fit=crop",
    imgAlt: "Exterior glass cleaning on Winnipeg property",
  },
  {
    index: "03",
    title: "Lawn\nCare",
    description: "Weekly mowing and edging — done with the same standard every single time. Clean lines, even cuts, edges that actually hold their shape.",
    detail: ["Mowing", "Edging", "Clipping removal", "Weekly or bi-weekly"],
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1000&q=88&auto=format&fit=crop",
    imgAlt: "Perfectly mowed and edged Winnipeg lawn",
  },
  {
    index: "04",
    title: "Treatments\n& Programs",
    description: "Fertilizer applications, weed control, and aeration programs calibrated for Manitoba soil. The kind of lawn that doesn\u2019t happen by accident.",
    detail: ["Fertilizer", "Weed control", "Core aeration", "Spring cleanup"],
    img: "https://images.unsplash.com/photo-1558618047-3c8a8f3b01e2?w=1000&q=88&auto=format&fit=crop",
    imgAlt: "Healthy thick lawn after fertilizer treatment in Winnipeg",
  },
];

export default function Services() {
  const chapterRef = useReveal(0);

  return (
    <section id="services" className="bg-[#0c0c0a] pt-24 md:pt-32">
      <div className="max-w-[1500px] mx-auto px-6 md:px-10 lg:px-16 mb-14 md:mb-20">
        <div ref={chapterRef} className="flex items-center gap-6">
          <span className="t-label text-[#c8d5b0]/60">03 — Services</span>
          <span className="flex-1 h-px bg-[#f0ede6]/8 max-w-[80px]" />
        </div>
      </div>

      <div className="flex flex-col">
        {sections.map((s, i) => (
          <ServiceRow key={s.index} s={{ ...s, isEven: i % 2 === 0 }} />
        ))}
      </div>
    </section>
  );
}
