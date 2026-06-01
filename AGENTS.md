# AGENTS.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

## 5. Locales (es / en)

This site is **two static pages**, not a string catalog:

| Locale | File | URL |
|--------|------|-----|
| Spanish (default) | `index.html` | `/` |
| English | `en/index.html` | `/en/` |

Shared: `css/main.css`, `js/main.js`. Section IDs stay aligned: `#sobre`, `#servicios`, `#contacto` (copy differs; anchors do not).

**When you change either page, update the other in the same PR** unless the user scoped a single locale. That includes:

- New/removed/reordered sections or nav items
- Hero, services, contact, footer, or JSON-LD fields that exist on both pages
- Language switcher (`details.nav-lang`) and `hreflang` / `canonical` (production URLs stay `https://juanjodev.io/…`)
- Asset paths: both pages use site-root URLs (`/css/main.css`, `/js/main.js`, `/favicon.svg`); lang links use `/` and `/en/`

**Do not** translate by duplicating logic in JS or adding a client-only i18n layer without an explicit request.

**Verify:** `bash scripts/validate.sh` (checks both HTML files + HTTP smoke for `/` and `/en/`).

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.