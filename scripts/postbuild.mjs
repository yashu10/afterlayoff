// Next.js static export (trailingSlash) writes segment-prefetch files as  <route>/__next.<seg>/<name>.txt
// (and  <route>/__next.<seg>/<sub>/<name>.txt  for dynamic routes), but the client requests them as
// <route>/__next.<seg>.<name>.txt . Plain static hosts (GitHub Pages, Hostinger, nginx without rewrites) therefore
// 404 those prefetch requests. Copy each file to the flat name so both layouts work.
import { readdirSync, statSync, copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = fileURLToPath(new URL("../" + (process.env.NEXT_DIST_DIR || "dist"), import.meta.url));
let copied = 0;

function flatten(routeDir, dir, prefix) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) flatten(routeDir, full, `${prefix}.${name}`);
    else {
      const dest = join(routeDir, `${prefix}.${name}`);
      if (!existsSync(dest)) { copyFileSync(full, dest); copied++; }
    }
  }
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory()) continue;
    if (name.startsWith("__next.")) flatten(dir, full, name);
    else walk(full);
  }
}

walk(OUT);
console.log(`postbuild: created ${copied} flat prefetch files`);
