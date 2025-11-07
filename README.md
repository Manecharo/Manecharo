# Manuel Echavarria Romero - Portfolio Website

**Design-First. Performance-Obsessed. Detail-Perfect.**

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables (see below)
cp .env.example .env

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📋 Prerequisites

Before deployment, you need to set up these free services:

### 1. **Sanity.io** (Content Management)
- Go to [sanity.io](https://www.sanity.io/)
- Create a free account
- Create a new project
- Note your **Project ID** and **Dataset** (usually "production")
- Generate an API token with **Editor** permissions

### 2. **Resend** (Email Service)
- Go to [resend.com](https://resend.com/)
- Sign up for free tier
- Verify your domain OR use their test domain for development
- Generate an API key

### 3. **Vercel** (Deployment & Blob Storage)
- Already set up ✓
- Blob storage token will be auto-generated on deployment

### 4. **Google reCAPTCHA v3** (Bot Protection)
- Go to [google.com/recaptcha](https://www.google.com/recaptcha/admin)
- Create a new site (reCAPTCHA v3)
- Add your domain: manecharo.com
- Note your **Site Key** and **Secret Key**

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token_here

# NextAuth (Authentication)
NEXTAUTH_URL=https://manecharo.com
NEXTAUTH_SECRET=generate_with_command_below
ADMIN_PASSWORD_HASH=see_below_for_hash

# Resend (Email)
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=noreply@manecharo.com

# Vercel Blob (auto-populated on Vercel)
BLOB_READ_WRITE_TOKEN=

# Analytics (auto-populated on Vercel)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=auto

# Google reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

### Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

### Generate ADMIN_PASSWORD_HASH:
Your password is: `Letmeupdateyou2005`

Run this Node script to generate the hash:
```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('Letmeupdateyou2005', 10, (err, hash) => console.log(hash));"
```

Copy the output to `ADMIN_PASSWORD_HASH` in your `.env` file.

---

## 🎨 Sanity Studio Setup

### 1. Install Sanity CLI
```bash
npm install -g @sanity/cli
```

### 2. Initialize Sanity Studio
```bash
# In your project root
cd sanity
npm install
```

### 3. Create sanity.config.ts
```typescript
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/lib/sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Manecharo Portfolio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
```

### 4. Deploy Sanity Studio
```bash
sanity deploy
```

Choose a subdomain (e.g., `manecharo-portfolio`)
Your studio will be at: `https://manecharo-portfolio.sanity.studio`

---

## 📁 Project Structure

```
Website/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (pages)/
│   │   │   ├── page.tsx        # Landing page
│   │   │   ├── work/           # Projects
│   │   │   ├── about/          # About page
│   │   │   ├── capabilities/   # Capabilities page
│   │   │   ├── contact/        # Contact page
│   │   │   └── thoughts/       # Blog (brutalist)
│   │   ├── update/             # Admin panel
│   │   ├── api/                # API routes
│   │   ├── layout.tsx          # Root layout
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── layout/             # Navigation, Footer, etc.
│   │   ├── sections/           # Page sections
│   │   └── ui/                 # Reusable components
│   └── lib/
│       └── sanity/             # Sanity client & schemas
├── public/
│   ├── videos/                 # Hero videos
│   └── images/                 # Static images
├── package.json
├── tailwind.config.ts
└── next.config.mjs
```

---

## 🎥 Required Assets

### Videos (Critical for Landing Page)

Upload these to `/public/videos/`:

1. **hero-bg.mp4** (Desktop)
   - Resolution: 1920x1080
   - Length: 10-20 seconds (seamless loop)
   - Size: <5MB
   - Format: MP4 (H.264)

2. **hero-bg-mobile.mp4** (Mobile)
   - Resolution: 1080x1920 (portrait)
   - Same length as desktop
   - Size: <3MB
   - Format: MP4 (H.264)

3. **hero-poster.jpg** (Fallback)
   - Resolution: 1920x1080
   - First frame of video
   - Format: JPG

### Images

Upload these to `/public/images/`:

1. **portrait.jpg** (About page)
   - Resolution: 1200x1600 (portrait)
   - High quality headshot

2. **blog-default-1.jpg** through **blog-default-5.jpg**
   - Resolution: 1200x630
   - Black/white/red geometric patterns
   - For blog posts without custom images

3. **og-image.png** (Social sharing)
   - Resolution: 1200x630
   - Your name + branding

4. **Favicons**
   - favicon.ico (32x32)
   - apple-touch-icon.png (180x180)
   - icon-192.png, icon-512.png

---

## 📝 Adding Content

### Option 1: Sanity Studio (Recommended)
1. Go to `https://your-project-id.sanity.studio`
2. Login with your Sanity account
3. Add projects, blog posts, and page content

### Option 2: Create CONTENT.md File

Create `/CONTENT.md` with this structure:

```markdown
## LANDING PAGE
Tagline: Your custom tagline here
Stats: Your stats text here

## ABOUT PAGE
Short Version: [Your biography]
Education: [Your education details]

## PROJECTS
### Project Name
Year: 2024
Role: Lead Designer
Challenge: [Description]
What I Did: [Description]
Results:
→ Result 1
→ Result 2
Tags: product-design, ux-ui-design

[Repeat for other projects]
```

Then manually add to Sanity Studio.

---

## 🚀 Deployment to Vercel

### Initial Setup

1. **Push to GitHub** (if not done)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/Manecharo/Manecharo.git
git push -u origin main
```

2. **Import to Vercel**
- Go to [vercel.com/new](https://vercel.com/new)
- Import your GitHub repository
- Add all environment variables (from `.env`)
- Deploy

3. **Configure Domain**
- Go to Project Settings → Domains
- Add `manecharo.com`
- Follow DNS configuration instructions

### Subsequent Deployments

Every push to `main` auto-deploys to production. That's it!

---

## 🔒 Admin Panel

### Access
- URL: `https://manecharo.com/update`
- Password: `Letmeupdateyou2005`

### Features
- Manage projects via Sanity Studio
- Manage blog posts via Sanity Studio
- Edit page content via Sanity Studio

*Note: All content management happens in Sanity Studio for the best editing experience.*

---

## 🎨 Key Features

### 1. Spatial Navigation
- Unique directional page transitions
- Pages slide in from the direction of the menu clicked
- Buttery smooth 600ms animations

### 2. Video Hero Background
- Full-screen autoplay video
- Separate mobile/desktop versions
- Graceful fallback to poster image

### 3. Brutalist Blog
- Completely different design language
- Easter egg access: Click footer logo 3x rapidly
- Supports writing, video, and audio posts

### 4. Project Filtering
- Tag-based filtering system
- Masonry grid layout
- Smooth animations

### 5. Admin Panel
- Password-protected via NextAuth
- All content managed through Sanity Studio
- Secure and easy to use

---

## 🐛 Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Sanity images not loading
- Check `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
- Verify images are uploaded in Sanity Studio
- Ensure CORS is configured in Sanity (sanity.io/manage)

### Login not working
- Verify `ADMIN_PASSWORD_HASH` is correctly generated
- Check `NEXTAUTH_SECRET` is set
- Ensure `NEXTAUTH_URL` matches your domain

### Email form not working
- Verify `RESEND_API_KEY` is valid
- Check domain is verified in Resend
- Look at Vercel function logs for errors

---

## 📊 Performance

Target Lighthouse scores:
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

Optimizations included:
- Next.js Image component for all images
- Lazy loading below the fold
- Code splitting
- WebP format with JPEG fallback
- Preloaded fonts
- ISR (Incremental Static Regeneration)

---

## 🔄 Updates & Maintenance

### Updating Projects
1. Go to Sanity Studio
2. Click "Project" → "Create"
3. Fill in all fields
4. Upload images (1-5)
5. Publish

Changes appear within 1 hour (ISR revalidation).

### Updating Blog
Same process in Sanity Studio under "Post".

### Updating Page Text
Same process in Sanity Studio under "Page Content".

---

## 📞 Support

For technical issues:
- Check this README
- Review [Next.js docs](https://nextjs.org/docs)
- Review [Sanity docs](https://www.sanity.io/docs)
- Check Vercel deployment logs

---

## 📄 License

© 2024 Manuel Echavarria Romero. All rights reserved.

---

**Built with Next.js 14, TypeScript, Tailwind CSS, Sanity.io, and ❤️**
