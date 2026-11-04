"use client";

import { useState, type FormEvent } from "react";
import { SITE } from "@/data/site";

type Status = { text: string; tone: "ok" | "warn" | "" };

/**
 * Sends enquiries to contact@afterlayoff.in.
 * - With NEXT_PUBLIC_WEB3FORMS_KEY set: Web3Forms (fast, no activation).
 * - Otherwise FormSubmit (needs a one-time activation click from the inbox).
 * - If both fail/time out, the visitor's email app opens with the message pre-filled.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ text: "", tone: "" });
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    if (f.get("_honey")) return; // spam trap
    setBusy(true);
    setStatus({ text: "Sending…", tone: "" });
    const subject = `New enquiry from ${f.get("name")} — After Layoff website`;
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 15000);
    try {
      const key = SITE.web3formsKey;
      const res = await fetch(key ? "https://api.web3forms.com/submit" : `https://formsubmit.co/ajax/${SITE.email}`, {
        method: "POST",
        signal: ctl.signal,
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(
          key
            ? { access_key: key, subject, from_name: "After Layoff Website", name: f.get("name"), email: f.get("email"), service: f.get("type"), budget: f.get("budget"), message: f.get("msg") }
            : { _subject: subject, _template: "table", _captcha: "false", _replyto: f.get("email"), Name: f.get("name"), Email: f.get("email"), Service: f.get("type"), Budget: f.get("budget"), Message: f.get("msg") }
        ),
      });
      const data = await res.json();
      if (!res.ok || String(data.success) === "false") throw new Error(data.message || "failed");
      form.reset();
      setStatus({ text: "✓ Thank you! Your message has been sent. We will reply within 24 hours.", tone: "ok" });
    } catch {
      const body = `Name: ${f.get("name")}\nEmail: ${f.get("email")}\nNeed: ${f.get("type")}\nBudget: ${f.get("budget")}\n\n${f.get("msg")}`;
      setStatus({ text: "Could not send automatically — opening your email app instead.", tone: "warn" });
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } finally {
      clearTimeout(timer);
      setBusy(false);
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <label>
        Your name
        <input name="name" required placeholder="Jane Doe" autoComplete="name" />
      </label>
      <label>
        Email
        <input name="email" type="email" required placeholder="jane@company.com" autoComplete="email" />
      </label>
      <label>
        What do you need?
        <select name="type" defaultValue="Website / Web App">
          {["Website / Web App", "Mobile App", "AI / Automation", "Cloud / DevOps", "UI / UX Design", "Social Media / Graphics", "Hire developers", "Something else"].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      <label>
        Budget (optional)
        <select name="budget" defaultValue="Not sure yet">
          {["Not sure yet", "Under $2,000", "$2,000 – $10,000", "$10,000 – $50,000", "$50,000+"].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      <label>
        Tell us more
        <textarea name="msg" rows={4} required placeholder="A few lines about your project…" />
      </label>
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: -9999 }} aria-hidden="true" />
      <button className="btn" type="submit" disabled={busy}>
        Send message →
      </button>
      <small className="note" role="status" aria-live="polite" style={status.tone === "warn" ? { color: "#b45309" } : undefined}>
        {status.text}
      </small>
    </form>
  );
}
