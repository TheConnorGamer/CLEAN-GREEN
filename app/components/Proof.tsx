"use client";
import { useEffect, useRef, useState } from "react";

const reviews = [
  {
    name: "Sarah M.",
    suburb: "St. Vital",
    date: "Oct 2024",
    service: "Window Cleaning",
    text: "Idan showed up exactly when he said he would. My windows haven\u2019t looked this good since we moved in. He even did the tracks without being asked. Booked them for every season.",
  },
  {
    name: "Derek T.",
    suburb: "River Heights",
    date: "Aug 2024",
    service: "Lawn Care",
    text: "The edging was so clean my neighbour knocked on my door to ask who did it. Been using them bi-weekly since June. Not once late, not once a bad job.",
  },
  {
    name: "Jennifer K.",
    suburb: "Transcona",
    date: "Jul 2024",
    service: "Spring Cleanup",
    text: "Three years of built-up junk gone in one morning. Tristin sent a before-and-after photo when they finished. I didn\u2019t ask for that \u2014 he just did it.",
  },
  {
    name: "Marcus R.",
    suburb: "Charleswood",
    date: "Sep 2024",
    service: "Lawn & Fertilizer",
    text: "I\u2019ve tried three other services in the city. Clean & Green is the only one I\u2019ve called back. Fast, thorough, and they actually care about what they leave behind.",
  },
  {
    name: "Lisa W.",
    suburb: "Tuxedo",
    date: "Jun 2024",
    service: "Window Cleaning",
    text: "Texted in the morning, they were here by the afternoon. No streaks, no missed corners. Four of my neighbours have already booked them based on my recommendation.",
  },
];

function Stars({ size = 13 }: { size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="#c8d5b0">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

function useRevealRef() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0"; el.style.transform = "translateY(32px)";
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.transition = "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)";
        el.style.opacity = "1"; el.style.transform = "translateY(0)";
        obs.disconnect();
      }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── Premium contact card ── */
function ContactCard({
  href, external, label, title, sub, icon,
}: {
  href: string; external?: boolean; label: string;
  title: string; sub?: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="contact-card group relative flex items-center justify-between gap-6 px-7 py-6 border border-[#f0ede6]/10 overflow-hidden"
    >
      {/* Glow layer */}
      <div className="contact-card-glow" />

      <div className="relative z-10 flex items-center gap-5">
        {/* Icon circle */}
        <div className="w-11 h-11 rounded-full border border-[#f0ede6]/12 flex items-center justify-center flex-shrink-0 group-hover:border-[#c8d5b0]/30 transition-colors duration-300">
          {icon}
        </div>
        <div>
          <p className="t-label text-[#f0ede6]/30 mb-1" style={{ fontSize: "0.6rem" }}>{label}</p>
          <p className="t-body text-[#f0ede6]/80 group-hover:text-[#f0ede6] transition-colors duration-200" style={{ fontSize: "1rem", fontWeight: 400 }}>{title}</p>
          {sub && <p className="t-label text-[#f0ede6]/25 mt-0.5" style={{ fontSize: "0.6rem" }}>{sub}</p>}
        </div>
      </div>

      {/* Arrow */}
      <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full border border-[#f0ede6]/10 flex items-center justify-center group-hover:border-[#c8d5b0]/40 group-hover:bg-[#c8d5b0]/8 transition-all duration-300">
        <svg
          className="opacity-30 group-hover:opacity-70 group-hover:translate-x-0.5 transition-all duration-300"
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f0ede6" strokeWidth="1.5" strokeLinecap="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>
    </a>
  );
}

export default function Proof() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const chapterRef = useRevealRef();
  const contactRef = useRevealRef();
  const timerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (i: number) => {
    if (i === active) return;
    setFading(true);
    timerRef.current = setTimeout(() => {
      setActive(i);
      setFading(false);
    }, 280);
  };

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const r = reviews[active];

  return (
    <>
      <style>{`
        @keyframes quoteSlideIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .contact-card {
          transition: border-color 0.25s, background 0.25s, transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s;
        }
        .contact-card:hover {
          transform: translateY(-3px);
        }
        .contact-card:active { transform: translateY(0); }
        .contact-card-glow {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.35s;
          pointer-events: none;
          border-radius: inherit;
        }
        .contact-card:hover .contact-card-glow { opacity: 1; }
        .contact-card-primary {
          transition: filter 0.2s, transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s;
        }
        .contact-card-primary:hover {
          filter: brightness(1.06);
          transform: translateY(-3px);
          box-shadow: 0 8px 32px rgba(168,192,144,0.45);
        }
        .contact-card-primary:active { transform: translateY(0); }
      `}</style>

      {/* ── REVIEWS ── */}
      <section className="bg-[#0e110c] pt-24 md:pt-32 pb-24 md:pb-32">
        <div className="max-w-[1500px] mx-auto px-6 md:px-10 lg:px-16">

          <div ref={chapterRef} className="flex items-center gap-6 mb-16 md:mb-20">
            <span className="t-label text-[#c8d5b0]/60">04 — What people say</span>
            <span className="flex-1 h-px bg-[#f0ede6]/8 max-w-[80px]" />
            <div className="hidden sm:flex items-center gap-3">
              <Stars />
              <span className="t-label text-[#f0ede6]/22" style={{ fontSize: "0.62rem" }}>5.0 &middot; Google Reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-24">

            {/* Quote display */}
            <div className="lg:col-span-7 xl:col-span-8">
              <div
                style={{
                  opacity: fading ? 0 : 1,
                  transform: fading ? "translateY(12px)" : "translateY(0)",
                  transition: "opacity 0.28s cubic-bezier(0.4,0,1,1), transform 0.28s cubic-bezier(0.4,0,1,1)",
                }}
              >
                <Stars size={14} />

                <blockquote
                  className="t-display-italic text-[#f0ede6] mt-7 md:mt-9"
                  style={{ fontSize: "clamp(1.45rem, 3.2vw, 2.8rem)", lineHeight: 1.2, maxWidth: "28ch" }}
                >
                  &ldquo;{r.text}&rdquo;
                </blockquote>

                <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-4 md:gap-5">
                  {/* Avatar placeholder */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(200,213,176,0.12)", border: "1px solid rgba(200,213,176,0.2)" }}
                  >
                    <span className="t-label text-[#c8d5b0]/70" style={{ fontSize: "0.7rem" }}>
                      {r.name.split(" ").map(w => w[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="t-body text-[#f0ede6]" style={{ fontSize: "0.88rem", fontWeight: 400 }}>{r.name}</p>
                    <p className="t-label text-[#f0ede6]/28 mt-0.5" style={{ fontSize: "0.6rem" }}>
                      {r.suburb}, Winnipeg &nbsp;&middot;&nbsp; {r.date}
                    </p>
                  </div>
                  <span className="hidden sm:block w-px h-4 bg-[#f0ede6]/10" />
                  <span
                    className="t-label px-2.5 py-1 rounded-sm"
                    style={{ fontSize: "0.58rem", background: "rgba(200,213,176,0.1)", color: "rgba(200,213,176,0.7)", border: "1px solid rgba(200,213,176,0.15)" }}
                  >
                    {r.service}
                  </span>
                </div>
              </div>
            </div>

            {/* Reviewer selector */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col self-start">
              {reviews.map((rv, i) => (
                <button
                  key={i}
                  onMouseEnter={() => goTo(i)}
                  onClick={() => goTo(i)}
                  className="text-left py-4 border-t border-[#f0ede6]/8 group transition-all duration-200 last:border-b"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className="t-body transition-colors duration-200"
                      style={{
                        fontSize: "0.88rem",
                        color: i === active ? "rgba(240,237,230,1)" : "rgba(240,237,230,0.28)",
                      }}
                    >
                      {rv.name}
                    </span>
                    <span
                      className="t-label flex-shrink-0 transition-colors duration-200"
                      style={{
                        fontSize: "0.58rem",
                        color: i === active ? "rgba(200,213,176,0.6)" : "rgba(240,237,230,0.15)",
                      }}
                    >
                      {rv.suburb}
                    </span>
                  </div>
                  {/* Active indicator bar */}
                  <div
                    className="mt-2.5 h-px bg-[#c8d5b0]/40"
                    style={{
                      width: i === active ? "100%" : "0%",
                      transition: "width 0.45s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  />
                </button>
              ))}

              <div className="mt-8 pt-6 border-t border-[#f0ede6]/6 flex items-center gap-3">
                <Stars size={11} />
                <span className="t-label text-[#f0ede6]/22" style={{ fontSize: "0.58rem" }}>Verified Google Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="bg-[#0c0c0a] border-t border-[#f0ede6]/6 pt-24 md:pt-32 pb-24 md:pb-32">
        <div className="max-w-[1500px] mx-auto px-6 md:px-10 lg:px-16">
          <div ref={contactRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

            {/* Left — headline */}
            <div>
              <div className="flex items-center gap-6 mb-10">
                <span className="t-label text-[#c8d5b0]/60">05 — Get in touch</span>
                <span className="w-10 h-px bg-[#f0ede6]/8" />
              </div>

              <h2
                className="t-display text-[#f0ede6] mb-6"
                style={{ fontSize: "clamp(2.6rem, 5vw, 4.8rem)", lineHeight: 0.94 }}
              >
                Ready to transform
                <br />
                <span className="t-display-italic text-[#c8d5b0]">your property?</span>
              </h2>

              <p className="t-body text-[#f0ede6]/42 mb-10" style={{ fontSize: "0.95rem", maxWidth: "36ch", lineHeight: 1.8 }}>
                Speak directly with Idan or Tristin. No call centres. No sales team. Just honest advice and a free quote.
              </p>

              {/* Trust items */}
              <ul className="flex flex-col gap-4">
                {[
                  { dot: true, text: "Usually replies within an hour" },
                  { dot: true, text: "Direct line to Idan or Tristin" },
                  { dot: true, text: "Serving Winnipeg & surrounding areas" },
                  { dot: true, text: "Free estimate — no obligation, no pressure" },
                ].map(t => (
                  <li key={t.text} className="flex items-center gap-3">
                    <span className="w-1 h-1 rounded-full bg-[#c8d5b0]/50 flex-shrink-0" />
                    <span className="t-body text-[#f0ede6]/40" style={{ fontSize: "0.88rem" }}>{t.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — premium contact cards */}
            <div className="flex flex-col gap-3">

              {/* Primary: Call */}
              <a
                href="tel:2048993566"
                className="contact-card-primary group relative flex items-center justify-between gap-6 px-7 py-6 overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #c8d5b0 0%, #a8c890 100%)",
                  boxShadow: "0 4px 24px rgba(168,200,144,0.3)",
                }}
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#0c0c0a]/15 flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a2e1a" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a2 2 0 012-2.18h3a2 2 0 011.72 1.36 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="t-label text-[#1a2e1a]/60" style={{ fontSize: "0.62rem", marginBottom: "4px", letterSpacing: "0.12em" }}>Call directly</p>
                    <p className="t-display text-[#0c1a0c]" style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)", lineHeight: 1 }}>204-899-3566</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#0c0c0a]/15 flex items-center justify-center group-hover:bg-[#0c0c0a]/25 transition-colors duration-200">
                  <svg className="group-hover:translate-x-0.5 transition-transform duration-200" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a2e1a" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </a>

              {/* Secondary: Text */}
              <a
                href="sms:2048993566"
                className="contact-card group relative flex items-center justify-between gap-6 px-7 py-5 overflow-hidden"
                style={{
                  background: "rgba(100,160,200,0.08)",
                  border: "1px solid rgba(100,160,200,0.2)",
                  boxShadow: "0 2px 12px rgba(100,160,200,0.08)",
                }}
              >
                <div className="contact-card-glow" style={{ background: "radial-gradient(circle at 20% 50%, rgba(100,180,220,0.12) 0%, transparent 65%)" }} />
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(100,160,200,0.15)", border: "1px solid rgba(100,180,220,0.25)" }}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(140,200,240,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="t-label" style={{ fontSize: "0.6rem", color: "rgba(140,200,240,0.6)", letterSpacing: "0.12em", marginBottom: "3px" }}>Send a text</p>
                    <p className="t-body" style={{ fontSize: "1.05rem", color: "rgba(240,237,230,0.88)" }}>Message us on your phone</p>
                    <p className="t-label" style={{ fontSize: "0.58rem", color: "rgba(240,237,230,0.32)", marginTop: "2px" }}>We reply fast. Usually same day.</p>
                  </div>
                </div>
                <div className="relative z-10 w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300" style={{ border: "1px solid rgba(100,180,220,0.2)" }}>
                  <svg className="group-hover:translate-x-0.5 transition-transform duration-300" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(140,200,240,0.6)" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </a>

              {/* Tertiary: Instagram */}
              <a
                href="https://www.instagram.com/cleanandgreenservices"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card group relative flex items-center justify-between gap-6 px-7 py-5 overflow-hidden"
                style={{
                  background: "rgba(180,100,200,0.06)",
                  border: "1px solid rgba(200,120,220,0.18)",
                  boxShadow: "0 2px 12px rgba(180,100,200,0.07)",
                }}
              >
                <div className="contact-card-glow" style={{ background: "radial-gradient(circle at 20% 50%, rgba(220,130,255,0.1) 0%, transparent 65%)" }} />
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(200,120,220,0.12)", border: "1px solid rgba(220,130,255,0.2)" }}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(220,160,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  </div>
                  <div>
                    <p className="t-label" style={{ fontSize: "0.6rem", color: "rgba(220,160,255,0.55)", letterSpacing: "0.12em", marginBottom: "3px" }}>Follow our work</p>
                    <p className="t-body" style={{ fontSize: "1.05rem", color: "rgba(240,237,230,0.88)" }}>@cleanandgreenservices</p>
                    <p className="t-label" style={{ fontSize: "0.58rem", color: "rgba(240,237,230,0.32)", marginTop: "2px" }}>Photos of real jobs, real results.</p>
                  </div>
                </div>
                <div className="relative z-10 w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300" style={{ border: "1px solid rgba(220,130,255,0.18)" }}>
                  <svg className="group-hover:translate-x-0.5 transition-transform duration-300" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(220,160,255,0.6)" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </a>

              <p className="t-label text-[#f0ede6]/15 text-center pt-3" style={{ fontSize: "0.58rem" }}>
                Winnipeg &middot; St.&nbsp;Vital &middot; River Heights &middot; Transcona &middot; Tuxedo &middot; Charleswood
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
