"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Scroll-reveal that is safe for SEO / no-JS / AI crawlers: content is visible by default in the HTML.
 * Only after hydration are below-the-fold `.reveal` elements hidden, then faded in as they enter the viewport.
 */
export default function RevealInit() {
  const pathname = usePathname();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.in)"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.classList.add("in");
          el.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
          io.unobserve(el);
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top > window.innerHeight * 0.95) el.classList.add("rv"); // only hide what is below the fold
      else {
        el.classList.add("in");
        el.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
      }
      io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);
  return null;
}

function countUp(n: HTMLElement) {
  const to = Number(n.dataset.count), suf = n.dataset.suffix || "", t0 = performance.now();
  const step = (t: number) => {
    const p = Math.min((t - t0) / 1400, 1);
    n.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suf;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
