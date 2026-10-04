"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { nav, profile } from "@/lib/data";

const links = [
  { href: "#work", label: nav.work },
  { href: "#about", label: nav.about },
  { href: "#path", label: nav.path },
  { href: "#contact", label: nav.contact },
];

export default function Navbar() {
  const { locale, setLocale } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-zinc-200 bg-white/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8" aria-label="Main">
        <a href="#top" className="font-serif-d flex items-center gap-2 text-lg font-semibold tracking-tight text-zinc-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 font-sans text-sm font-bold text-white">
            {profile.initials}
          </span>
          <span className="hidden sm:block">{profile.shortName}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-zinc-600 transition-colors duration-150 hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
              >
                {l.label[locale]}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="flex rounded-full border border-zinc-200 bg-white p-0.5 text-xs font-semibold" role="group" aria-label="Language / Bahasa">
            {(["en", "id"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLocale(l)}
                aria-pressed={locale === l}
                className={`cursor-pointer rounded-full px-2.5 py-1 uppercase transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 ${
                  locale === l ? "bg-zinc-900 text-white" : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <a
            href={profile.cv}
            download
            className="hidden cursor-pointer items-center rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 md:inline-flex"
          >
            CV ↓
          </a>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="cursor-pointer rounded-full p-2 text-zinc-700 transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 md:hidden"
          >
            {open ? (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
            )}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-zinc-200 bg-white/95 backdrop-blur-md md:hidden">
          <ul className="space-y-1 px-5 py-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-serif-d block rounded-xl px-3 py-3 text-lg font-semibold text-zinc-900 transition-colors hover:bg-zinc-100"
                >
                  {l.label[locale]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
