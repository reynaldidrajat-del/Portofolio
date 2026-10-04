"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useT } from "@/lib/i18n";
import { ui } from "@/lib/data";

const SLIDE_MS = 5000;

/**
 * Cinematic hero carousel (framer-motion):
 * - one large slide at a time, spring slide+fade between images
 * - Ken Burns slow zoom on the active image (feels alive, not stiff)
 * - story-style progress bars (double as clickable navigation)
 * - autoplay freezes on hover/focus; fully disabled under reduced motion
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
  // (setInterval over rAF: keeps running reliably across browsers/webviews,
  // and 60fps smoothness isn't needed for a 5s progress fill — CSS handles it.)
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

  return (
    <div
      className="group/car relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
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
        className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 sm:aspect-[16/8]"
        role="region"
        aria-label={alt}
        aria-roledescription="carousel"
        tabIndex={0}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial={reduce ? false : "enter"}
            animate="center"
            exit="exit"
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
              alt={`${alt} — ${index + 1}/${images.length}`}
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
        </AnimatePresence>

        {/* Prev / Next */}
        {images.length > 1 && (
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

      {/* Story-style progress bars, also clickable */}
      {images.length > 1 && (
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
              className="h-1.5 flex-1 max-w-14 cursor-pointer overflow-hidden rounded-full bg-zinc-200 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
            >
              <span
                className="block h-full rounded-full bg-zinc-900"
                style={{
                  width:
                    i < index ? "100%" : i === index ? `${progress * 100}%` : "0%",
                  background: i === index ? "#2563EB" : undefined,
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
