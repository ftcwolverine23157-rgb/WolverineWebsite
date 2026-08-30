# Wolverine 23157 — Team Site

Plain HTML/CSS/JS, no build step. Three files + an `images/` folder.

## Preview locally
Just open `index.html` in a browser, or run a tiny local server (needed for some browsers to load local images correctly):

```
cd wolverine-website
python3 -m http.server 8000
```
Then visit http://localhost:8000

## Deploy
Drop the whole `wolverine-website` folder into any static host:
- **GitHub Pages**: push this folder to a repo, enable Pages on the `main` branch.
- **Netlify / Vercel**: drag-and-drop the folder onto their dashboard.
- **Your current host**: replace whatever's there with these files, keeping `images/` alongside `index.html`.

## To edit

- **Team roster** — in `index.html`, search for `id="team"`. The captain card and member cards are plain HTML; duplicate a `.team-card` block and swap the letter/name/role for each new teammate, replacing the dashed "Add teammate" placeholders.
- **Colors / fonts** — all defined as CSS variables at the top of `styles.css` under `:root`.
- **Photos** — swap any file in `images/` (keep the same filename, or update the `src` in `index.html`).
- **Social links** — footer in `index.html` has placeholder `#` hrefs for Instagram/YouTube — drop in your real links.
- **Sponsor list** — `.sponsor-strip` in `index.html`, one `<span class="sponsor-pill">` per sponsor.

## Notes
- Respects `prefers-reduced-motion` — all animation is disabled for people who have that OS setting on.
- No build tools, frameworks, or dependencies beyond two Google Fonts loaded via CDN link tags in `<head>`.
