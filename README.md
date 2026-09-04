# Bitara Digital Enterprise — Website

Static site (HTML/CSS/vanilla JS, no build step), same pattern as the KTSA site.
Bilingual (English / Bahasa Malaysia) via a toggle in the header.

## Before going live — things to edit

All of the below live in **[`js/config.js`](js/config.js)**, edited in one place:

- `whatsappNumber` / `whatsappDisplay` — your real WhatsApp number
- `email` — where enquiries should be visible from (also shown in the footer)
- `googleSheetsFormUrl` — see **[GOOGLE_SHEETS_SETUP.md](GOOGLE_SHEETS_SETUP.md)** for the full walkthrough. Until this is set, the contact form shows a friendly "not wired up yet" message and points people to WhatsApp instead — it won't fail silently.
- `social` — LinkedIn / Instagram / Facebook / TikTok links
- `founder` — name, role, and background. This one object updates the name/bio shown on the homepage, About page, and anywhere else `data-founder-*` is used. **Confirm the exact spelling of the founder's name** — it's currently a best guess ("Shahfiq Nashrah") inferred from the email/GitHub handle.

The founder photo lives at `img/founder/founder.jpg`; swap the file (keep the same name) to replace it.

## Posting a new activity / update

Open **[`js/activities-data.js`](js/activities-data.js)** and copy one of the existing objects to the **top** of the array (newest first). Fill in the date, category (`training` / `development` / `announcement`), English + Bahasa title/excerpt, an `image` path (or `null` to fall back to a category icon), and a `link` to a full article page. Save and push — no build step. The card shows up on the homepage (latest 3) and the full Activities page automatically.

For the full article itself: copy one of the pages in `activities/` (e.g. `activities/kt-midas-ai-training.html`) as a starting template, update the `<title>`/meta tags, breadcrumb, hero image, and the `.article-body` content (English in the `.i18n-en` block, Bahasa in the `.i18n-ms` block), then drop the matching photos into a new folder under `img/activities/`.

## Local preview

```
python -m http.server 5195
```
then open `http://localhost:5195`.

## Structure

- `index.html`, `development.html`, `training.html`, `activities.html`, `about.html`, `contact.html` — pages
- `activities/*.html` — full SEO-optimized article pages linked from the Activities feed
- `css/style.css` — design tokens + all styling
- `js/config.js` — business info (edit this first)
- `js/activities-data.js` — activity/update card data (title, excerpt, image, link to the article page)
- `js/main.js` — shared behavior (language toggle, nav, forms, WhatsApp links, etc.)
- `img/` — logo, founder photo, and activity photos
- `GOOGLE_SHEETS_SETUP.md` — how to connect the contact form to a Google Sheet

## Deploying

This repo is set up for GitHub Pages. Push to `main` and Pages serves it directly (see repo Settings → Pages). No custom domain is configured yet — once you buy one, add a `CNAME` file (see how `ktsa.edu.my`'s repo does it) and point its DNS at GitHub Pages.
