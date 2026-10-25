# Wei Sen / Vincent

Personal website: [profile.vincentws.com](https://profile.vincentws.com).

## Current website

The published homepage is **A4 · Kinetic assembly**, a static HTML/CSS/JavaScript site in `site/`.

- Original WebGL assembly with 144 faceted cells, wireframe, orbital paths and moving signals.
- Drag to rotate, hold to expand, tap or press Space to send a ripple, and unfold or reassemble the structure.
- Scroll-driven forms, three structure presets, keyboard controls, reduced-motion and a simplified Canvas fallback.
- One paper background and an electric-blue accent; all fonts and animation libraries are self-hosted.
- Current work: Garena, 2026–present, Agent Harness & Data evaluation.

Design rationale: [site/DESIGN.md](site/DESIGN.md). Resources and licenses: [site/ASSETS.md](site/ASSETS.md). Research and validation: [docs/a4-design-and-validation.md](docs/a4-design-and-validation.md).

## Build and preview

Node.js 20 or newer is sufficient. No dependency installation is needed for the static build.

```sh
npm run build:pages
python3 -m http.server 8791 --bind 127.0.0.1 --directory out
```

Open [localhost:8791](http://127.0.0.1:8791/).

Pushing `main` runs `.github/workflows/deploy.yml`: build `out/`, upload the artifact, then deploy to GitHub Pages. The build emits `version.json` with the design version and deployed commit.

The existing resume at `/resume-agent-native.html` is built from `motion-variants/06-synthesis-v2/`. Its 0705 content is retained; the build adjusts return links to the new homepage and uses local GSAP dependencies.

## Historical implementations

`src/` contains the earlier Next.js implementation. `motion-variants/` contains earlier static designs. They are retained for reference; the homepage build uses `site/`.
