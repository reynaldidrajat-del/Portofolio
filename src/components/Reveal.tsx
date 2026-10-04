import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scroll-reveal wrapper following subtle motion guidelines:
 * opacity 0 -> 1, y 12 -> 0, 350ms, ease-out.
 * Respects prefers-reduced-motion (renders final state immediately,
 * content is visible-by-default for SEO/no-JS until JS activates).
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "span";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`${className} transition-all duration-[350ms] ease-out motion-reduce:transition-none ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-3 motion-reduce:opacity-100 motion-reduce:translate-y-0"
      }`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
