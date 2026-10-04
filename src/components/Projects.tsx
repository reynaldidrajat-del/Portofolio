"use client";

import { useLanguage, useT } from "@/lib/i18n";
import { projects, ui } from "@/lib/data";
import Reveal from "./Reveal";
import Slider from "./Slider";

export default function Projects() {
  const t = useT();
  const { locale } = useLanguage();

  return (
    <section id="work" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow">{t({ en: "Portfolio", id: "Portofolio" })}</p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif-d text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
              {t(ui.workLabel)}
              <span className="text-blue-600">.</span>
            </h2>
            <p className="hidden text-sm font-medium text-zinc-400 sm:block">{t(ui.workNote)}</p>
          </div>
          <p className="section-intro">{t(ui.workIntro)}</p>
        </Reveal>

        <div className="mt-14 space-y-16 sm:space-y-20">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={60}>
              <article className="grid items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
                {/* Text column — minimal */}
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <span className="text-xs font-semibold tracking-widest text-zinc-400 uppercase">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif-d mt-3 text-3xl leading-tight font-semibold tracking-tight text-zinc-900 sm:text-4xl">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-base font-medium text-zinc-500">{p.tagline[locale]}</p>
                  <p className="mt-3 text-base leading-relaxed text-zinc-600">{p.description[locale]}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <li key={tag} className="chip">{tag}</li>
                    ))}
                  </ul>
                </div>

                {/* Slider column */}
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <Slider
                    images={p.images}
                    alt={p.title}
                    accent={p.accent}
                    aspect="aspect-[16/10]"
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
