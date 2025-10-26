# QUICK REFERENCE CARD

## 🔗 Important URLs

| Service | URL | Purpose |
|---------|-----|---------|
| **Live Site** | https://manecharo.com | Your portfolio |
| **Admin Panel** | https://manecharo.com/update | Protected admin area |
| **Sanity Studio** | https://[your-project].sanity.studio | Content management |
| **Vercel Dashboard** | https://vercel.com/dashboard | Deployment & settings |
| **GitHub Repo** | https://github.com/Manecharo/Manecharo | Source code |

---

## 🔑 Credentials

**Admin Panel Login:**
- URL: `/update`
- Password: `Letmeupdateyou2005`

**Sanity Studio:**
- Use your Sanity.io account credentials

**Vercel:**
- Use your Vercel account credentials

---

## 🚀 Common Commands

```bash
# Development
npm run dev              # Start dev server (localhost:3000)
npm run build            # Build for production
npm start                # Start production server

# Git
git add .                # Stage changes
git commit -m "message"  # Commit changes
git push                 # Push to GitHub (auto-deploys!)

# Sanity Studio
cd sanity               # Go to Sanity folder
sanity deploy           # Deploy Sanity Studio
sanity start            # Run Studio locally
```

---

## 📝 How to... Quick Guide

### Add a New Project
1. Go to Sanity Studio
2. Click "Project" → "+"
3. Fill all fields + upload images
4. Toggle "Featured" if homepage
5. Set "Order" number
6. Click "Publish"
7. Wait ~1 hour OR force redeploy in Vercel

### Write a Blog Post
1. Go to Sanity Studio
2. Click "Post" → "+"
3. Choose type (Writing/Video/Audio)
4. Add content
5. Toggle "Published" to true
6. Click "Publish"

### Update Page Text
1. Go to Sanity Studio
2. Click "Page Content"
3. Select page (landing/about/capabilities)
4. Edit text
5. Click "Publish"

### Change Admin Password
1. Generate new hash:
   ```bash
   node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('YOUR_NEW_PASSWORD', 10, (err, hash) => console.log(hash));"
   ```
2. Update `ADMIN_PASSWORD_HASH` in Vercel
3. Redeploy

### Upload New Images/Videos
1. Add files to `/public/videos/` or `/public/images/`
2. Commit and push to GitHub:
   ```bash
   git add public/
   git commit -m "Add new images"
   git push
   ```
3. Auto-deploys!

---

## 🐛 Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| Site not updating | Wait 1 hour (ISR) OR redeploy in Vercel |
| Images not loading | Check Sanity CORS settings, add Vercel URL |
| Login not working | Clear cookies, check password hash |
| Email not sending | Check Resend API key, verify domain |
| Build fails | Check Vercel logs, ensure env vars set |
| Sanity content not showing | Check Project ID, API token, CORS |

---

## 📞 Support Resources

| Resource | URL |
|----------|-----|
| Next.js Docs | https://nextjs.org/docs |
| Sanity Docs | https://www.sanity.io/docs |
| Tailwind CSS | https://tailwindcss.com/docs |
| Vercel Docs | https://vercel.com/docs |
| Resend Docs | https://resend.com/docs |

---

## 📁 File Locations

```
Key files you might need to edit:

src/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx               # Site-wide layout
│   └── globals.css              # Global styles

├── components/
│   ├── layout/
│   │   ├── Navigation.tsx       # Main navigation
│   │   └── Footer.tsx           # Footer (easter egg!)
│   └── sections/
│       ├── Hero.tsx             # Video hero section
│       └── ContactForm.tsx      # Contact form

├── lib/sanity/
│   ├── client.ts                # Sanity connection
│   └── schemas/                 # Content schemas
│       ├── project.ts
│       ├── post.ts
│       └── pageContent.ts

public/
├── videos/                      # Hero videos
└── images/                      # Static images

.env                             # Environment variables (NEVER commit!)
```

---

## 🎨 Design System

### Colors
```css
--gold: #E6B325          /* Primary accent */
--charcoal: #2C2C2C      /* Text */
--cream: #FAF7F2         /* Background */
--terracotta: #C67B5C    /* Warm accent */
--sage: #8BA888          /* Cool accent */
```

### Typography
- Primary: Inter
- Display: Space Grotesk
- Mono (blog): Courier New

### Breakpoints
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

---

## ✅ Pre-Launch Checklist

Before sharing your portfolio:

- [ ] 4 featured projects added with images
- [ ] About page text updated
- [ ] Contact form tested (sends email)
- [ ] Video background working
- [ ] Tested on mobile
- [ ] Admin login works
- [ ] All images optimized (<500KB each)
- [ ] OG image for social sharing
- [ ] Favicon appears
- [ ] Domain connected

---

## 📊 Performance Tips

- **Images**: Always upload WebP + JPEG, max 500KB
- **Videos**: Keep under 5MB desktop, 3MB mobile
- **Projects**: Limit to 20-30 max for best performance
- **Redeploy**: Only when needed, ISR handles updates

---

## 🔄 Update Frequency

| Content Type | How Often | Where |
|--------------|-----------|-------|
| Projects | As completed | Sanity Studio |
| Blog posts | Weekly/monthly | Sanity Studio |
| Page text | Rarely | Sanity Studio |
| Code | Only for features | GitHub |

---

**Last Updated:** October 2024
**Version:** 1.0.0
