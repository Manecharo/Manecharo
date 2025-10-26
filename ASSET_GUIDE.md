# Asset Placement Guide

## Professional Asset Organization for manecharo.com

This guide provides exact locations and naming conventions for all assets needed for your portfolio website.

---

## 📁 Directory Structure

```
Website/
└── public/
    ├── images/
    │   ├── logo/
    │   ├── about/
    │   ├── projects/
    │   └── social/
    └── videos/
```

---

## 1. Logo Assets

### 1.1 Main Logo (Currently Text-Based)
**Location:** Component-based (no image needed)
**Current Implementation:** [src/components/layout/Logo.tsx](src/components/layout/Logo.tsx)

The logo is currently implemented as styled text:
- **Text:** "MER" with "Consultant" subtitle
- **Colors:** Navy (#1A237E) default, Red (#D32F2F) on hover
- **Locations:** Top-right corner AND footer

**If you want to replace with an image logo:**
```
File: public/images/logo/logo.svg (or logo.png)
Size: 200x200px minimum (SVG preferred for scalability)
Format: SVG, PNG with transparent background
Usage: Replace text in Logo.tsx component
```

---

## 2. Hero Section Video

### 2.1 Background Video
**Location:** `public/videos/hero-bg.mp4`
**Current Status:** Placeholder showing "MER" monogram

**Specifications:**
- **File name:** `hero-bg.mp4`
- **Format:** MP4 (H.264 codec recommended)
- **Aspect ratio:** 16:9 or 4:3
- **Resolution:** 1920x1080px (Full HD) or 1280x720px (HD)
- **Duration:** 10-30 seconds (will loop)
- **File size:** Under 10MB for fast loading
- **Audio:** None (will be muted)
- **Orientation:** Landscape/Portrait (component currently expects portrait for 40% width container)

**Where it appears:**
- Homepage hero section - center 40% of screen
- Visible on desktop only (hidden on mobile)

**Referenced in:**
- [src/components/sections/Hero.tsx:16-35](src/components/sections/Hero.tsx:16-35)

**Implementation:**
Once you add the file to `public/videos/hero-bg.mp4`, the component is already configured to:
1. Auto-play on load
2. Loop continuously
3. Be muted
4. Hide controls
5. Show placeholder until loaded

---

## 3. About Page Portrait

### 3.1 Personal Portrait Photo
**Location:** `public/images/about/portrait.jpg`
**Current Status:** Placeholder with "MER" monogram and instructions

**Specifications:**
- **File name:** `portrait.jpg`
- **Format:** JPG or PNG
- **Aspect ratio:** 3:4 (portrait orientation)
- **Recommended size:** 900x1200px or 1200x1600px
- **File size:** Under 500KB (optimized for web)
- **Style:** Professional, high-quality photo
- **Background:** Any (will be displayed as-is)

**Where it appears:**
- About page - left side on desktop, top on mobile
- Takes up half the screen width on desktop

**Referenced in:**
- [src/app/about/page.tsx:35-56](src/app/about/page.tsx:35-56)

**Implementation:**
The component is ready to use the image. Once you add `public/images/about/portrait.jpg`:
1. Uncomment lines 48-56 in about/page.tsx
2. Comment out or delete the placeholder div (lines 36-46)

---

## 4. Social Media Share Image (OG Image)

### 4.1 Open Graph Image
**Location:** `public/images/social/og-image.jpg`
**Current Status:** Not yet created

**Specifications:**
- **File name:** `og-image.jpg`
- **Format:** JPG or PNG
- **Dimensions:** 1200x630px (Facebook/LinkedIn standard)
- **File size:** Under 1MB
- **Content suggestions:**
  - Your name: "Manuel Echavarria Romero"
  - Tagline: "Designer of Systems"
  - Key stats: "14 years • 8 countries • 50+ brands"
  - Navy and red color scheme (#1A237E, #D32F2F)
  - Professional, clean design

**Where it appears:**
- When sharing on Facebook, LinkedIn, Twitter, WhatsApp
- In search engine previews
- In messaging apps

**Will be referenced in:**
- Site-wide metadata configuration
- Next.js metadata API

**Implementation needed:**
Once created, add to metadata in `src/app/layout.tsx`:

```typescript
export const metadata = {
  // ... existing metadata
  openGraph: {
    images: ['/images/social/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/social/og-image.jpg'],
  },
}
```

---

## 5. Project Images

### 5.1 Project Thumbnails
**Location:** `public/images/projects/`
**Current Status:** Will be managed via Sanity CMS

**Specifications:**
- **Format:** JPG or PNG
- **Aspect ratio:** 16:9 (landscape)
- **Recommended size:** 1200x675px
- **File size:** Under 300KB each
- **Naming:** Use project slug (e.g., `decidim-project.jpg`)

**Where they appear:**
- Work page - project grid
- Home page - featured projects

**Management:**
- Upload through Sanity Studio (once dataset is created)
- No need to add manually to public folder
- Sanity handles CDN and optimization

---

## 6. Favicon and App Icons

### 6.1 Favicon
**Location:** `public/favicon.ico`
**Current Status:** Default Next.js favicon

**Specifications:**
- **File name:** `favicon.ico`
- **Format:** ICO (multi-resolution)
- **Sizes:** 16x16, 32x32, 48x48px
- **Design:** "MER" monogram or simplified logo

### 6.2 Apple Touch Icon
**Location:** `public/apple-touch-icon.png`
**Specifications:**
- **File name:** `apple-touch-icon.png`
- **Size:** 180x180px
- **Format:** PNG

### 6.3 Android Chrome Icons
**Location:**
- `public/android-chrome-192x192.png`
- `public/android-chrome-512x512.png`

**Specifications:**
- **Sizes:** 192x192px and 512x512px
- **Format:** PNG
- **Background:** Can be transparent or colored

---

## 7. Quick Reference: File Paths

Copy these exact file paths for your assets:

```
✅ Hero Video
public/videos/hero-bg.mp4

✅ About Portrait
public/images/about/portrait.jpg

✅ Social Share Image
public/images/social/og-image.jpg

✅ Logo (if using image)
public/images/logo/logo.svg

✅ Favicon
public/favicon.ico

✅ Apple Touch Icon
public/apple-touch-icon.png

✅ Android Icons
public/android-chrome-192x192.png
public/android-chrome-512x512.png
```

---

## 8. Priority Order

Based on impact and visibility:

**High Priority (Add ASAP):**
1. ✅ **Hero video** - `public/videos/hero-bg.mp4` - Main visual impact
2. ✅ **About portrait** - `public/images/about/portrait.jpg` - Personal connection
3. ✅ **OG image** - `public/images/social/og-image.jpg` - Professional sharing

**Medium Priority:**
4. Favicon - `public/favicon.ico` - Browser tab branding
5. Apple/Android icons - App-like experience on mobile

**Low Priority (Already handled):**
6. Logo - Currently text-based, works great
7. Project images - Will be added via Sanity CMS

---

## 9. Image Optimization Tips

### Before Uploading:
1. **Compress images:**
   - Use [TinyPNG.com](https://tinypng.com) or [Squoosh.app](https://squoosh.app)
   - Target 70-80% quality for JPGs
   - Use PNG only when transparency needed

2. **Resize properly:**
   - Don't upload 4K photos if they'll display at 1200px
   - Match recommended dimensions above

3. **Format selection:**
   - **JPG** - Photos, portraits, complex images
   - **PNG** - Logos, icons, transparency needed
   - **SVG** - Logos, icons (best for scaling)
   - **WebP** - Modern format (Next.js auto-converts)

### Next.js Auto-Optimization:
The site uses Next.js Image component which automatically:
- Generates multiple sizes
- Converts to WebP
- Lazy loads images
- Optimizes quality

---

## 10. What's Already Working

**✅ These don't need images:**
- **Logo in header** - Styled text "MER / Consultant" (navy/red)
- **Logo in footer** - Styled text matching header
- **Language switcher** - EN/ES/IT buttons (top-left)
- **Navigation** - Spatial navigation system
- **Blog section** - Unique diamond logo for /thoughts

---

## 11. Next Steps

1. **Create/gather your assets** based on specifications above
2. **Place them in exact file paths** shown in Section 7
3. **For hero video:** Just add to `public/videos/hero-bg.mp4` - it will auto-play
4. **For about portrait:** Add to `public/images/about/portrait.jpg` and uncomment lines 48-56 in [src/app/about/page.tsx](src/app/about/page.tsx)
5. **For OG image:** Add to `public/images/social/og-image.jpg` and I'll configure metadata
6. **Restart dev server** after adding assets to public folder

---

## 12. Current Placeholder Locations

If you want to see where placeholders are currently showing:

1. **Hero video placeholder:**
   - File: [src/components/sections/Hero.tsx:16-35](src/components/sections/Hero.tsx:16-35)
   - Shows: Gray box with "MER" monogram and instructions

2. **About portrait placeholder:**
   - File: [src/app/about/page.tsx:35-46](src/app/about/page.tsx:35-46)
   - Shows: Gradient box with "MER" and instructions

---

## Need Help?

**Recommended Tools:**
- **Video conversion:** [HandBrake](https://handbrake.fr/) - Free, excellent for MP4
- **Image editing:** [Photopea](https://www.photopea.com/) - Free, browser-based Photoshop
- **Image compression:** [Squoosh](https://squoosh.app/) - Google's free tool
- **OG image creation:** [Canva](https://www.canva.com/) - Use 1200x630px custom size

**Video Tips:**
- Keep it subtle and professional
- Avoid fast motion (distracting)
- Consider abstract, geometric, or slow camera movement
- Navy/red color scheme would match your brand

---

**Status:** Ready for asset upload 🚀

All code implementations are complete. Just add your files to the paths specified above.
