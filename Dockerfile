# syntax=docker/dockerfile:1
# After Layoff website: build the static site with Node, serve it with nginx.
#
#   docker build -t afterlayoff .
#   docker run -d -p 80:80 --name afterlayoff afterlayoff
#
# Optional build arguments:
#   docker build --build-arg NEXT_PUBLIC_WEB3FORMS_KEY=xxxx -t afterlayoff .

# ---------- 1) build ----------
FROM node:22-bookworm-slim AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG NEXT_PUBLIC_SITE_URL=https://afterlayoff.in
ARG NEXT_PUBLIC_BASE_PATH=
ARG NEXT_PUBLIC_WEB3FORMS_KEY=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH \
    NEXT_PUBLIC_WEB3FORMS_KEY=$NEXT_PUBLIC_WEB3FORMS_KEY \
    NEXT_TELEMETRY_DISABLED=1

# "npm run build" = next build --webpack (+ prefetch-file fix); static site is written to /app/dist
RUN npm run build

# ---------- 2) serve ----------
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
