# 🚀 START HERE

**Your complete portfolio website is built and ready to deploy!**

---

## ⚡ IMMEDIATE ACTION REQUIRED

To get your portfolio live, follow these steps **in order**:

### STEP 1: Install Dependencies (2 minutes)

```bash
npm install
```

This will install all required packages (~230MB download).

---

### STEP 2: Set Up External Services (30 minutes)

You need 2 free accounts:

#### A) Sanity.io (Content Management)
1. Go to: https://www.sanity.io/
2. Sign up (use Google/GitHub for speed)
3. Create new project → Name it anything
4. **Save your Project ID** (looks like: `abc12345`)
5. Go to Settings → API → Add API Token
6. Permissions: **Editor**
7. **Save the token**

📖 **Detailed instructions:** [SETUP_GUIDE.md](SETUP_GUIDE.md) → Phase 1

#### B) Resend (Email Service)
1. Go to: https://resend.com/
2. Sign up for free
3. Go to API Keys → Create API Key
4. **Save the key** (starts with `re_`)

📖 **Detailed instructions:** [SETUP_GUIDE.md](SETUP_GUIDE.md) → Phase 2

---

### STEP 3: Configure Environment Variables (10 minutes)

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Open `.env` and fill in:**

   ```env
   # From Sanity.io
   NEXT_PUBLIC_SANITY_PROJECT_ID=YOUR_PROJECT_ID
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=YOUR_TOKEN

   # Generate these (see below)
   NEXTAUTH_SECRET=YOUR_SECRET
   ADMIN_PASSWORD_HASH=YOUR_HASH

   # From Resend
   RESEND_API_KEY=YOUR_RESEND_KEY
   RESEND_FROM_EMAIL=noreply@manecharo.com

   # Leave these for now
   NEXTAUTH_URL=http://localhost:3000
   ```

3. **Generate NEXTAUTH_SECRET:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```
   Copy output to `NEXTAUTH_SECRET`

4. **Generate ADMIN_PASSWORD_HASH:**
   Your password is: `Letmeupdateyou2005`

   ```bash
   node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('Letmeupdateyou2005', 10, (err, hash) => console.log(hash));"
   ```
   Copy output to `ADMIN_PASSWORD_HASH`

📖 **Detailed instructions:** [SETUP_GUIDE.md](SETUP_GUIDE.md) → Phase 3

---

### STEP 4: Test Locally (5 minutes)

```bash
npm run dev
```

Open: http://localhost:3000

**You should see:**
- ✅ Homepage loads (without video - that's OK for now)
- ✅ Navigation works
- ✅ Message saying "Projects will appear here once added"

**Test admin access:**
- Go to: http://localhost:3000/update
- Login with password: `Letmeupdateyou2005`
- Should see dashboard

🎉 **If this works, you're 60% done!**

---

### STEP 5: Deploy Sanity Studio (15 minutes)

This is where you'll manage all content (projects, blog posts, etc.).

📖 **Complete instructions:** [SETUP_GUIDE.md](SETUP_GUIDE.md) → Phase 4

**Quick version:**
```bash
npm install -g @sanity/cli
mkdir sanity && cd sanity
sanity init
# Select your existing project
# Dataset: production
# Template: Clean project
```

Then deploy:
```bash
sanity deploy
```

Choose a hostname (e.g., `manecharo-portfolio`)

**Bookmark your Sanity Studio URL!**

---

### STEP 6: Add Your First Project (10 minutes)

1. Go to your Sanity Studio URL
2. Login with your Sanity account
3. Click "Project" → "+"
4. Fill in:
   - **Title**: One of your best projects
   - **Slug**: Click "Generate"
   - **Year**: When you did it
   - **Role**: Your role
   - **Challenge**: 2-3 sentences about the problem
   - **Approach**: 2-3 sentences about your solution
   - **Results**: List outcomes (use "→" for bullets)
   - **Tags**: Choose 3-5 relevant tags
   - **Images**: Upload 1-5 project images
   - **Featured**: ✓ Check this box
   - **Order**: 1
5. Click "Publish"

📖 **Content writing guide:** [CONTENT_TEMPLATE.md](CONTENT_TEMPLATE.md)

**Wait 2 minutes, then refresh your localhost:3000**

Your project should appear! 🎉

---

### STEP 7: Deploy to Vercel (20 minutes)

Make your site public!

#### Push to GitHub:
```bash
git init
git add .
git commit -m "Initial portfolio website"
git branch -M main
git remote add origin https://github.com/Manecharo/Manecharo.git
git push -u origin main
```

#### Deploy to Vercel:
1. Go to: https://vercel.com/new
2. Import your GitHub repo
3. Add ALL environment variables from your `.env`
4. Update `NEXTAUTH_URL` to: `https://manecharo.com`
5. Click "Deploy"

#### Connect Domain:
1. Project Settings → Domains
2. Add `manecharo.com`
3. Follow DNS instructions
4. Wait 5-60 minutes for propagation

📖 **Detailed instructions:** [SETUP_GUIDE.md](SETUP_GUIDE.md) → Phase 7

---

## 🎯 YOU'RE LIVE!

Your portfolio is now at: **https://manecharo.com**

---

## 📝 NEXT STEPS (Optional but Recommended)

### Add More Content (1-2 hours)
- Add 3 more featured projects (4 total recommended)
- Fill in About page content
- Upload better images

📖 **Content guide:** [CONTENT_TEMPLATE.md](CONTENT_TEMPLATE.md)

### Add Video Hero Background (1 hour)
The landing page has a placeholder for a video background.

**What you need:**
- 10-15 second looping video
- 1920x1080 (desktop) + 1080x1920 (mobile)
- Under 5MB (desktop) / 3MB (mobile)

**Where to put it:**
- `/public/videos/hero-bg.mp4` (desktop)
- `/public/videos/hero-bg-mobile.mp4` (mobile)
- `/public/videos/hero-poster.jpg` (fallback)

📖 **Video specs:** [SETUP_GUIDE.md](SETUP_GUIDE.md) → Phase 6

### Add Static Images (30 minutes)

Create `/public/images/` folder and add:
- `portrait.jpg` - Your headshot for About page (1200x1600)
- `og-image.png` - Social sharing image (1200x630)
- `blog-default-1.jpg` through `5.jpg` - Blog patterns (1200x630)
- Favicons (various sizes)

📖 **Image specs:** [SETUP_GUIDE.md](SETUP_GUIDE.md) → Phase 6

---

## 📚 DOCUMENTATION INDEX

All docs are in your project root:

| File | When to Use |
|------|-------------|
| **START_HERE.md** | Right now! (you're reading it) |
| **SETUP_GUIDE.md** | Detailed step-by-step setup |
| **README.md** | General overview & reference |
| **CONTENT_TEMPLATE.md** | Writing project descriptions |
| **QUICK_REFERENCE.md** | Daily use, common tasks |
| **PROJECT_SUMMARY.md** | What's been built, tech specs |
| **WEBSITE_SPECIFICATION.md** | Original design requirements |

---

## 🆘 TROUBLESHOOTING

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Sanity content not showing
- Wait 2 minutes after publishing
- Check Project ID is correct in `.env`
- Verify project is published (not draft)

### Can't login to admin
- Check password hash was generated correctly
- Clear browser cookies
- Try incognito mode

### Contact form not working
- Verify Resend API key
- Check email address in Resend dashboard
- Look at Vercel function logs

---

## ✅ CHECKLIST

Use this to track your progress:

- [ ] Dependencies installed (`npm install`)
- [ ] Sanity account created
- [ ] Resend account created
- [ ] `.env` file configured
- [ ] Local site working (`npm run dev`)
- [ ] Admin login working
- [ ] Sanity Studio deployed
- [ ] First project added
- [ ] GitHub repo pushed
- [ ] Vercel deployment complete
- [ ] Domain connected
- [ ] Site live at manecharo.com

**Optional:**
- [ ] 4 featured projects added
- [ ] About page content updated
- [ ] Hero video uploaded
- [ ] Static images added
- [ ] Tested on mobile
- [ ] Contact form tested

---

## ⏱️ TIME ESTIMATE

| Task | Time |
|------|------|
| Install & setup | 1 hour |
| Add first project | 10 min |
| Deploy to Vercel | 20 min |
| Add more content | 1-2 hours |
| Add videos/images | 1-2 hours |
| **TOTAL (Minimum)** | **~2 hours** |
| **TOTAL (Complete)** | **~5 hours** |

---

## 💪 YOU CAN DO THIS!

The hardest part (building the website) is already done.

You just need to:
1. Set up 2 free accounts (30 min)
2. Add your content (1-2 hours)
3. Deploy (20 min)

**Everything is documented step-by-step.**

---

## 🎬 READY TO START?

Open **[SETUP_GUIDE.md](SETUP_GUIDE.md)** and follow Phase 1.

You've got this! 🚀

---

**Questions?**
- Re-read this document
- Check SETUP_GUIDE.md for detailed steps
- Review QUICK_REFERENCE.md for common tasks

**Last Updated:** October 2024
