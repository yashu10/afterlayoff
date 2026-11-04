import { BASE_PATH } from "@/data/site";

/** Prefix a public-folder asset (or raw href) with the base path when hosted under a sub-path. */
export const asset = (path: string) => (/^https?:/.test(path) ? path : `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`);

/** Rewrite absolute internal links inside trusted article HTML so they work under a base path. */
export const withBaseInHtml = (html: string) => (BASE_PATH ? html.replace(/href="\//g, `href="${BASE_PATH}/`) : html);

export const fmtDate = (d: string, long = false) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: long ? "long" : "short", year: "numeric", timeZone: "UTC" });
