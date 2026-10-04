"use client";

import { useLanguage, useT } from "@/lib/i18n";
import { contact, profile } from "@/lib/data";
import Reveal from "./Reveal";

export default function Contact() {
  const t = useT();
  const year = new Date().getFullYear();

  const links = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { label: "GitHub", value: `github.com/${profile.githubUser}`, href: profile.github },
    { label: "LinkedIn", value: "in/reynaldidrajat", href: profile.linkedin },
  ];

  const headingWords = t(contact.heading).split(" ");
  const lastWord = headingWords.pop();

  return (
    <section id="contact" className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <p className="eyebrow justify-center">{t({ en: "Contact", id: "Kontak" })}</p>
          <h2 className="font-serif-d mx-auto max-w-3xl text-center text-4xl leading-[1.1] font-semibold tracking-tight text-zinc-900 sm:text-6xl">
            {headingWords.join(" ")}{" "}
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-rose-500 bg-clip-text text-transparent italic">
              {lastWord}
            </span>
          </h2>
          <p className="section-intro mx-auto text-center">{t(contact.intro)}</p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 flex justify-center">
            <a
              href={`mailto:${profile.email}`}
              className="btn-primary px-10 py-3.5 text-base"
            >
              {t(contact.cta)} ✉
            </a>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <ul className="mx-auto mt-14 grid max-w-3xl gap-3 sm:grid-cols-3">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group block rounded-2xl border border-zinc-200 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-900 hover:shadow-lg motion-reduce:hover:translate-y-0"
                >
                  <span className="text-xs font-semibold tracking-widest text-zinc-400 uppercase">
                    {l.label}
                  </span>
                  <span className="mt-1 block truncate text-sm font-semibold text-zinc-900 group-hover:text-blue-600">
                    {l.value}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <footer className="mt-20 flex flex-col items-center justify-between gap-3 border-t border-zinc-200 pt-8 text-sm text-zinc-400 sm:flex-row">
          <p>© {year} {profile.name}</p>
          <p>
            {t({ en: "Made with", id: "Dibuat dengan" })}{" "}
            <span className="font-medium text-zinc-600">Next.js</span> ·{" "}
            {t({ en: "set in Fraunces & Inter", id: "dengan huruf Fraunces & Inter" })}
          </p>
        </footer>
      </div>
    </section>
  );
}
