# Luméa — Modern Fashion Brand & E-Commerce Web App

A high-conversion fashion e-commerce storefront inspired by modern direct-to-consumer fashion brands and Bewakoof-style shopping features. Built with **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS**.

---

## ⚡ How to Deploy on Vercel

The project is already pre-configured with `vercel.json` for optimal Vite Single Page Application (SPA) routing and production builds.

### Option 1: Deploy via GitHub (Recommended — Auto-Updates on Push)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "feat: complete fashion storefront with collection pages and search"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in (or sign up with your GitHub account).
   - Click **"Add New..."** → **"Project"**.
   - Find and select your GitHub repository from the list and click **"Import"**.

3. **Verify Project Settings (Auto-Detected)**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Click "Deploy"**:
   - Vercel will build the project in ~30 seconds and provide you with a live `https://<your-project>.vercel.app` URL with free HTTPS/SSL!
   - Every time you push new commits to your GitHub repo, Vercel will automatically redeploy the latest changes.

---

### Option 2: Deploy Directly via Vercel CLI (Instant)

If you have Node.js and npm installed locally, you can deploy directly from your terminal:

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy (Preview)**:
   ```bash
   vercel
   ```
   Follow the simple prompts (press Enter to accept default settings).

4. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

---

## ⚙️ Vercel Configuration (`vercel.json`)

The project contains a pre-configured `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
This ensures that client-side page routing (e.g. `/`, `/dresses`, `/size-guide`, etc.) never returns a 404 error when refreshed.

---

## ✨ Features Included

- **In-Header Mega Search Bar**: Autocomplete suggestions, visual product cards, category shortcuts, and live search.
- **Bewakoof-Style Offer Badges & Banners**: High-contrast golden VIP club banners, interactive promo code copy buttons (`TRIBE15`), and prominent discount pills.
- **Dedicated Category Collections**: 100% distinct clothing items across Dresses, Tops, Outerwear, Handbags, Bestsellers, and New Drops.
- **Interactive Fit & Size Guide**: Smart calculator recommending ideal size based on height, weight, preferred fit, and garment type.
- **Interactive Shopping Bag & Drawer**: Cart slide-out with live pricing, free shipping calculator, and checkout simulator.
- **Wishlist & Quick View**: Full-screen modal with color switchers, size selector, fabric details, and real customer reviews.
