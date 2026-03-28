# MediSeen Blog - Deployment Guide

## ✅ Build Status

**Last build:** Successful  
**Static pages generated:** 9 pages (homepage + 5 articles + 3 system pages)  
**Build output:** `/out` directory (ready for static hosting)

## 📁 Project Structure

```
mediseen-blog/
├── .do/app.yaml              # DigitalOcean App Platform config
├── app/
│   ├── layout.tsx            # Global layout with header/footer
│   ├── page.tsx              # Blog homepage (article grid)
│   ├── globals.css           # Global styles
│   └── blog/[slug]/page.tsx  # Individual article pages
├── components/
│   ├── Header.tsx            # Site navigation
│   ├── CTABanner.tsx         # Call-to-action component
│   └── BlogCard.tsx          # Article preview cards
├── content/posts/            # Blog articles (markdown)
│   ├── why-nigerian-hospitals-lose-money.md
│   ├── nhis-billing-guide-nigeria.md
│   ├── offline-hospital-software-nigeria.md
│   ├── paperless-clinic-nigeria.md
│   └── medical-records-patient-safety.md
├── lib/
│   └── posts.ts              # Blog post utilities
├── out/                      # Static build output (generated)
└── next.config.ts            # Next.js config (static export)
```

## 📝 Articles Created

All 5 seed articles are fully written with Nigerian context:

1. **Why Nigerian Hospitals Lose ₦500,000 Every Year (And How to Stop It)**  
   - Category: Billing & Finance  
   - Focus: Revenue leakage, manual billing gaps, pharmacy shrinkage

2. **NHIS Billing Made Simple: A Complete Guide for Nigerian Private Clinics**  
   - Category: NHIS & Insurance  
   - Focus: Capitation, fee-for-service, common errors, ICD-10 codes

3. **Why Your Hospital Software Must Work Without Internet (A Nigerian Clinic's Story)**  
   - Category: Technology  
   - Focus: NEPA outages, offline-first design, Nigerian infrastructure reality

4. **Going Paperless in Your Nigerian Clinic: A Practical Guide (Without the Tech Headache)**  
   - Category: Hospital Management  
   - Focus: Transition strategies, 6-clinic case studies, practical timelines

5. **Lost Patient Records Cost Lives: Why Digital Medical Records Are Now Non-Negotiable in Nigeria**  
   - Category: Hospital Management  
   - Focus: Patient safety, lost records, clinical consequences

## 🚀 Deployment Options

### Option 1: DigitalOcean App Platform (Recommended - FREE tier)

1. **Create the GitHub repo:**
   ```bash
   # Go to github.com/XeniaXi and create a new repo: mediseen-blog
   # Then push:
   cd /home/mccoy/.openclaw/workspace/mediseen-blog
   git push -u origin main
   ```

2. **Deploy to DigitalOcean:**
   - Go to DigitalOcean App Platform
   - Click "Create App"
   - Select "GitHub" → `XeniaXi/mediseen-blog`
   - DigitalOcean will detect `.do/app.yaml` automatically
   - Build command: `npm run build`
   - Output directory: `out`
   - Click "Deploy"

   **Cost:** FREE (static site tier)

### Option 2: Vercel (Alternative - also FREE)

```bash
npm install -g vercel
cd /home/mccoy/.openclaw/workspace/mediseen-blog
vercel --prod
```

### Option 3: Netlify (Alternative - also FREE)

```bash
npm install -g netlify-cli
cd /home/mccoy/.openclaw/workspace/mediseen-blog
netlify deploy --prod --dir=out
```

## 🔧 Local Development

```bash
cd /home/mccoy/.openclaw/workspace/mediseen-blog

# Install dependencies (already done)
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npx serve out
```

## ✏️ Adding New Articles

1. Create a new `.md` file in `content/posts/`:

```markdown
---
title: "Your Article Title"
excerpt: "Brief description for SEO and cards"
date: "2026-03-29"
author: "MediSeen Team"
category: "Hospital Management"
readTime: "5 min read"
---

Your article content here in markdown...

## Use headings

- Bullet points work
- Nigerian context throughout

End with a natural CTA mentioning MediSeen HMS.
```

2. Rebuild:

```bash
npm run build
git add -A
git commit -m "feat: new article"
git push
```

DigitalOcean will auto-deploy on push.

## 🎨 Brand Colors

- **Dark Green:** `#1B6B2A` (MediSeen primary)
- **Gold:** `#FFC107` (MediSeen accent)
- **Background:** `#f9fafb` (light gray)
- **Text:** `#111827` (near black)

## 📊 SEO Configuration

- **Title:** MediSeen Blog — Hospital Management Insights for Nigerian Clinics
- **Meta Description:** Expert guides, tips and insights on running a successful hospital or clinic in Nigeria. From NHIS billing to digital records management.
- **Locale:** en_NG (Nigerian English)

## 🔗 Important Links

- **Live site:** (pending deployment)
- **GitHub repo:** https://github.com/XeniaXi/mediseen-blog
- **MediSeen HMS:** https://mediseenhms.com
- **App signup:** https://app.mediseenhms.com/register
- **WhatsApp:** https://wa.me/2348165160797

## ✅ Pre-Deployment Checklist

- [x] Next.js 15 project scaffolded
- [x] All components created (Header, BlogCard, CTABanner)
- [x] All 5 seed articles written (full content, Nigerian context)
- [x] Typography plugin configured (@tailwindcss/typography)
- [x] Build successful (no TypeScript errors)
- [x] Static export working (output: 'export' in next.config.ts)
- [x] DigitalOcean config created (.do/app.yaml)
- [x] Git repository initialized
- [ ] GitHub repo created (needs Sir Sid's action)
- [ ] Pushed to GitHub
- [ ] Connected to DigitalOcean App Platform
- [ ] Domain configured (optional: blog.mediseenhms.com)

## 🛠️ Next Steps

1. Create GitHub repo: `XeniaXi/mediseen-blog`
2. Push code: `git push -u origin main`
3. Connect to DigitalOcean App Platform
4. (Optional) Point `blog.mediseenhms.com` to the deployed app
5. Add Google Analytics (optional)
6. Submit sitemap to Google Search Console

---

**Built by:** Oga A 🧠  
**For:** Sir Sid  
**Date:** March 28, 2026
