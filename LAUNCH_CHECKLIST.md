# 🚀 LAUNCH CHECKLIST

Use this checklist to track your progress from zero to live portfolio.

---

## PHASE 1: INITIAL SETUP

### Install & Configure
- [ ] Run `npm install` successfully
- [ ] Create Sanity.io account
- [ ] Get Sanity Project ID
- [ ] Get Sanity API Token
- [ ] Create Resend account
- [ ] Get Resend API Key
- [ ] Copy `.env.example` to `.env`
- [ ] Fill in all `.env` values
- [ ] Generate `NEXTAUTH_SECRET`
- [ ] Generate `ADMIN_PASSWORD_HASH`

**Docs:** [SETUP_GUIDE.md](SETUP_GUIDE.md) Phases 1-3

---

## PHASE 2: LOCAL TESTING

### Development Server
- [ ] Run `npm run dev` successfully
- [ ] Homepage loads at localhost:3000
- [ ] Navigation works (all 4 directions)
- [ ] Can access `/update` login page
- [ ] Can login with password: `Letmeupdateyou2005`
- [ ] Admin dashboard loads
- [ ] No console errors

**Docs:** [SETUP_GUIDE.md](SETUP_GUIDE.md) Phase 3

---

## PHASE 3: SANITY STUDIO

### CMS Setup
- [ ] Install Sanity CLI: `npm install -g @sanity/cli`
- [ ] Create `sanity` folder
- [ ] Run `sanity init` in sanity folder
- [ ] Select existing project
- [ ] Deploy with `sanity deploy`
- [ ] Choose studio hostname
- [ ] Studio accessible at your URL
- [ ] Can login to Studio

**Docs:** [SETUP_GUIDE.md](SETUP_GUIDE.md) Phase 4

---

## PHASE 4: CONTENT

### Add Projects
- [ ] Login to Sanity Studio
- [ ] Add Project #1 (Featured, Order: 1)
  - [ ] Title
  - [ ] Slug (generated)
  - [ ] Year
  - [ ] Role
  - [ ] Challenge (2-3 sentences)
  - [ ] What I Did (2-3 sentences)
  - [ ] Results (3+ bullet points)
  - [ ] Tags (3-5 selected)
  - [ ] Images uploaded (1-5)
  - [ ] Featured ✓
  - [ ] Published
- [ ] Add Project #2 (Featured, Order: 2)
- [ ] Add Project #3 (Featured, Order: 3)
- [ ] Add Project #4 (Featured, Order: 4)
- [ ] Projects appear on localhost

**Docs:** [CONTENT_TEMPLATE.md](CONTENT_TEMPLATE.md)

---

## PHASE 5: DEPLOYMENT

### GitHub
- [ ] Run `git init`
- [ ] Run `git add .`
- [ ] Run `git commit -m "Initial portfolio website"`
- [ ] Run `git branch -M main`
- [ ] Add remote: `git remote add origin https://github.com/Manecharo/Manecharo.git`
- [ ] Push: `git push -u origin main`
- [ ] Verify code on GitHub

### Vercel
- [ ] Go to vercel.com/new
- [ ] Import GitHub repository
- [ ] Add ALL environment variables:
  - [ ] NEXT_PUBLIC_SANITY_PROJECT_ID
  - [ ] NEXT_PUBLIC_SANITY_DATASET
  - [ ] SANITY_API_TOKEN
  - [ ] NEXTAUTH_URL (set to `https://manecharo.com`)
  - [ ] NEXTAUTH_SECRET
  - [ ] ADMIN_PASSWORD_HASH
  - [ ] RESEND_API_KEY
  - [ ] RESEND_FROM_EMAIL
- [ ] Click "Deploy"
- [ ] Deployment successful
- [ ] Site loads at Vercel URL (xyz.vercel.app)

### Domain
- [ ] Go to Project Settings → Domains
- [ ] Click "Add Domain"
- [ ] Enter `manecharo.com`
- [ ] Add `www.manecharo.com`
- [ ] Configure DNS:
  - [ ] A record: @ → 76.76.21.21
  - [ ] CNAME: www → cname.vercel-dns.com
- [ ] Wait for DNS propagation (5-60 min)
- [ ] Site loads at manecharo.com
- [ ] SSL certificate active (https)

**Docs:** [SETUP_GUIDE.md](SETUP_GUIDE.md) Phase 7

---

## PHASE 6: ASSETS (Optional but Recommended)

### Videos
- [ ] Create/source hero video (10-15 sec loop)
- [ ] Optimize for desktop (1920x1080, <5MB)
- [ ] Optimize for mobile (1080x1920, <3MB)
- [ ] Export poster frame as JPG
- [ ] Add to `/public/videos/hero-bg.mp4`
- [ ] Add to `/public/videos/hero-bg-mobile.mp4`
- [ ] Add to `/public/videos/hero-poster.jpg`
- [ ] Push to GitHub
- [ ] Video plays on site

### Images
- [ ] Create `/public/images/` folder
- [ ] Add portrait photo (1200x1600)
- [ ] Create/download blog defaults (5 images, 1200x630)
  - [ ] blog-default-1.jpg
  - [ ] blog-default-2.jpg
  - [ ] blog-default-3.jpg
  - [ ] blog-default-4.jpg
  - [ ] blog-default-5.jpg
- [ ] Create OG image (1200x630)
- [ ] Create favicons:
  - [ ] favicon.ico (32x32)
  - [ ] apple-touch-icon.png (180x180)
  - [ ] icon-192.png
  - [ ] icon-512.png
- [ ] Push to GitHub
- [ ] Images appear on site

**Docs:** [SETUP_GUIDE.md](SETUP_GUIDE.md) Phase 6

---

## PHASE 7: TESTING

### Functionality Tests
- [ ] Homepage loads in <3 seconds
- [ ] Navigation transitions smooth
- [ ] All 4 menu items work (Work, About, Contact, Capabilities)
- [ ] Projects page displays all projects
- [ ] Project filtering works
- [ ] Individual project pages load
- [ ] Lightbox gallery works (click images)
- [ ] About page loads
- [ ] Capabilities page loads
- [ ] Contact page loads
- [ ] Contact form submits successfully
- [ ] Email received at manuelerfreelance@gmail.com
- [ ] Auto-reply email sent to test email
- [ ] Admin panel at `/update` requires login
- [ ] Can login with correct password
- [ ] Cannot login with wrong password
- [ ] Easter egg works (click footer logo 3x)
- [ ] Blog page accessible at `/thoughts`
- [ ] Individual blog posts load (if any published)

### Mobile Tests
- [ ] Test on iPhone (Safari)
- [ ] Test on Android (Chrome)
- [ ] Hamburger menu appears
- [ ] Hamburger menu opens/closes
- [ ] All pages accessible on mobile
- [ ] Contact form works on mobile
- [ ] Images load properly
- [ ] Text readable (not too small)
- [ ] Touch targets large enough
- [ ] No horizontal scroll
- [ ] Video plays on mobile (if added)

### Browser Tests
- [ ] Chrome (desktop)
- [ ] Safari (desktop)
- [ ] Firefox (desktop)
- [ ] Edge (desktop)

### Performance
- [ ] Run Lighthouse test (Chrome DevTools)
  - [ ] Performance: 90+
  - [ ] Accessibility: 95+
  - [ ] Best Practices: 95+
  - [ ] SEO: 100
- [ ] No console errors
- [ ] No broken images
- [ ] All links work

### SEO
- [ ] Visit `manecharo.com/sitemap.xml` (should load)
- [ ] Visit `manecharo.com/robots.txt` (should load)
- [ ] Meta tags present (view source)
- [ ] OG image set (check by sharing on social)
- [ ] Favicon appears in browser tab
- [ ] Page titles correct

**Docs:** [SETUP_GUIDE.md](SETUP_GUIDE.md) Phase 8

---

## PHASE 8: FINAL POLISH

### Content Review
- [ ] Read all text for typos
- [ ] Check all project descriptions
- [ ] Verify contact information correct
- [ ] Verify social media links work
- [ ] Check all images have alt text
- [ ] Ensure featured projects are your best work

### Professional Review
- [ ] Show to friend/colleague for feedback
- [ ] Test on their device
- [ ] Get honest opinion on design
- [ ] Get opinion on content clarity
- [ ] Make final adjustments

### Analytics (Optional)
- [ ] Set up Vercel Analytics (free, built-in)
- [ ] Set up Google Search Console
- [ ] Submit sitemap to Google
- [ ] Set up Google Analytics (optional)

---

## PHASE 9: LAUNCH

### Pre-Launch
- [ ] Double-check all links work
- [ ] Double-check contact form works
- [ ] Take screenshots for social sharing
- [ ] Prepare launch message
- [ ] Review privacy policy (if needed)

### Launch Day
- [ ] Share on LinkedIn
- [ ] Share on Instagram
- [ ] Share on Twitter/X
- [ ] Email personal contacts
- [ ] Update resume with portfolio URL
- [ ] Update LinkedIn profile URL
- [ ] Update other profiles (Behance, Dribbble, etc.)
- [ ] Post in design communities

### Post-Launch (Week 1)
- [ ] Monitor for any errors
- [ ] Check email for contact form submissions
- [ ] Respond to any feedback
- [ ] Check analytics (if set up)
- [ ] Fix any issues found

---

## ONGOING MAINTENANCE

### Monthly
- [ ] Check for contact form submissions
- [ ] Review analytics (if set up)
- [ ] Update content if needed
- [ ] Check for broken links

### As Needed
- [ ] Add new projects as completed
- [ ] Write blog posts
- [ ] Update About page
- [ ] Respond to inquiries

---

## TROUBLESHOOTING CHECKLIST

If something doesn't work:

### Site Won't Load
- [ ] Check DNS settings in domain provider
- [ ] Check Vercel deployment status
- [ ] Check for build errors in Vercel logs
- [ ] Wait 1 hour (DNS propagation)

### Projects Not Showing
- [ ] Verify projects are Published in Sanity (not Draft)
- [ ] Check Sanity Project ID in `.env`
- [ ] Check CORS settings in Sanity
- [ ] Wait 1 hour (ISR revalidation)
- [ ] Force redeploy in Vercel

### Contact Form Not Working
- [ ] Check Resend API key is correct
- [ ] Verify email address in Resend
- [ ] Check Vercel function logs
- [ ] Test with different email address
- [ ] Check spam folder

### Admin Login Not Working
- [ ] Verify password hash generated correctly
- [ ] Check `NEXTAUTH_SECRET` is set
- [ ] Clear browser cookies
- [ ] Try incognito/private mode
- [ ] Check `NEXTAUTH_URL` matches your domain

### Images Not Loading
- [ ] Check file paths are correct
- [ ] Verify files exist in `/public/`
- [ ] Check file extensions match
- [ ] Push files to GitHub
- [ ] Wait for Vercel deployment

### Build Failing
- [ ] Check Vercel build logs
- [ ] Verify all environment variables set
- [ ] Check for TypeScript errors
- [ ] Check for missing dependencies
- [ ] Test build locally: `npm run build`

---

## SUCCESS INDICATORS

You're ready to launch when:

✅ All items in Phases 1-5 are checked
✅ Site loads at manecharo.com
✅ At least 2-4 projects visible
✅ Contact form sends email
✅ Mobile works perfectly
✅ No console errors
✅ You're proud to share it!

---

## FINAL CHECKLIST BEFORE SHARING

- [ ] Everything above is complete
- [ ] You've tested on your phone
- [ ] A friend has reviewed it
- [ ] Contact info is correct
- [ ] Projects showcase your best work
- [ ] You're confident and excited to share

---

**🎉 CONGRATULATIONS! YOUR PORTFOLIO IS LIVE! 🎉**

Now share it with the world and land your next amazing project!

---

**Quick Links:**
- [START_HERE.md](START_HERE.md) - Quick start
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Detailed setup
- [CONTENT_TEMPLATE.md](CONTENT_TEMPLATE.md) - Content guide
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Daily reference

**Your Portfolio:** https://manecharo.com
**Admin Panel:** https://manecharo.com/update
**Password:** Letmeupdateyou2005
