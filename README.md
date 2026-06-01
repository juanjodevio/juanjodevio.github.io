# juanjodevio.github.io

Portfolio personal de [Juan Palomino](https://juanjodev.io): **Data + AI Engineer** en Ecuador y LATAM. Sitio estático, una sola página, orientado a posicionamiento y contacto directo.

**En vivo:** [https://juanjodev.io](https://juanjodev.io/) (español) · [https://juanjodev.io/en/](https://juanjodev.io/en/) (English)

## Idiomas

| Ruta | Archivo | Idioma |
|------|---------|--------|
| `/` | `index.html` | Español (por defecto, `hreflang` x-default) |
| `/en/` | `en/index.html` | Inglés |

Cada página incluye `hreflang`, `canonical` propio y un switch en el nav (`$ lang en` / `$ lang es`). Misma estructura, IDs de sección (`#sobre`, `#servicios`, `#contacto`) y assets en `/css` y `/js`.

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
├── index.html          # Español (/)
├── en/index.html       # English (/en/)
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

Abre [http://127.0.0.1:8765/](http://127.0.0.1:8765/) o [http://127.0.0.1:8765/en/](http://127.0.0.1:8765/en/).

También puedes abrir `index.html` o `en/index.html` con doble clic: los assets usan rutas relativas (`css/`, `js/`, `en/`). GSAP sigue requiriendo internet.

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
- Smoke HTTP de `/`, `/en/`, `css/main.css` y `js/main.js`
- `hreflang` y enlaces de cambio de idioma en ambas páginas

En CI también corre `html-validate` sobre `index.html` y `en/index.html` (ver workflow).

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
