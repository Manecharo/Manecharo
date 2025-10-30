# PORTFOLIO WEBSITE SPECIFICATION
## Manuel Echavarria Romero
**Design-First. Performance-Obsessed. Detail-Perfect.**

---

## 🎯 MISSION CRITICAL

This is a **designer's portfolio**. Every detail matters. This site must be:
- Graphically impeccable
- Extremely clean
- Performance-optimized
- Mobile-perfect
- Accessible
- Easy to update

**Quality Bar: Museum-grade design execution.**

---

## 📐 TECH STACK

```yaml
Framework: Next.js 14+ (App Router)
Language: TypeScript
Styling: Tailwind CSS + Custom CSS
CMS: Sanity.io
Auth: NextAuth.js (Credentials)
Storage: Vercel Blob
Email: Resend (free tier)
Analytics: Vercel Analytics
Deployment: Vercel
Repository: github.com/Manecharo/Manecharo.git
```

---

## 🎨 DESIGN SYSTEM

### Color Palette
```css
/* Core Colors - Evolved from 2023 Portfolio */
--gold: #E6B325;              /* Primary accent */
--charcoal: #2C2C2C;          /* Primary text */
--cream: #FAF7F2;             /* Backgrounds */
--terracotta: #C67B5C;        /* Warm accent */
--sage: #8BA888;              /* Cool accent */
--pure-white: #FFFFFF;

/* Brutalist Blog Override */
--brutal-bg: #FFFFFF;
--brutal-text: #000000;
--brutal-border: #000000;
--brutal-red: #FF0000;
```

### Typography
```css
/* Main Site */
Primary: 'Inter', system-ui, sans-serif
Display: 'Space Grotesk', 'Inter', sans-serif

/* Blog (Brutalist) */
Mono: 'Courier New', monospace

/* Scale (Fluid, Responsive) */
Hero: clamp(2.5rem, 5vw, 4.5rem)
H1: clamp(2rem, 4vw, 3.5rem)
H2: clamp(1.5rem, 3vw, 2.5rem)
Body: clamp(1rem, 1.5vw, 1.125rem)
```

### Layout Philosophy
- Asymmetric grids (intentionally broken)
- Generous whitespace (let content breathe)
- Full-bleed images where appropriate
- Elements enter at different speeds (parallax)
- Mobile-first (320px → 2560px)

### Animation Principles
```javascript
// Smooth, intentional, never jarring
Hover: scale(1.02) | 200ms ease-out
Scroll: fade-up + parallax | 500ms ease
Page: opacity transition | 300ms ease
Loading: skeleton screens (never spinners)
```

---

## 🗺️ SPATIAL NAVIGATION SYSTEM

### Menu Architecture (See Artboard_1.png)

```
         [Menu 2 - Top]
              ↑
              |
[Menu 1 - Left] — CENTER — [Menu 3 - Right]
              |
              ↓
         [Menu 4 - Bottom]
```

**Center = Current View (Active Page)**

### Navigation Labels
```yaml
Menu 1 (Left): "Work"
Menu 2 (Top): "About"  
Menu 3 (Right): "Contact"
Menu 4 (Bottom): "Capabilities"

Center: "Home" (Landing page)
```

### Navigation Behavior

**CRITICAL: Physical Movement Effect**

When user clicks a menu item, the **entire viewport slides** in that direction, creating the illusion of moving through physical space.

```javascript
// Click Menu 1 (Left/Work)
→ Current content slides RIGHT off screen
→ Work page slides in from LEFT
→ Duration: 600ms ease-in-out
→ Parallax: Background elements move slower

// Click Menu 2 (Top/About)
→ Current content slides DOWN off screen  
→ About page slides in from TOP
→ Duration: 600ms ease-in-out

// Click Menu 3 (Right/Contact)
→ Current content slides LEFT off screen
→ Contact page slides in from RIGHT
→ Duration: 600ms ease-in-out

// Click Menu 4 (Bottom/Capabilities)
→ Current content slides UP off screen
→ Capabilities page slides in from BOTTOM
→ Duration: 600ms ease-in-out
```

### Implementation
```javascript
// Framer Motion variants
const slideVariants = {
  fromLeft: { x: '-100%', opacity: 0 },
  fromRight: { x: '100%', opacity: 0 },
  fromTop: { y: '-100%', opacity: 0 },
  fromBottom: { y: '100%', opacity: 0 },
  center: { x: 0, y: 0, opacity: 1 },
  toLeft: { x: '-100%', opacity: 0 },
  toRight: { x: '100%', opacity: 0 },
  toTop: { y: '-100%', opacity: 0 },
  toBottom: { y: '100%', opacity: 0 }
};

// Direction mapping
const navigationMap = {
  '/work': { enter: 'fromLeft', exit: 'toRight' },
  '/about': { enter: 'fromTop', exit: 'toBottom' },
  '/contact': { enter: 'fromRight', exit: 'toLeft' },
  '/capabilities': { enter: 'fromBottom', exit: 'toTop' },
  '/': { enter: 'center', exit: (to) => getExitDirection(to) }
};
```

### Visual Design
```css
/* Navigation Menu - Fixed Position */
.nav-menu {
  position: fixed;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 14px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--charcoal);
  z-index: 100;
  cursor: pointer;
  transition: all 200ms ease;
}

.nav-menu:hover {
  color: var(--gold);
  transform: scale(1.05);
}

/* Positions */
.nav-left { left: 2rem; top: 50%; transform: rotate(-90deg) translateX(-50%); }
.nav-top { top: 2rem; left: 50%; transform: translateX(-50%); }
.nav-right { right: 2rem; top: 50%; transform: rotate(90deg) translateX(50%); }
.nav-bottom { bottom: 2rem; left: 50%; transform: translateX(-50%); }

/* Mobile: Convert to hamburger menu */
@media (max-width: 767px) {
  .nav-menu { display: none; }
  .hamburger-menu { display: block; }
}
```

---

## 📄 SITE STRUCTURE

```
/ (Landing - Center position)
/work (Projects index)
/work/[slug] (Individual project)
/about
/capabilities
/contact
/thoughts (Hidden blog - easter egg)
/thoughts/[slug] (Blog post)
/update (Admin - password protected)
```

---

## 🏠 LANDING PAGE

### Video Background
```yaml
File: /public/videos/hero-bg.mp4
Specs:
  Format: MP4 (H.264)
  Resolution: 1920x1080
  Length: 10-20 seconds (seamless loop)
  Size: <5MB (desktop) | <3MB (mobile)
  FPS: 24-30
  Bitrate: 2-3 Mbps
  Audio: None
Behavior: autoplay, loop, muted, playsinline
Fallback: Poster image (first frame)
Mobile: Optimized version, not static image
```

### Layout
```html
<section class="hero">
  <video /> <!-- Full viewport, fixed -->
  <div class="overlay" /> <!-- rgba(0,0,0,0.3) -->
  <div class="content">
    <h1>MANUEL ECHAVARRIA ROMERO</h1>
    <p class="tagline">
      I design systems that actually work—
      from hydroponic gardens to digital democracies.
    </p>
    <p class="stats">
      14 years turning complex problems into elegant solutions.<br/>
      6 countries. 3 startups. 50+ brands. 600+ products shipped.
    </p>
    <div class="cta">
      <button>View Selected Work</button>
      <button>Let's Talk</button>
    </div>
  </div>
</section>

<section class="featured-projects">
  <!-- 4 project cards: Paqua, Diego Cancino, Futtem, KUASA -->
</section>
```

### Easter Egg (Hidden Blog Access)
```javascript
// Click footer logo 3x rapidly (within 1.5 seconds)
let clicks = 0;
let timer = null;

logo.addEventListener('click', () => {
  clicks++;
  clearTimeout(timer);
  
  if (clicks === 3) {
    // Flash animation
    logo.classList.add('flash-gold');
    // Reveal hidden link
    document.querySelector('.hidden-blog-link').classList.add('revealed');
    clicks = 0;
  }
  
  timer = setTimeout(() => { clicks = 0; }, 1500);
});
```

---

## 💼 PROJECTS (/work)

### Header
```
Selected Projects

Product design. Brand identities. Civic tech. 
Urban agriculture. Political campaigns. Metaverse spaces.

I don't do one thing—I solve problems that matter.
```

### Filter System
```yaml
Tags Available:
  - All (default)
  - Product Design
  - UX/UI Design
  - Branding & Identity
  - Social Impact
  - Graphic Design
  - 3D Modeling & Rendering
  - Strategy & Consulting
  - Web Design
  - Photography & Video
  - Communication Strategy
  - Technical Design
  - Project Management
```

### Project Grid
- Masonry layout (2-3 columns)
- Each card: Image, Title, Year, Tags (max 3), Description
- Hover: Slight zoom on image
- Click: Navigate to project detail with spatial transition

### Individual Project Page
```yaml
Structure:
  - Hero image (full-width)
  - Title + Year + Role
  - The Challenge (rich text)
  - What I Did (rich text)
  - The Result (→ bullet metrics)
  - Tags (chips)
  - Gallery (1-5 images, lightbox)
  - Navigation (← Previous | Next →)

Image Gallery:
  Count: 1-5 images
  Format: WebP + JPEG fallback
  Max Width: 2400px
  Size: <500KB each
  Layout: Vertical stack with whitespace
  Interaction: Click → Lightbox zoom
```

---

## 👤 ABOUT PAGE

```yaml
Layout:
  Hero: Large portrait (off-center) + name overlay
  
  Content Sections:
    - The Short Version (personality + journey)
    - What I Actually Do (icon grid)
    - Languages (visual representation)
    - Education (timeline/cards)

Text Blocks:
  "The Short Version"
  "What I Actually Do"
  "Languages: Spanish (native), English (C1), Italian (B2), French (A1), Turkish (beginner)"
  "Education: Masters SPD Milan 2009-2011, Bachelor IED Milan 2006-2009, MIT AI/ML 2024, Harvard Teaching 2020"
```

---

## 🛠️ CAPABILITIES PAGE

```yaml
Structure:
  - Header: "What I Do" + intro
  - Process: 4-step cards (Understand → Explore → Build → Scale)
  - Who I Work With: 6 client type cards
  - Tools: Visual grid (Adobe, Rhino, Figma, etc.)
  - CTA: "Not Interested In..." section

Process Steps:
  1. Understand: Deep research. User immersion. Real problem first.
  2. Explore: Rapid iteration. No first-idea attachment.
  3. Build: 3D modeling. Prototyping. Testing. Making real.
  4. Scale: Systems thinking. Documentation. Team building.
```

---

## 📧 CONTACT PAGE

### Form Fields
```yaml
Name: text (required)
Email: email (required)
Project Type: select [Product Design, UX/UI, Branding, Strategy, Other]
Message: textarea (required)
Budget: select [<$5K, $5K-$15K, $15K-$50K, $50K+, Let's discuss]
Timeline: select [Urgent, 1-3 months, 3-6 months, Exploring]
```

### Contact Info
```
Email: manuelerfreelance@gmail.com
Phone: +60 12 658 1025
Based: Kuala Lumpur, Malaysia
Response Time: Within 48 hours
```

### Social Links
```
Instagram: instagram.com/ManecharoDesign
LinkedIn: linkedin.com/in/ManecharoDesign
```

### Email Service (Resend - Free Tier)
- Send to: manuelerfreelance@gmail.com
- Auto-reply to user
- Store submission in Sanity (backup)
- Toast notification on success/error

---

## 📝 BLOG (/thoughts) - BRUTALIST

### Access
1. Direct URL: `/thoughts`
2. Easter egg: Click footer logo 3× rapidly

### Design (COMPLETELY DIFFERENT)
```css
/* Brutalist Override */
background: #FFFFFF;
color: #000000;
font-family: 'Courier New', monospace;
font-size: 16px; /* Fixed */
border: 3px solid #000000; /* Everywhere */
border-radius: 0; /* No curves */
box-shadow: none; /* No shadows */

/* Broken Grid */
.post-card {
  transform: rotate(-1deg); /* Slight tilt */
  margin: random(20px, 40px); /* Irregular spacing */
}

.post-card:nth-child(even) {
  transform: rotate(0.5deg);
}
```

### Layout
```
Header: Black bar, white text "NOTES FROM THE FIELD"

Posts List (Irregular stack):
  - Border box (3px black)
  - Badge: [WRITING] | [VIDEO] | [AUDIO]
  - Thumbnail (or default geometric pattern)
  - Title (bold 24px)
  - Date (small caps)
  - Excerpt (100 chars)
  - "READ →"
```

### Post Types
```yaml
Writing:
  - Rich text content
  - Inline images
  
Video:
  - Embedded player (YouTube/Vimeo)
  - Support direct upload
  
Audio:
  - Embedded player
  - Waveform visualization
  - Upload MP3/WAV
```

### Default Images (5 variations)
- Abstract geometric patterns
- Black/White/Red only
- 1200x630px
- Rotate randomly if no custom image

### Share Buttons
```
→ Share to X (Twitter)
→ Share to LinkedIn  
→ Copy Link
```

---

## 🔐 ADMIN PANEL (/update)

### Authentication
```yaml
Method: NextAuth.js (Credentials)
Protection: Bcrypt-hashed password
Login: /update/login
Session: 7 days, HTTP-only cookie
Env: ADMIN_PASSWORD_HASH
```

### Dashboard Structure
```
/update (Overview)
├── /update/projects (Manage projects)
├── /update/content (Edit page text)
├── /update/blog (Manage posts)
└── /update/media (Media library)
```

### UI Design
```css
/* Simple, Functional, Clean */
--admin-bg: #F5F5F5;
--admin-sidebar: #2C2C2C;
--admin-accent: #E6B325;

Layout:
  - Fixed sidebar (250px, left)
  - Main content (responsive)
  - Toast notifications
  - Auto-save (30s intervals)
```

### Project Editor
```yaml
Fields:
  - Title (text)
  - Slug (auto-generated, editable)
  - Year (number)
  - Role (text)
  - Challenge (textarea)
  - Approach (textarea)
  - Results (textarea, "→" for bullets)
  - Tags (multi-select, max 5)
  - Images (drag-drop, 1-5 max)
  - Featured (toggle)
  
Image Upload:
  - Drag & drop zone
  - Preview thumbnails
  - Reorder by dragging
  - Click thumbnail → Drag image within frame
  - Delete button per image
  - Auto-optimization on upload
  
Actions:
  - Save Project
  - Preview (opens in new tab)
  - Cancel
```

### Blog Editor
```yaml
Fields:
  - Post Type (select: Writing, Video, Audio)
  - Title (text)
  - Slug (auto-generated)
  - Featured Image (single upload, optional)
  - Content (rich text editor with toolbar)
  - Video URL (if type=video)
  - Audio File (upload if type=audio)
  - Tags (comma-separated)
  - Published (toggle)
  
Rich Text Toolbar:
  - Bold, Italic
  - Link
  - H2, H3
  - Bullet List, Numbered List
  - Blockquote
  - Code
  
Actions:
  - Save Post
  - Preview
  - Delete
```

### Content Editor (Page Text)
```yaml
Tabs: Landing | About | Capabilities | Contact

Each section:
  - Simple textareas for editable blocks
  - Save Changes button
  - Visual preview (optional)
```

---

## 🖼️ REQUIRED ASSETS

### Upload Checklist

**Video:**
- `hero-bg.mp4` (desktop: 1920x1080, <5MB)
- `hero-bg-mobile.mp4` (mobile: 1080x1920, <3MB)
- `hero-poster.jpg` (1920x1080, fallback)

**Projects (4 featured):**
Each needs:
- 1 hero image (1920x1080, landscape)
- 1-5 gallery images (>1200px width)

**About:**
- `portrait.jpg` (1200x1600, portrait orientation)

**Blog Defaults:**
- `blog-default-1.jpg` to `blog-default-5.jpg` (1200x630)
- Black/white/red geometric patterns

**Icons & Favicons:**
- `favicon.ico` (32x32, 16x16)
- `apple-touch-icon.png` (180x180)
- `icon-192.png` (192x192)
- `icon-512.png` (512x512)
- `og-image.png` (1200x630, default social share)

**Favicon Design:**
- "ME" or "MER" initials
- Gold on charcoal OR charcoal on cream
- Minimal, recognizable

---

## 🔍 SEO & METADATA

### Meta Tags (All Pages)
```html
<title>Manuel Echavarria Romero | Designer of Systems</title>
<meta name="description" content="Product designer and strategist. 14 years solving complex problems through design. From hydroponic gardens to digital democracies." />
<meta name="keywords" content="product design, UX design, industrial designer, design strategy, portfolio" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://yourdomain.com/" />
<meta property="og:title" content="Manuel Echavarria Romero | Designer of Systems" />
<meta property="og:description" content="Product designer and strategist. 14 years solving complex problems through design." />
<meta property="og:image" content="https://yourdomain.com/og-image.png" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:title" content="Manuel Echavarria Romero | Designer of Systems" />
<meta property="twitter:image" content="https://yourdomain.com/og-image.png" />

<!-- Instagram/LinkedIn use OG tags -->
```

### Structured Data (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Manuel Echavarria Romero",
  "url": "https://yourdomain.com",
  "jobTitle": "Industrial Designer & Design Strategist",
  "sameAs": [
    "https://instagram.com/Manecharo",
    "https://linkedin.com/in/mer101"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Kuala Lumpur",
    "addressCountry": "MY"
  }
}
```

### Auto-Generated
- Sitemap.xml (all pages, projects, published posts)
- Robots.txt (allow all, disallow /update)

---

## 📱 MOBILE RESPONSIVENESS

### Breakpoints
```css
--mobile: 320px - 767px
--tablet: 768px - 1023px
--desktop: 1024px - 1439px
--large: 1440px+
```

### Mobile Adaptations
```yaml
Navigation:
  Desktop: Spatial menu (4 sides)
  Mobile: Hamburger → Full-screen overlay

Video Background:
  Desktop: 1920x1080 MP4
  Mobile: 1080x1920 MP4 (optimized, same video)

Images:
  Desktop: Grid layouts
  Mobile: Single column, swipeable galleries

Forms:
  - Touch targets: min 44px
  - Large inputs
  - Appropriate keyboards (tel, email)

Admin Panel:
  - Responsive tables (cards on mobile)
  - Simplified editing UI
  - Camera upload support
```

### Performance Targets
```yaml
Lighthouse Scores (Target: 90+):
  - Performance: 90+
  - Accessibility: 95+
  - Best Practices: 95+
  - SEO: 100

Core Web Vitals:
  - LCP: <2.5s
  - FID: <100ms
  - CLS: <0.1
```

---

## 🎭 ICON SYSTEM

### Library
Use **Lucide Icons** (clean, consistent)

### Required Icons
```yaml
Navigation:
  - Menu, X, ArrowLeft, ArrowRight, ArrowUp, ArrowDown, ExternalLink

Social:
  - Instagram, Linkedin, Mail, Phone, MapPin

Media:
  - Play, Pause, Volume, Image, Video, Music, FileText

Actions:
  - Plus, Edit, Trash, Save, Upload, Download, Share, Copy, Check, AlertCircle

Filters:
  - Filter, Tag, Calendar, Grid, List

Admin:
  - Eye, EyeOff, Settings, LogOut
```

### Styling
```css
.icon {
  width: 24px;
  height: 24px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}
```

---

## ⚡ PERFORMANCE OPTIMIZATION

### Images
- Next.js `<Image>` component (all images)
- Lazy load below fold
- WebP + JPEG fallback
- Responsive srcset
- Proper aspect ratios

### Code
- Dynamic imports for heavy components
- Route-based code splitting (automatic)
- Separate chunk for admin panel

### Caching
```javascript
// ISR (Incremental Static Regeneration)
export const revalidate = 3600; // 1 hour

// On-demand revalidation on Sanity updates
```

### Fonts
```html
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin />

<!-- font-display: swap -->
@font-face {
  font-family: 'Inter';
  font-display: swap;
}
```

---

## ♿ ACCESSIBILITY (WCAG 2.1 AA)

### Requirements
```yaml
Keyboard Navigation:
  - Tab through all interactive elements
  - Focus indicators: 2px gold outline
  - Skip to main content link
  - ESC closes modals

Color Contrast:
  - Text: 4.5:1 minimum
  - Interactive: 3:1 minimum

Screen Readers:
  - Semantic HTML (nav, main, article)
  - ARIA labels where needed
  - Alt text on ALL images
  - Form labels properly associated

Reduced Motion:
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
```

---

## 💾 SANITY CMS SCHEMAS

### Project
```javascript
{
  name: 'project',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', required: true },
    { name: 'slug', type: 'slug', required: true },
    { name: 'year', type: 'number' },
    { name: 'role', type: 'string' },
    { name: 'challenge', type: 'text' },
    { name: 'approach', type: 'text' },
    { name: 'results', type: 'array', of: [{ type: 'string' }] },
    { name: 'tags', type: 'array', of: [{ type: 'string' }], max: 5 },
    { name: 'images', type: 'array', of: [{ type: 'image' }], max: 5 },
    { name: 'featured', type: 'boolean', default: false },
    { name: 'order', type: 'number' }
  ]
}
```

### Post
```javascript
{
  name: 'post',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', required: true },
    { name: 'slug', type: 'slug', required: true },
    { name: 'postType', type: 'string', options: { list: ['writing', 'video', 'audio'] } },
    { name: 'featuredImage', type: 'image' },
    { name: 'content', type: 'array', of: [{ type: 'block' }] },
    { name: 'videoUrl', type: 'url' },
    { name: 'audioFile', type: 'file' },
    { name: 'tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'published', type: 'boolean', default: false },
    { name: 'publishedAt', type: 'datetime' }
  ]
}
```

---

## 🚀 DEPLOYMENT

### Environment Variables
```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# Auth
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=
ADMIN_PASSWORD_HASH=

# Vercel Blob
BLOB_READ_WRITE_TOKEN=

# Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=noreply@yourdomain.com

# Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=auto
```

### Vercel Setup
```json
{
  "buildCommand": "next build",
  "framework": "nextjs",
  "installCommand": "npm install"
}
```

### Git Workflow
```bash
main → production (auto-deploy)
develop → staging (optional)

# Feature branches
git checkout -b feature/spatial-nav
git commit -m "feat: add spatial navigation system"
git push origin feature/spatial-nav
# PR → Review → Merge
```

---

## ✅ PRE-LAUNCH CHECKLIST

### Functionality
- [ ] All navigation works (spatial transitions smooth)
- [ ] Forms submit successfully
- [ ] Email notifications received
- [ ] Admin authentication secure
- [ ] CRUD operations functional
- [ ] Image uploads optimized
- [ ] Video background plays all devices
- [ ] Easter egg triggers correctly

### Responsiveness
- [ ] iPhone Safari
- [ ] Android Chrome
- [ ] iPad/Tablet
- [ ] Desktop (1920px+)
- [ ] Ultra-wide monitors

### Performance
- [ ] Lighthouse 90+ all pages
- [ ] Images <500KB
- [ ] Video <5MB (desktop) <3MB (mobile)
- [ ] No console errors
- [ ] Fast spatial transitions

### SEO
- [ ] Meta tags complete
- [ ] Sitemap generated
- [ ] Robots.txt configured
- [ ] Structured data valid
- [ ] OG images present

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader tested
- [ ] Color contrast passes
- [ ] Focus indicators visible
- [ ] Alt text on all images

### Design
- [ ] Typography hierarchy perfect
- [ ] Color palette consistent
- [ ] Spacing rhythmic
- [ ] Animations smooth
- [ ] Details obsessed over

---

## 🎯 CRITICAL SUCCESS FACTORS

### 1. Design Excellence
Every pixel matters. This is a designer's portfolio. The site itself must be a case study in great design.

### 2. Spatial Navigation Perfection
The directional navigation is the signature feature. It must be:
- Buttery smooth (600ms, ease-in-out)
- Intuitive (direction matches mental model)
- Parallax-enhanced (depth perception)
- Never janky (60fps minimum)

### 3. Performance Obsession
Fast is a feature. Optimize ruthlessly:
- Images compressed
- Code split
- Fonts preloaded
- Video optimized
- Lazy load everything possible

### 4. Mobile Excellence
50%+ traffic will be mobile. Test on real devices. Touch targets large. Gestures intuitive.

### 5. Admin Simplicity
Manuel should be able to:
- Add a project in 5 minutes
- Write a blog post in 3 minutes
- Update text instantly
- Never read documentation

---

## 📐 DETAILS THAT MATTER

### Typography Rhythm
```css
/* Vertical rhythm: 8px base unit */
margin-bottom: 8px | 16px | 24px | 32px | 48px
line-height: 1.4 (body) | 1.2 (headings)
letter-spacing: 0 (body) | 0.02em (headings)
```

### Color Usage Rules
```yaml
Gold: CTAs, hover states, accents (sparingly)
Charcoal: Primary text, heavy elements
Cream: Backgrounds, soft sections
Terracotta/Sage: Occasional visual interest
White: Maximum contrast moments
```

### Whitespace Philosophy
```
More is more.
Give everything room to breathe.
Uncomfortable amounts of whitespace = comfortable reading.
```

### Animation Choreography
```
Fast: UI responses (200ms)
Medium: Page transitions (300-400ms)
Slow: Spatial navigation (600ms)
Never: Anything >1s without user control
```

### Image Treatment
```
Sharp, well-lit, professionally composed.
Full-bleed where it makes sense.
Proper aspect ratios (no squishing).
Context (show products being used, not just floating).
```

---

## 🛠️ TECHNICAL NOTES FOR BUILDER

### Code Quality
- TypeScript everywhere (strict mode)
- ESLint + Prettier configured
- Consistent naming (camelCase components, kebab-case files)
- Comments only where necessary
- Clean, readable, maintainable

### Component Architecture
```
components/
├── layout/
│   ├── Navigation.tsx (Spatial menu system)
│   ├── Footer.tsx (Easter egg here)
│   └── PageTransition.tsx (Spatial animations)
├── ui/
│   ├── Button.tsx
│   ├── Input.tsx
│   └── ... (reusable primitives)
├── sections/
│   ├── Hero.tsx
│   ├── ProjectGrid.tsx
│   └── ... (page sections)
└── admin/
    └── ... (admin panel components)
```

### State Management
- Use React Context for global state (minimal)
- Server components by default
- Client components only when needed
- No unnecessary complexity

### Testing Strategy
- Manual testing on real devices
- Lighthouse CI in GitHub Actions
- Visual regression testing (optional)
- E2E for critical paths (optional)

---

## 🎬 FINAL WORDS

**This is not just a portfolio. This is a statement.**

Every interaction should feel intentional.
Every transition should feel physical.
Every detail should feel considered.

Manuel is a designer who solves complex problems through elegant systems. The website must embody this philosophy.

**Build it like you're shipping to a museum.**

---

## 📦 DELIVERABLES

1. ✅ Codebase in github.com/Manecharo/Manecharo.git
2. ✅ Deployed to Vercel (production URL)
3. ✅ Environment variables documented
4. ✅ Admin credentials (secure handoff)
5. ✅ 4 projects populated with content
6. ✅ All required images uploaded
7. ✅ README.md with setup instructions
8. ✅ Video walkthrough of admin panel (2-3 min)

---

**Build exceptional. Design obsessed. Performance perfect.**
