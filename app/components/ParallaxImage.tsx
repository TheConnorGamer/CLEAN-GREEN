"use client";
import { useEffect, useRef } from "react";

interface Props {
  src: string;
  alt: string;
  className?: string;
  speed?: number; // 0.1 = subtle, 0.3 = strong
  style?: React.CSSProperties;
}

export default function ParallaxImage({ src, alt, className = "", speed = 0.18, style }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef  = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const img  = imgRef.current;
    if (!wrap || !img) return;

    const onScroll = () => {
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) return;
      const progress = (vh - rect.top) / (vh + rect.height);
      const offset = (progress - 0.5) * speed * rect.height * 2;
      img.style.transform = `translateY(${offset}px) scale(1.12)`;
    };

    // Initial position
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className}`} style={style}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover will-change-transform"
        style={{ transform: "translateY(0) scale(1.12)" }}
      />
    </div>
  );
}
