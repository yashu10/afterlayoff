"use client";

import { useEffect, useRef, type ReactNode } from "react";

const WORDS = ["next.", "smarter.", "faster.", "bigger."];

/** Typewriter (text swap only, so it runs even with "reduce motion"). Server HTML contains the full word "next." so crawlers read "We build what's next." */
export function Typewriter() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let w = 0, c = 0, del = false, t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = WORDS[w];
      if (ref.current) ref.current.textContent = word.slice(0, c);
      if (!del && c === word.length) { del = true; t = setTimeout(tick, 1600); return; }
      if (del && c === 0) { del = false; w = (w + 1) % WORDS.length; }
      c += del ? -1 : 1;
      t = setTimeout(tick, del ? 50 : 100);
    };
    t = setTimeout(tick, 1800);
    return () => clearTimeout(t);
  }, []);
  // The slot has a fixed width (widest word), so the heading never re-wraps and the logo beside it never moves.
  return (
    <span className="type-slot">
      <span className="type" ref={ref}>next.</span>
    </span>
  );
}

/** Rising-lines canvas background (the "arrow up" motif). */
export function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!, ctx = cv.getContext("2d")!;
    let W = 0, H = 0, raf = 0;
    let lines: { x: number; y: number; len: number; v: number }[] = [];
    const size = () => {
      W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight;
      lines = Array.from({ length: Math.round(W / 55) }, () => ({ x: Math.random() * W, y: Math.random() * H, len: 40 + Math.random() * 90, v: 0.4 + Math.random() * 1.1 }));
    };
    size();
    window.addEventListener("resize", size);
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const l of lines) {
        const g = ctx.createLinearGradient(l.x, l.y, l.x + l.len * 0.4, l.y - l.len);
        g.addColorStop(0, "rgba(10,92,255,0)"); g.addColorStop(1, "rgba(10,92,255,.5)");
        ctx.strokeStyle = g; ctx.lineWidth = 2; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(l.x, l.y); ctx.lineTo(l.x + l.len * 0.4, l.y - l.len); ctx.stroke();
        l.x += l.v * 0.4; l.y -= l.v;
        if (l.y + l.len < 0 || l.x > W) { l.y = H + 20; l.x = Math.random() * W; }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", size); };
  }, []);
  return <canvas id="bg" ref={ref} aria-hidden="true" />;
}

/** 3D tilt wrapper for the hero logo. */
export function Tilt({ children }: { children: ReactNode }) {
  const art = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  return (
    <div
      className="hero-art"
      ref={art}
      onMouseMove={(e) => {
        const r = art.current!.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        if (card.current) card.current.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`;
      }}
      onMouseLeave={() => { if (card.current) card.current.style.transform = ""; }}
    >
      <div className="logo-card" ref={card}>{children}</div>
      <span className="chip c1">⚡ Web Apps</span>
      <span className="chip c2">☁️ Cloud</span>
      <span className="chip c3">🤖 AI</span>
      <span className="chip c4">📱 Mobile</span>
    </div>
  );
}
