"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Story",    href: "#story" },
  { label: "Work",     href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Contact",  href: "#contact" },
];

export default function Nav() {
  const [scrolled,  setScrolled]  = useState(false);
  const [visible,   setVisible]   = useState(true);
  const [open,      setOpen]      = useState(false);
  const lastY = useRef(0);

  // Scrolled state + hide-on-scroll-down / reveal-on-scroll-up
  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      if (y < 80) { setVisible(true); }
      else if (y > lastY.current + 6) { setVisible(false); }
      else if (y < lastY.current - 6) { setVisible(true); }
      lastY.current = y;
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "nav-glass bg-[#0c0c0a]/92 border-b border-[#f0ede6]/8" : ""
        }`}
        style={{
          height: scrolled ? "68px" : "82px",
          transform: visible ? "translateY(0)" : "translateY(-100%)",
          background: scrolled
            ? undefined
            : "linear-gradient(to bottom, rgba(12,12,10,0.75) 0%, rgba(12,12,10,0) 100%)",
        }}
      >
        <div className="h-full max-w-[1500px] mx-auto px-6 md:px-10 lg:px-16 flex items-center justify-between gap-8">

          {/* Logo */}
          <a
            href="#"
            className="flex-shrink-0"
            style={{ height: scrolled ? "44px" : "54px", transition: "height 0.4s cubic-bezier(0.16,1,0.3,1)" }}
          >
            <Image
              src="/logo.png"
              alt="Clean & Green Services"
              height={54}
              width={220}
              style={{
                height: "100%",
                width: "auto",
                objectFit: "contain",
                filter: "brightness(1.2) contrast(1.05) drop-shadow(0 1px 12px rgba(0,0,0,0.6))",
              }}
              priority
            />
          </a>

          {/* Desktop nav — centred */}
          <nav className="hidden md:flex items-center gap-9 flex-1 justify-center">
            {navLinks.map(n => (
              <a
                key={n.label}
                href={n.href}
                className="t-label text-[#f0ede6]/60 hover:text-[#f0ede6] transition-colors duration-300 relative group py-1"
              >
                {n.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#c8d5b0] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Right — CTA + phone */}
          <div className="hidden md:flex items-center gap-5 flex-shrink-0">
            <a
              href="tel:2048993566"
              className="t-label text-[#f0ede6]/50 hover:text-[#f0ede6]/90 transition-colors duration-300"
              style={{ fontSize: "0.68rem" }}
            >
              204·899·3566
            </a>
            <a
              href="#contact"
              className="t-label text-[#0c0c0a] font-medium px-6 py-3 transition-all duration-200 hover:scale-[1.03] active:scale-100"
              style={{
                fontSize: "0.68rem",
                letterSpacing: "0.12em",
                background: "linear-gradient(135deg, #c8d5b0 0%, #a8c090 100%)",
                boxShadow: "0 2px 16px rgba(168,192,144,0.35), 0 1px 3px rgba(0,0,0,0.3)",
              }}
            >
              Get Free Estimate
            </a>
          </div>

          {/* Hamburger — mobile */}
          <button
            onClick={() => setOpen(v => !v)}
            className="md:hidden ml-auto w-8 h-8 flex flex-col justify-center gap-[6px] items-end flex-shrink-0"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className={`block h-px bg-[#f0ede6] transition-all duration-300 origin-center ${open ? "w-6 rotate-45 translate-y-[7px]" : "w-6"}`} />
            <span className={`block h-px bg-[#f0ede6] transition-all duration-300 ${open ? "opacity-0 w-0" : "w-4 opacity-100"}`} />
            <span className={`block h-px bg-[#f0ede6] transition-all duration-300 origin-center ${open ? "w-6 -rotate-45 -translate-y-[7px]" : "w-6"}`} />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-[#0a0a08] flex flex-col justify-between px-6 pt-20 pb-10 transition-all duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Logo in overlay */}
        <div className="mb-10">
          <Image src="/logo.png" alt="Clean & Green Services" width={140} height={40} style={{ height: "38px", width: "auto" }} />
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {navLinks.map((n, i) => (
            <a
              key={n.label}
              href={n.href}
              onClick={() => setOpen(false)}
              className="t-display text-[#f0ede6]/75 hover:text-[#f0ede6] py-5 border-b border-[#f0ede6]/6 transition-all duration-300 flex items-center justify-between group"
              style={{
                fontSize: "clamp(2rem, 8vw, 3.8rem)",
                transitionDelay: open ? `${i * 55}ms` : "0ms",
                transform: open ? "translateX(0)" : "translateX(-20px)",
                opacity: open ? 1 : 0,
              }}
            >
              {n.label}
              <svg className="opacity-0 group-hover:opacity-40 transition-opacity w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          ))}
        </nav>

        <div className="pt-8 border-t border-[#f0ede6]/8 flex flex-col gap-5">
          <a
            href="tel:2048993566"
            className="t-display text-[#f0ede6] hover:text-[#c8d5b0] transition-colors"
            style={{ fontSize: "clamp(1.4rem, 5vw, 2.2rem)" }}
          >
            204-899-3566
          </a>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="t-label text-[#0c0c0a] bg-[#c8d5b0] px-6 py-4 self-start hover:bg-[#deeace] transition-colors duration-200"
            style={{ fontSize: "0.65rem", letterSpacing: "0.14em" }}
          >
            Get Free Estimate
          </a>
          <p className="t-label text-[#f0ede6]/20" style={{ fontSize: "0.6rem" }}>
            Serving Winnipeg &amp; surrounding areas
          </p>
        </div>
      </div>
    </>
  );
}
