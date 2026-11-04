"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/data/site";

export default function Header() {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      setProgress((window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)) * 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <div className="progress" style={{ width: `${progress}%` }} />
      <header className={`nav${scrolled ? " scrolled" : ""}`} id="nav">
        <Link href="/" className="brand" aria-label="After Layoff home">
          <span className="mark" style={{ ["--s" as string]: 0.09 }} aria-hidden="true" />
          <span className="brand-text">
            After <b>Layoff</b>
          </span>
        </Link>
        <nav className={`links${open ? " open" : ""}`} id="links" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={isActive(n.href) ? "on" : undefined} aria-current={isActive(n.href) ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
          <Link href="/contact/" className="btn small">
            Contact us
          </Link>
        </nav>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <span />
          <span />
        </button>
      </header>
    </>
  );
}
