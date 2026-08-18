# Bitara Digital Enterprise — Website

Static site (HTML/CSS/vanilla JS, no build step), same pattern as the KTSA site.
Bilingual (English / Bahasa Malaysia) via a toggle in the header.

## Before going live — things to edit

All of the below live in **[`js/config.js`](js/config.js)**, edited in one place:

- `whatsappNumber` / `whatsappDisplay` — your real WhatsApp number
- `email` — where enquiries should be visible from (also shown in the footer)
- `web3formsKey` — get a free key at [web3forms.com](https://web3forms.com) (just your email, no account needed). Until this is set, the contact form shows a friendly "not wired up yet" message and points people to WhatsApp instead — it won't fail silently.
- `social` — LinkedIn / Instagram / Facebook / TikTok links
- `founder` — name, role, and one-line background. This one field updates the name shown on the homepage, About page, and anywhere else `data-founder-*` is used.

Also replace the founder photo placeholder in `img/` if you have a headshot, and swap it into `about.html` / `index.html` (currently using the BDE icon mark as a placeholder).

## Posting a new activity / update

Open **[`js/activities-data.js`](js/activities-data.js)** and copy one of the sample objects to the **top** of the array (newest first). Fill in the date, category (`training` / `development` / `announcement`), and English + Bahasa text. Save and push — no build step. It'll show up on the homepage (latest 3) and the full Activities page automatically.

## Local preview

```
python -m http.server 5195
```
then open `http://localhost:5195`.

## Structure

- `index.html`, `development.html`, `training.html`, `activities.html`, `about.html`, `contact.html` — pages
- `css/style.css` — design tokens + all styling
- `js/config.js` — business info (edit this first)
- `js/activities-data.js` — activity/update posts
- `js/main.js` — shared behavior (language toggle, nav, forms, WhatsApp links, etc.)
- `img/` — logo assets from the brand folder

## Deploying

This repo is set up for GitHub Pages. Push to `main` and Pages serves it directly (see repo Settings → Pages). No custom domain is configured yet — once you buy one, add a `CNAME` file (see how `ktsa.edu.my`'s repo does it) and point its DNS at GitHub Pages.
