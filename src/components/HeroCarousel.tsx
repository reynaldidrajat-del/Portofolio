"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useT } from "@/lib/i18n";
import { ui } from "@/lib/data";

const SLIDE_MS = 5000;
const STRIP_COUNT = 3; // thumbnails per side

/**
 * Cinematic hero carousel with film-reel flanks:
 * - one large stage, spring slide+fade between images, Ken Burns zoom
 * - vertical thumbnail strips on BOTH sides (previous / next frames),
 *   like a film roll — click any frame to bring it to the stage
 * - story-style progress bars on mobile (where strips are hidden)
 * - autoplay freezes on hover/focus; disabled under reduced motion
 */
export default function HeroCarousel({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const t = useT();
  const reduce = useReducedMotion();

  const [[index, direction], setState] = useState<[number, number]>([0, 1]);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const indexRef = useRef(0);
  const pausedRef = useRef(false);
  pausedRef.current = paused || !!reduce;

  const go = useCallback(
    (next: number, dir: number) => {
      const clamped = (next + images.length) % images.length;
      indexRef.current = clamped;
      setState([clamped, dir]);
      setProgress(0);
    },
    [images.length]
  );

  // One interval drives both autoplay and the progress bars, so pausing
  // freezes them in sync. Skipped entirely under reduced motion.
  useEffect(() => {
    if (reduce || images.length < 2) return;
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setProgress((p) => {
        const next = p + 0.05 / (SLIDE_MS / 1000);
        if (next >= 1) {
          const nxt = (indexRef.current + 1) % images.length;
          indexRef.current = nxt;
          setState([nxt, 1]);
          return 0;
        }
        return next;
      });
    }, 50);
    return () => clearInterval(id);
  }, [reduce, images.length]);

  if (!images.length) return null;

  const n = images.length;
  const leftFrames = Array.from({ length: STRIP_COUNT }, (_, i) => (index - 1 - i + n * 2) % n);
  const rightFrames = Array.from({ length: STRIP_COUNT }, (_, i) => (index + 1 + i) % n);
  // de-duplicate when the gallery has few images
  const dedupe = (arr: number[]) => [...new Set(arr)].filter((i) => i !== index);

  const variants = {
    enter: (dir: number) => ({
      x: dir >= 0 ? 90 : -90,
      opacity: 0,
      scale: 1.04,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({
      x: dir >= 0 ? -90 : 90,
      opacity: 0,
      scale: 0.98,
    }),
  };

  const stripButton = (i: number, side: "left" | "right") => (
    <button
      key={`${side}-${i}`}
      type="button"
      onClick={() => go(i, side === "left" ? -1 : 1)}
      aria-label={`${t(ui.goto)} ${i + 1}`}
      className="group/strip relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 opacity-55 transition-all duration-300 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images[i]}
        alt=""
        aria-hidden="true"
        loading="lazy"
        draggable={false}
        className="h-full w-full object-cover transition-transform duration-500 group-hover/strip:scale-105 motion-reduce:transition-none"
      />
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-900/60 to-transparent py-1 text-center text-[10px] font-semibold text-white opacity-0 transition-opacity duration-200 group-hover/strip:opacity-100 ${
          side === "left" ? "" : ""
        }`}
      >
        {i + 1}
      </span>
    </button>
  );

  return (
    <div
      className="group/car relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="flex items-stretch gap-3">
        {/* Left film reel — previous frames */}
        {n > 1 && (
          <div
            className="hidden w-24 shrink-0 flex-col justify-center gap-2.5 md:flex lg:w-28"
            aria-hidden="true"
          >
            {dedupe(leftFrames).slice(0, STRIP_COUNT).map((i) => stripButton(i, "left"))}
          </div>
        )}

        {/* Main stage */}
        <div
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              go(index + 1, 1);
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              go(index - 1, -1);
            }
          }}
          className="relative min-w-0 flex-1 aspect-[16/9] overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 sm:aspect-[16/8]"
          role="region"
          aria-label={alt}
          aria-roledescription="carousel"
          tabIndex={0}
        >
          <motion.div
            key={index}
            custom={direction}
            initial={reduce ? false : { x: direction >= 0 ? 90 : -90, opacity: 0, scale: 1.04 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={
              reduce
                ? { duration: 0 }
                : { type: "spring", stiffness: 110, damping: 22 }
            }
            className="absolute inset-0"
          >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <motion.img
                src={images[index]}
                alt={`${alt} — ${index + 1}/${n}`}
                draggable={false}
                initial={reduce ? undefined : { scale: 1 }}
                animate={reduce ? undefined : { scale: 1.07 }}
                transition={{ duration: SLIDE_MS / 1000 + 0.6, ease: "linear" }}
                className="h-full w-full object-cover"
              />
              {/* soft vignette so white photos don't bleed into the page */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"
              />
            </motion.div>

          {/* Prev / Next on the stage */}
          {n > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(index - 1, -1)}
                aria-label={t(ui.prev)}
                className="absolute top-1/2 left-3 hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-zinc-900 opacity-0 shadow-lg ring-1 ring-zinc-200 backdrop-blur transition-opacity duration-200 hover:bg-white focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 group-hover/car:opacity-100 sm:flex"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
              </button>
              <button
                type="button"
                onClick={() => go(index + 1, 1)}
                aria-label={t(ui.next)}
                className="absolute top-1/2 right-3 hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-zinc-900 opacity-0 shadow-lg ring-1 ring-zinc-200 backdrop-blur transition-opacity duration-200 hover:bg-white focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 group-hover/car:opacity-100 sm:flex"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
              </button>
            </>
          )}
        </div>

        {/* Right film reel — next frames */}
        {n > 1 && (
          <div
            className="hidden w-24 shrink-0 flex-col justify-center gap-2.5 md:flex lg:w-28"
            aria-hidden="true"
          >
            {dedupe(rightFrames).slice(0, STRIP_COUNT).map((i) => stripButton(i, "right"))}
          </div>
        )}
      </div>

      {/* Story-style progress bars — primary nav on mobile (strips hidden), sync indicator on desktop */}
      {n > 1 && (
        <div
          className="mt-3 flex items-center justify-center gap-1.5"
          role="tablist"
          aria-label={t(ui.goto)}
        >
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`${t(ui.goto)} ${i + 1}`}
              onClick={() => go(i, i > index ? 1 : -1)}
              className="h-1.5 w-8 cursor-pointer overflow-hidden rounded-full bg-zinc-200 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 sm:w-10"
            >
              <span
                className="block h-full rounded-full"
                style={{
                  width:
                    i < index ? "100%" : i === index ? `${progress * 100}%` : "0%",
                  background: i === index ? "#2563EB" : "#a1a1aa",
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
