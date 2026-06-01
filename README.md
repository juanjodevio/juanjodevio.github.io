# juanjodevio.github.io

Portfolio personal de [Juan Palomino](https://juanjodev.io): **Data + AI Engineer** en Ecuador y LATAM. Sitio estático, una sola página, orientado a posicionamiento y contacto directo.

**En vivo:** [https://juanjodev.io](https://juanjodev.io/)

## Stack

| Capa | Tecnología |
|------|------------|
| Markup | HTML semántico (`index.html`) |
| Estilos | CSS vanilla (`css/main.css`), tokens en `DESIGN.md` |
| Interacción | JavaScript vanilla (`js/main.js`) |
| Motion | [GSAP](https://gsap.com/) + ScrollTrigger (CDN, solo si no hay `prefers-reduced-motion`) |
| Tipografía | Anton, Archivo, JetBrains Mono (Google Fonts) |
| Hosting | GitHub Pages (`CNAME` → `juanjodev.io`) |

Sin bundler, framework ni dependencias npm en runtime.

## Estructura del repo

```
├── index.html          # Página única
├── css/main.css        # Estilos
├── js/main.js          # Cursor, nav en paper, reveals GSAP
├── favicon.svg
├── og-image.svg        # Open Graph / Twitter (1200×630)
├── CNAME               # Dominio custom
├── scripts/validate.sh # Comprobaciones locales y en CI
├── PRODUCT.md          # Propósito, audiencia, anti-referencias
├── DESIGN.md           # Tokens de color, tipo y componentes
└── .github/workflows/pages.yml
```

## Desarrollo local

Sirve la raíz del repo con cualquier servidor estático:

```bash
# Python
python -m http.server 8765

# Node (si no tienes Python)
npx --yes serve -p 8765
```

Abre [http://127.0.0.1:8765](http://127.0.0.1:8765).

GSAP se carga desde CDN; hace falta conexión a internet para animaciones y marquee acelerado por scroll.

## Validación

Antes de abrir un PR o pushear a `main`:

```bash
bash scripts/validate.sh
```

El script comprueba:

- Archivos que GitHub Pages copia en el deploy
- Enlaces y anclas (`#sobre`, `#servicios`, `#contacto`)
- Guardrails de accesibilidad (`:focus-visible`, cursor custom acotado, contenido visible sin JS)
- Smoke HTTP de `index.html`, `css/main.css` y `js/main.js`

En CI también corre `html-validate` sobre `index.html` (ver workflow).

## Deploy

Push a `main` → workflow **Deploy GitHub Pages**:

1. `validate` (script + html-validate)
2. `deploy` (artefacto `_site` con los archivos listados arriba)

Pull requests solo ejecutan validación, sin publicar.

## Diseño y copy

- **PRODUCT.md** — Para quién es el sitio, tono de marca y qué evitar (plantillas SaaS genéricas, etc.).
- **DESIGN.md** — Paleta, tipografía y patrones (hero `DATA + AI` / `ENGINEER`, nav tipo terminal, banda paper).

Herramientas de diseño del repo (p. ej. Impeccable en `.agents/`) son opcionales para contribuir al sitio publicado.

## Contacto

- Web: [juanjodev.io](https://juanjodev.io/)
- Email: [me@juanjodev.io](mailto:me@juanjodev.io)
- GitHub: [@juanjodevio](https://github.com/juanjodevio)
