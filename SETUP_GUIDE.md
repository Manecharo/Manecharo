# COMPLETE SETUP GUIDE
## Manuel Echavarria Romero Portfolio Website

This guide will walk you through **every step** needed to get your portfolio live.

---

## PHASE 1: SANITY.IO SETUP (15 minutes)

### Step 1: Create Sanity Account
1. Go to [https://www.sanity.io/](https://www.sanity.io/)
2. Click "Get Started"
3. Sign up with Google or GitHub (easiest)

### Step 2: Create New Project
1. Click "+ New Project"
2. Name: "Manecharo Portfolio" (or whatever you prefer)
3. Click "Create project"
4. **IMPORTANT**: Copy your **Project ID** (looks like: `abc12345`)

### Step 3: Create Dataset
1. In your new project, click "Datasets"
2. Create dataset named: `production`
3. Choose "Public" access

### Step 4: Get API Token
1. Go to Settings → API
2. Click "Add API token"
3. Name: "Website Access"
4. Permissions: **Editor**
5. Click "Save"
6. **IMPORTANT**: Copy the token (you won't see it again!)

### Step 5: Configure CORS
1. Still in Settings → API
2. Under "CORS Origins", click "Add CORS origin"
3. Origin: `http://localhost:3000`
4. Allow credentials: ✓
5. Click "Save"
6. Add another:
   - Origin: `https://manecharo.com`
   - Allow credentials: ✓
   - Click "Save"

**Save these for later:**
- ✅ Project ID: `manecharo`
- ✅ API Token: `skiVWrEBZHCqpiWT8RQP8SmsPWpwM51mJ15LafmMyodoTVOEso7zyb9SAiYhw9VPZNWdhEF4LTbJ6vpO2tBBCbwUub0QvFXzGRBLcrWipbstUqQtCL1Fyi5Vo2cIb9ycDibgdYW62vtVtaMzrlBTpuZC39Nk6Lw3vbdSzxEWjuR0yMDjDIT7`

---

## PHASE 2: RESEND EMAIL SETUP (10 minutes)

### Step 1: Create Resend Account
1. Go to [https://resend.com/](https://resend.com/)
2. Sign up (free tier = 100 emails/day, perfect!)
3. Verify your email

### Step 2: Add Domain (Optional but Recommended)
**Option A: Use Your Domain**
1. Go to "Domains" → "Add Domain"
2. Enter: `manecharo.com`
3. Follow DNS setup instructions
4. Wait for verification (5-30 minutes)

**Option B: Use Resend Test Domain (For Testing)**
Skip this - use `onboarding@resend.dev` for testing

### Step 3: Get API Key
1. Go to "API Keys"
2. Click "Create API Key"
3. Name: "Manecharo Portfolio"
4. Permission: "Sending access"
5. Click "Create"
6. **IMPORTANT**: Copy the API key (starts with `re_`)

**Save this:**
- ✅ Resend API Key: `re_fw61zJMG_Dg85TEjjTtVypxyfxo5QqZuv`

---

## PHASE 3: LOCAL DEVELOPMENT SETUP

### Step 1: Install Dependencies
```bash
cd "D:\Trabajos\MER - Consultant\Website"
npm install
```

### Step 2: Create .env File
Create a file named `.env` in the root folder:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=YOUR_PROJECT_ID_HERE
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=YOUR_SANITY_TOKEN_HERE

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=YOUR_SECRET_HERE
ADMIN_PASSWORD_HASH=YOUR_HASH_HERE

# Resend
RESEND_API_KEY=YOUR_RESEND_KEY_HERE
RESEND_FROM_EMAIL=noreply@manecharo.com
```

### Step 3: Generate NEXTAUTH_SECRET
**Windows (PowerShell):**
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Mac/Linux:**
```bash
openssl rand -base64 32
```

Copy the output to `NEXTAUTH_SECRET` in `.env`

### Step 4: Generate Password Hash
Your admin password is: `Letmeupdateyou2005`

**Run this:**
```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('Letmeupdateyou2005', 10, (err, hash) => console.log(hash));"
```

Copy the output (starts with `$2a$10$...`) to `ADMIN_PASSWORD_HASH` in `.env`

### Step 5: Test Locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Test checklist:**
- ✅ Homepage loads
- ✅ Navigation works
- ✅ Can access `/update` (login with password)

---

## PHASE 4: DEPLOY SANITY STUDIO

### Step 1: Install Sanity CLI
```bash
npm install -g @sanity/cli
```

### Step 2: Create Sanity Studio Folder
```bash
# In your project root
mkdir sanity
cd sanity
```

### Step 3: Initialize Studio
```bash
sanity init
```

**When prompted:**
- Project: Select your existing project
- Dataset: `production`
- Project output path: `.` (current directory)
- Select project template: "Clean project"

### Step 4: Add Schema
Copy your schemas from `src/lib/sanity/schemas/` to `sanity/schemas/`

Update `sanity/sanity.config.ts`:
```typescript
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import project from './schemas/project'
import post from './schemas/post'
import pageContent from './schemas/pageContent'

export default defineConfig({
  name: 'default',
  title: 'Manecharo Portfolio',
  projectId: 'YOUR_PROJECT_ID',
  dataset: 'production',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: [project, post, pageContent],
  },
})
```

### Step 5: Deploy Studio
```bash
sanity deploy
```

Choose a studio hostname (e.g., `manecharo-portfolio`)

Your studio will be at: `https://manecharo-portfolio.sanity.studio`

**Bookmark this URL - this is where you'll manage all content!**

---

## PHASE 5: ADD CONTENT

### Step 1: Login to Sanity Studio
Go to your studio URL and login with your Sanity account

### Step 2: Add Your First Project

1. Click "Project" (sidebar)
2. Click "+" to create new
3. Fill in:
   - **Title**: "Paqua Hydroponic System"
   - **Slug**: Click "Generate" (creates URL-friendly version)
   - **Year**: 2023
   - **Role**: "Lead Product Designer"
   - **Challenge**: "Urban farmers needed an affordable, space-efficient hydroponic system..."
   - **Approach**: "Designed modular vertical system..."
   - **Results**:
     - "Reduced water usage by 40%"
     - "Increased yield by 60%"
   - **Tags**: Select "Product Design", "3D Modeling"
   - **Images**: Upload 1-5 project images
   - **Featured**: ✓ (to show on homepage)
   - **Order**: 1

4. Click "Publish"

**Repeat for 3 more featured projects!**

### Step 3: Add Page Content (Optional)
1. Click "Page Content"
2. Create entries for "landing", "about", "capabilities"
3. Fill in custom text

### Step 4: Test Content
Go to `http://localhost:3000` and refresh - your project should appear!

---

## PHASE 6: ADD ASSETS

### Required Files

Create these folders in `/public/`:

```
public/
├── videos/
│   ├── hero-bg.mp4 (desktop video)
│   ├── hero-bg-mobile.mp4 (mobile video)
│   └── hero-poster.jpg (fallback image)
├── images/
│   ├── portrait.jpg (about page)
│   ├── blog-default-1.jpg
│   ├── blog-default-2.jpg
│   ├── blog-default-3.jpg
│   ├── blog-default-4.jpg
│   ├── blog-default-5.jpg
│   └── og-image.png (social sharing)
└── (root)
    ├── favicon.ico
    ├── apple-touch-icon.png
    ├── icon-192.png
    └── icon-512.png
```

### Video Specifications

**hero-bg.mp4** (Desktop):
- Create a 10-15 second looping video
- Resolution: 1920x1080
- Codec: H.264
- Bitrate: 2-3 Mbps
- **Keep under 5MB!**

**Tool recommendations:**
- HandBrake (free): Export as MP4, H.264, 2000 kbps
- Adobe Media Encoder: H.264, target 5MB
- CloudConvert.com: Online video compressor

**hero-bg-mobile.mp4** (Mobile):
- Same video, portrait orientation
- Resolution: 1080x1920
- **Keep under 3MB!**

**hero-poster.jpg**:
- Export first frame of video as JPG
- Resolution: 1920x1080

### Where to Get Images

**For blog defaults (geometric patterns):**
- Generate at: [https://doodad.dev/pattern-generator/](https://doodad.dev/pattern-generator/)
- Use black/white/red colors only
- Export as 1200x630

**For favicons:**
- Create at: [https://favicon.io/](https://favicon.io/)
- Use "MER" text
- Gold (#E6B325) on charcoal (#2C2C2C)

---

## PHASE 7: DEPLOY TO VERCEL

### Step 1: Push to GitHub

**If not already done:**
```bash
git init
git add .
git commit -m "Initial portfolio website"
git branch -M main
git remote add origin https://github.com/Manecharo/Manecharo.git
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your GitHub repo: `Manecharo/Manecharo`
4. Click "Import"

### Step 3: Add Environment Variables

In Vercel project settings, add these:

```
NEXT_PUBLIC_SANITY_PROJECT_ID = [your project ID]
NEXT_PUBLIC_SANITY_DATASET = production
SANITY_API_TOKEN = [your Sanity token]
NEXTAUTH_URL = https://manecharo.com
NEXTAUTH_SECRET = [your secret]
ADMIN_PASSWORD_HASH = [your hash]
RESEND_API_KEY = [your Resend key]
RESEND_FROM_EMAIL = noreply@manecharo.com
```

### Step 4: Deploy

Click "Deploy"

Wait 2-3 minutes. Your site is live at a Vercel URL!

### Step 5: Add Custom Domain

1. Go to Project Settings → Domains
2. Click "Add"
3. Enter: `manecharo.com`
4. Follow DNS instructions
5. Wait for DNS propagation (5-60 minutes)

**DNS Configuration:**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21` (Vercel IP)

- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`

---

## PHASE 8: FINAL CHECKS

### ✅ Functionality Checklist

- [ ] Homepage loads with video background
- [ ] Navigation works (spatial transitions smooth)
- [ ] Projects page shows your projects
- [ ] Individual project pages load
- [ ] About page displays correctly
- [ ] Capabilities page displays correctly
- [ ] Contact form sends email (test it!)
- [ ] Admin panel accessible at `/update`
- [ ] Can login with password
- [ ] Sanity Studio accessible
- [ ] Easter egg works (click footer logo 3x)
- [ ] Blog page accessible at `/thoughts`

### ✅ Content Checklist

- [ ] 4 featured projects added
- [ ] All projects have images
- [ ] About page text updated (or placeholder OK)
- [ ] Video background working (or placeholder showing)
- [ ] Favicon appears in browser tab
- [ ] OG image for social sharing

### ✅ Mobile Checklist

- [ ] Test on iPhone Safari
- [ ] Test on Android Chrome
- [ ] Hamburger menu works
- [ ] Forms work on mobile
- [ ] Images load properly

---

## TROUBLESHOOTING

### "Module not found" Error
```bash
rm -rf node_modules package-lock.json
npm install
```

### Images Not Loading from Sanity
1. Check Project ID is correct
2. Go to Sanity Manage → API → CORS
3. Add your Vercel URL
4. Redeploy

### Email Not Sending
1. Check Resend API key is correct
2. Verify domain in Resend dashboard
3. Check Vercel function logs for errors

### Login Not Working
1. Verify password hash was generated correctly
2. Check NEXTAUTH_SECRET is set
3. Clear browser cookies and try again

### Video Not Playing
1. Check file exists at `/public/videos/hero-bg.mp4`
2. Ensure file is under 5MB
3. Try different browser
4. Check video codec is H.264

---

## MAINTENANCE

### How to Add a New Project
1. Go to Sanity Studio
2. Click "Project" → "+"
3. Fill in all fields
4. Upload images
5. Click "Publish"
6. Wait 1 hour (or force rebuild in Vercel)

### How to Write a Blog Post
1. Go to Sanity Studio
2. Click "Post" → "+"
3. Choose type (Writing/Video/Audio)
4. Fill in content
5. Toggle "Published" to true
6. Click "Publish"

### How to Update Page Text
1. Go to Sanity Studio
2. Click "Page Content"
3. Select page to edit
4. Update text
5. Click "Publish"

---

## YOU'RE DONE! 🎉

Your portfolio is now live at: **https://manecharo.com**

Admin panel: **https://manecharo.com/update**
Content management: **Your Sanity Studio URL**

---

## NEXT STEPS

1. **Add all 4 featured projects**
2. **Upload hero video**
3. **Test contact form**
4. **Share with the world!**

---

**Need Help?**
- Re-read this guide
- Check README.md
- Review spec: WEBSITE_SPECIFICATION.md
