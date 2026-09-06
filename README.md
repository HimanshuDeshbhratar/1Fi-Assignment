# 1Fi Shop — Marketplace Assignment

Mobile-first Shop experience inspired by the live [1Fi](https://1fi.in/) brand and customer app (`app.1fi.in`), implementing the **1Fi Marketplace** section required by the SDE Intern assignment.

## What’s included

Shop page with three sections:

- **Top Brands** — intentionally blank
- **Nearby Stores** — intentionally blank
- **1Fi Marketplace** — full flow

Marketplace features:

- Product listing (image, name, pricing, brand filters, search)
- Product detail with variants (storage / colour)
- Dynamic no-cost EMI plans (3–24 months)
- Select EMI plan + **Proceed with plan** CTA
- Loading / error / empty states
- Mock API layer (`/mock/products.json`) — no hard-coded catalog inside UI components

## Design alignment

Tokens and patterns taken from 1Fi’s public site/app:

- Primary purple `#712CDC` / `#7832e0`
- Soft lilac surfaces, pill CTAs, rounded cards
- Inter typography (same as 1fi.in)
- Copy tone: “Shop today, pay later using mutual funds”

Product prices/variants were derived from catalog data present on 1fi.in; images use 1Fi’s public CDN where available.

## Run locally

```bash
cd 1fi-shop
npm install
npm run dev
```

Open the URL Vite prints (default `http://localhost:5173`), then go to **Shop → 1Fi Marketplace**.

```bash
npm run build
npm run preview
```

## Deploy on Vercel

The app is a Vite SPA. `vercel.json` rewrites all routes to `index.html` so React Router deep links work on refresh.

1. Push the `1fi-shop` folder (or the whole repo) to GitHub.
2. In [Vercel](https://vercel.com/new), import the repo.
3. Set **Root Directory** to `1fi-shop` if the repo root is the parent assignment folder.
4. Leave defaults: Framework **Vite**, Build `npm run build`, Output `dist`.
5. Deploy.

Or from this folder with the Vercel CLI:

```bash
cd 1fi-shop
npx vercel
```

## Project structure

```
src/
  api/           # dynamic data access (mock fetch + delay)
  components/    # shell, cards, EMI list, states
  hooks/         # useProducts / useProduct
  pages/         # Shop, Marketplace, PDP, success
  types/ utils/ styles/
public/mock/products.json
```

## Notes

No private 1Fi app repository or reference screens were shared with this assignment. This app recreates the Shop + Marketplace experience as a standalone React SPA so the required feature can be evaluated end-to-end.
