"use client";

import { useLanguage, useT } from "@/lib/i18n";
import { certificationsShort, education, experiences, ui } from "@/lib/data";
import Reveal from "./Reveal";

export default function Experience() {
  const t = useT();
  const { locale } = useLanguage();

  return (
    <section id="path" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow">{t({ en: "Experience", id: "Pengalaman" })}</p>
          <h2 className="font-serif-d text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            {t(ui.pathLabel)}
            <span className="text-blue-600">.</span>
          </h2>
          <p className="section-intro">{t(ui.pathIntro)}</p>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_320px]">
          <ol className="space-y-0">
            {experiences.map((e, i) => (
              <Reveal as="li" key={`${e.company}-${e.period}`} delay={i * 60}>
                <div className="group flex items-baseline justify-between gap-4 border-b border-zinc-200 py-5 transition-colors duration-200 hover:border-zinc-900">
                  <div className="flex items-baseline gap-4">
                    <span className="text-xs font-semibold text-zinc-300 transition-colors group-hover:text-blue-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-serif-d text-xl font-semibold text-zinc-900 sm:text-2xl">
                        {e.company}
                      </h3>
                      <p className="mt-0.5 text-sm text-zinc-500">{e.role[locale]}</p>
                    </div>
                  </div>
                  <span className="shrink-0 text-sm font-medium text-zinc-400">
                    {e.period}
                    {e.current && (
                      <span className="ml-2 inline-block h-2 w-2 animate-pulse rounded-full bg-green-500 motion-reduce:animate-none" aria-label="current" />
                    )}
                  </span>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={150}>
            <aside className="rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-700 p-7 text-white">
              <p className="text-xs font-semibold tracking-[0.18em] text-zinc-400 uppercase">
                {t(ui.educationLabel)}
              </p>
              <h3 className="font-serif-d mt-3 text-xl leading-snug font-semibold">
                {education.school}
              </h3>
              <p className="mt-1 text-sm font-medium text-blue-300">
                {education.degree[locale]} · {education.period}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                {education.detail[locale]}
              </p>
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-xs font-semibold tracking-[0.18em] text-zinc-400 uppercase">
                  {t(ui.certsLabel)}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {certificationsShort.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-sm text-zinc-300">
                      <span className="h-1 w-1 rounded-full bg-blue-400" aria-hidden="true" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
