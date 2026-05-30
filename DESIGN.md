---
name: Juan Palomino Portfolio
description: Dark editorial portfolio for a senior data engineer
colors:
  bg: "#0A0A0A"
  paper: "#F2EFE9"
  ink: "#0A0A0A"
  muted: "#9A9588"
  line: "#2A2A28"
  line-light: "#D8D3C8"
  accent: "#E8FE5C"
  accent-secondary: "#FF5C38"
  body-on-dark: "#D4CFC4"
typography:
  display:
    fontFamily: "Anton, sans-serif"
    fontSize: "clamp(2.75rem, 11vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Archivo, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  mono:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "13px"
    fontWeight: 600
rounded:
  pill: "100px"
  card: "0px"
spacing:
  section: "120px"
  gutter: "40px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "15px 24px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "15px 24px"
---

## Overview

Single-page static portfolio. Dark `#0A0A0A` field, warm paper band for the positioning quote, Anton display + Archivo body + JetBrains Mono for labels. GSAP scroll reveals on capable devices only.

## Colors

Committed dark strategy: near-black ground, chartreuse `#E8FE5C` primary accent, `#FF5C38` on the paper section. Muted text uses hue-tinted grays (`#9A9588`, `#D4CFC4`) for ≥4.5:1 on dark backgrounds. Paper section ink `#3A372E` on `#F2EFE9`.

## Typography

Display caps via Anton with stroke-outline variant for secondary lines. Hero and CTA headings cap at `6rem`. Body 17px, max ~65ch in hero and CTA prose. `text-wrap: balance` on major headings.

## Elevation

Flat editorial: 1px `#2A2A28` rules, no ghost-card shadow stacks. Hover states use color and `translate`, not padding animation.

## Components

- **Nav**: fixed, mix-blend-mode difference, mono meta.
- **Buttons**: pill primary (accent fill) and secondary (hairline border).
- **Marquee**: Anton uppercase strip, scroll-linked velocity via GSAP.
- **Service rows**: three-column grid collapsing to one on mobile.
- **Paper block**: full-bleed `#F2EFE9` with accent2 index color.

## Do's and Don'ts

- Do keep section labels semantic (named areas, not `01 / 02` scaffolds).
- Do ship visible HTML before JS enhancement.
- Don't pair 1px borders with wide soft shadows on the same control.
- Don't animate width, height, or padding for hover affordances.
