"use client";

import { useEffect } from "react";

/**
 * Light copy protection: blocks selecting, copying, cutting, dragging, right-click and the usual
 * copy / select-all / save / view-source shortcuts everywhere EXCEPT inside form fields (so the
 * contact form still works). This only stops casual copying — it cannot stop screenshots, devtools
 * or someone with JavaScript turned off. Search engines and AI crawlers are not affected.
 */
export default function Protect() {
  useEffect(() => {
    const inField = (t: EventTarget | null) => t instanceof Element && !!t.closest("input, textarea, select, [contenteditable='true']");
    const block = (e: Event) => { if (!inField(e.target)) e.preventDefault(); };

    const onKey = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      if (!mod || inField(e.target)) return;
      const k = e.key.toLowerCase();
      if (["c", "x", "a", "s", "u"].includes(k)) e.preventDefault(); // copy, cut, select all, save, view source
    };

    const events = ["contextmenu", "copy", "cut", "selectstart", "dragstart"] as const;
    events.forEach((ev) => document.addEventListener(ev, block));
    document.addEventListener("keydown", onKey);
    return () => {
      events.forEach((ev) => document.removeEventListener(ev, block));
      document.removeEventListener("keydown", onKey);
    };
  }, []);
  return null;
}
