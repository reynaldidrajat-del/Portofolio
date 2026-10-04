"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useLanguage, useT } from "@/lib/i18n";
import { hero, marquee, profile } from "@/lib/data";
import HeroCarousel from "./HeroCarousel";
import Reveal from "./Reveal";

export default function Hero() {
  const t = useT();
  const { locale } = useLanguage();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax on the decorative blobs only — text stays crisp because
  // transform animations on text force GPU layers with rougher antialiasing.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section id="top" ref={sectionRef} className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
      {/* colorful blob background, parallaxed */}
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { y: blobY }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-400/15 blur-[110px]" />
        <div className="absolute top-10 -right-24 h-80 w-80 rounded-full bg-rose-400/15 blur-[110px]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-amber-300/20 blur-[100px]">
          <motion.div
            animate={reduce ? undefined : { scale: [1, 1.15, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="h-full w-full rounded-full bg-amber-300/30 blur-[60px]"
          />
        </div>
      </motion.div>

      <div
        className="mx-auto max-w-6xl px-5 sm:px-8"
      >
        <Reveal>
          <p className="chip mb-6">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />
            {t({ en: "Open to work", id: "Terbuka untuk peluang" })}
          </p>
        </Reveal>

        {/* Serif editorial name — elegant, not oversized */}
        <Reveal delay={80}>
          <h1 className="font-serif-d text-5xl leading-[1.05] font-semibold tracking-tight text-zinc-900 sm:text-7xl">
            Reynaldi{" "}
            <span className="font-normal text-zinc-400 italic">Drajat</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-lg font-semibold text-blue-600 sm:text-xl">
              {hero.roles[locale][0]}
            </span>
            <span className="text-zinc-300" aria-hidden="true">·</span>
            <span className="text-base text-zinc-500">{profile.location[locale]}</span>
          </div>
        </Reveal>

        <Reveal delay={220}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">{t(hero.tagline)}</p>
          <p className="section-intro">{t(hero.heroIntro)}</p>
        </Reveal>

        <Reveal delay={280}>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#work" className="btn-primary">
              {t(hero.cta)}
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </a>
            <a href={profile.cv} download className="btn-ghost">CV ↓</a>
          </div>
        </Reveal>

        {/* Hero carousel — big visual hook */}
        <Reveal delay={340} className="mt-14">
          <HeroCarousel
            images={hero.slides.map((s) => s.src)}
            alt={t({ en: "Selected system screenshots", id: "Pilihan tangkapan layar sistem" })}
          />
        </Reveal>
      </div>

      {/* Marquee */}
      <div className="mt-14 border-y border-zinc-200 bg-white py-3.5" aria-hidden="true">
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8">
            {[...marquee, ...marquee].map((word, i) => (
              <span key={i} className="flex items-center gap-8 text-xs font-semibold tracking-[0.18em] whitespace-nowrap text-zinc-400 uppercase">
                {word}
                <span className="h-1 w-1 shrink-0 rounded-full bg-blue-500" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
