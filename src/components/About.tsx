"use client";

import { useLanguage, useT } from "@/lib/i18n";
import { about, profile, ui } from "@/lib/data";
import { useState } from "react";
import Reveal from "./Reveal";

export default function About() {
  const t = useT();
  const { locale } = useLanguage();
  // break-ui edge case: if the avatar URL ever fails to load, fall back to
  // initials instead of a broken-image icon
  const [avatarFailed, setAvatarFailed] = useState(false);

  return (
    <section id="about" className="border-y border-zinc-200 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow">{t(about.heading)}</p>
          <h2 className="font-serif-d max-w-2xl text-4xl leading-[1.1] font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            {t(about.title)}
          </h2>
          <p className="section-intro">{t(ui.aboutIntro)}</p>
        </Reveal>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
          <Reveal>
            <div className="relative mx-auto max-w-[260px]">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rotate-3 rounded-3xl bg-gradient-to-br from-blue-500 via-violet-500 to-rose-400 opacity-80 blur-[2px] motion-reduce:rotate-0"
              />
              {avatarFailed ? (
                <div
                  role="img"
                  aria-label={profile.name}
                  className="font-serif-d relative flex aspect-square w-full items-center justify-center rounded-3xl border-4 border-white bg-zinc-900 text-6xl font-semibold text-white shadow-xl"
                >
                  {profile.initials}
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  width={260}
                  height={260}
                  onError={() => setAvatarFailed(true)}
                  className="relative w-full rounded-3xl border-4 border-white object-cover shadow-xl"
                />
              )}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="space-y-4 text-base leading-relaxed text-zinc-600 sm:text-lg">
              {t(about.lines).map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            <ul className="mt-7 flex flex-wrap gap-2">
              {about.chips.map((c) => (
                <li key={c} className="chip">{c}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
