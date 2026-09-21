# Luméa — Modern Fashion Brand Landing Page

A modern, high-conversion e-commerce fashion brand landing page built with **React 19**, **Vite**, and **Tailwind CSS**.

---

## 🚀 Push to GitHub

1. Initialize git and commit your files:
   ```bash
   git init
   git add .
   git commit -m "feat: Luméa fashion brand landing page"
   git branch -M main
   ```

2. Create a new repository on [GitHub](https://github.com/new).

3. Link and push to your GitHub repo:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

---

## ⚡ Deploy to Vercel

### Method 1: Import via Vercel Dashboard (Recommended)
1. Go to [Vercel](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New..." → "Project"**.
3. Select your GitHub repository and click **"Import"**.
4. The framework is automatically detected as **Vite**:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"**. The pre-configured `vercel.json` ensures client-side routing works smoothly.

### Method 2: Vercel CLI
```bash
npm i -g vercel
vercel
```

---

## 🛠️ Features Included

- **Editorial Fashion Aesthetic**: Editorial serif headings (`Cormorant Garamond`) and modern typography (`Plus Jakarta Sans`).
- **Interactive Shopping Bag Drawer**: Slide-out cart with item counter badge, quantity adjuster, free shipping progress bar, promo code validation, and checkout simulator.
- **Product Quick View**: Modal with size picker (XS to XL), color swatch selector, and reviews.
- **Category Filter & Search**: Real-time product search with keyword suggestions and category filters.
- **Wishlist Engine**: Save favorite pieces with visual feedback.
- **Live Image Customizer**: Swap any image on the page (Hero, Categories, Products, Editorial Banner) via local file upload, custom URL, or curated fashion presets.
- **Newsletter Subscription**: Community email capture with instant coupon validation (`LUMEA15`).
- **100% Responsive Design**: Optimized for mobile, tablet, and desktop screens.
