"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n";
import { ui } from "@/lib/data";

/**
 * Horizontal image slider — scroll-snap based (native swipe on touch,
 * buttons + dots for desktop). Pauses autoplay on hover/focus and
 * disables autoplay entirely under prefers-reduced-motion.
 */
export default function Slider({
  images,
  alt,
  accent,
  rounded = "rounded-2xl",
  aspect = "aspect-[4/3]",
  autoplay = true,
}: {
  images: string[];
  alt: string;
  accent?: string;
  rounded?: string;
  aspect?: string;
  autoplay?: boolean;
}) {
  const t = useT();
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const animRef = useRef<number | null>(null);

  const scrollTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(i, images.length - 1));
    const child = track.children[clamped] as HTMLElement | undefined;
    if (!child) return;
    // snap-center alignment: child center -> container center
    const target = child.offsetLeft - (track.clientWidth - child.clientWidth) / 2;

    // Cancel any running animation
    if (animRef.current !== null) cancelAnimationFrame(animRef.current);

    // rAF-driven smooth scroll (more reliable across browsers than behavior:'smooth',
    // and respects reduced motion by jumping instantly)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      track.scrollLeft = target;
      return;
    }
    const start = track.scrollLeft;
    const dist = target - start;
    if (Math.abs(dist) < 1) return;
    const duration = 450;
    let startTime: number | null = null;
    const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3);
    const step = (ts: number) => {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      track.scrollLeft = start + dist * easeOutCubic(progress);
      if (progress < 1) {
        animRef.current = requestAnimationFrame(step);
      } else {
        animRef.current = null;
      }
    };
    animRef.current = requestAnimationFrame(step);
  }, [images.length]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animRef.current !== null) cancelAnimationFrame(animRef.current);
    };
  }, []);

  // Track current index while user scrolls/swipes
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const children = Array.from(track.children) as HTMLElement[];
      const center = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      children.forEach((c, i) => {
        const cCenter = c.offsetLeft + c.clientWidth / 2;
        const d = Math.abs(cCenter - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setIndex(best);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  // Autoplay (paused on hover/focus, off with reduced motion)
  useEffect(() => {
    if (!autoplay || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setIndex((cur) => {
        const nextIdx = (cur + 1) % images.length;
        scrollTo(nextIdx);
        return nextIdx;
      });
    }, 3500);
    return () => clearInterval(id);
  }, [autoplay, paused, images.length, scrollTo]);

  return (
    <div
      className="group/slider relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            scrollTo(index + 1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            scrollTo(index - 1);
          }
        }}
        className={`no-scrollbar flex ${aspect} snap-x snap-mandatory gap-3 overflow-x-auto ${rounded}`}
        role="region"
        aria-label={alt}
        tabIndex={0}
      >
        {images.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt={`${alt} — ${i + 1}/${images.length}`}
            loading="lazy"
            draggable={false}
            className="h-full w-[85%] shrink-0 snap-center border border-zinc-200 bg-zinc-100 object-cover sm:w-[calc(50%-6px)]"
          />
        ))}
      </div>

      {/* Prev / Next */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => scrollTo(index - 1)}
            disabled={index === 0}
            aria-label={t(ui.prev)}
            className="absolute top-1/2 left-3 hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow-lg ring-1 ring-zinc-200 backdrop-blur transition-all duration-200 hover:scale-105 hover:bg-white disabled:opacity-0 group-hover/slider:opacity-100 sm:flex motion-reduce:hover:scale-100"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <button
            type="button"
            onClick={() => scrollTo(index + 1)}
            disabled={index === images.length - 1}
            aria-label={t(ui.next)}
            className="absolute top-1/2 right-3 hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow-lg ring-1 ring-zinc-200 backdrop-blur transition-all duration-200 hover:scale-105 hover:bg-white disabled:opacity-0 group-hover/slider:opacity-100 sm:flex motion-reduce:hover:scale-100"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </>
      )}

      {/* Dots */}
      <div className="mt-3 flex items-center justify-center gap-1.5" role="tablist" aria-label={t(ui.goto)}>
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`${t(ui.goto)} ${i + 1}`}
            onClick={() => scrollTo(i)}
            className="h-2 cursor-pointer rounded-full transition-all duration-300"
            style={{
              width: i === index ? 22 : 8,
              background: i === index ? accent || "#09090b" : "#d4d4d8",
            }}
          />
        ))}
      </div>
    </div>
  );
}
