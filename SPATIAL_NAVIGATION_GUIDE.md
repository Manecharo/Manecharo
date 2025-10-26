# SPATIAL NAVIGATION SYSTEM
## Visual Reference & Implementation Guide

---

## 🗺️ NAVIGATION MAP

```
                    ABOUT
                   (Menu 2)
                      ↑
                      |
                      |
    WORK  ←———————— HOME ————————→  CONTACT
  (Menu 1)        (Center)         (Menu 3)
                      |
                      |
                      ↓
                 CAPABILITIES
                  (Menu 4)
```

---

## 🎯 DIRECTIONAL TRANSITIONS

### FROM HOME (CENTER) TO ANY PAGE

```javascript
// Click "WORK" (Left/Menu 1)
Animation: {
  Home slides RIGHT (exits stage right)
  Work slides in from LEFT (enters stage left)
  Duration: 600ms
  Easing: ease-in-out
  Parallax: Background elements lag 200ms
}

// Click "ABOUT" (Top/Menu 2)  
Animation: {
  Home slides DOWN (exits stage bottom)
  About slides in from TOP (enters stage top)
  Duration: 600ms
  Easing: ease-in-out
}

// Click "CONTACT" (Right/Menu 3)
Animation: {
  Home slides LEFT (exits stage left)
  Contact slides in from RIGHT (enters stage right)
  Duration: 600ms
  Easing: ease-in-out
}

// Click "CAPABILITIES" (Bottom/Menu 4)
Animation: {
  Home slides UP (exits stage top)
  Capabilities slides in from BOTTOM (enters stage bottom)
  Duration: 600ms
  Easing: ease-in-out
}
```

---

## 🎬 BETWEEN NON-HOME PAGES

### Example: Work → About

```javascript
// From Work (Left position) to About (Top position)
Mental Model: "Navigate up and to the right"

Animation: {
  Work slides DOWN and RIGHT diagonally
  About slides in from TOP
  Duration: 600ms
  Result: User feels they moved from lower-left to upper-center
}
```

### Navigation Logic

```javascript
const getTransition = (from, to) => {
  const positions = {
    '/': 'center',
    '/work': 'left',
    '/about': 'top',
    '/contact': 'right',
    '/capabilities': 'bottom'
  };
  
  const transitions = {
    'center-left': { exit: 'toRight', enter: 'fromLeft' },
    'center-top': { exit: 'toBottom', enter: 'fromTop' },
    'center-right': { exit: 'toLeft', enter: 'fromRight' },
    'center-bottom': { exit: 'toTop', enter: 'fromBottom' },
    
    'left-center': { exit: 'toLeft', enter: 'fromRight' },
    'left-top': { exit: 'toBottom', enter: 'fromTop' },
    'left-right': { exit: 'toLeft', enter: 'fromRight' },
    'left-bottom': { exit: 'toTop', enter: 'fromBottom' },
    
    // ... etc for all combinations
  };
  
  const key = `${positions[from]}-${positions[to]}`;
  return transitions[key];
};
```

---

## 💫 PARALLAX DEPTH

### Three-Layer System

```javascript
Layer 1 (Background):
  - Video/Image backgrounds
  - Decorative elements
  - Speed: 0.5x (moves half as fast)
  - Creates depth perception

Layer 2 (Content):
  - Main text, images, forms
  - Speed: 1x (normal speed)
  - Primary focus

Layer 3 (Foreground):
  - Navigation menu
  - Fixed CTAs
  - Speed: 0x (stays fixed) OR 1.2x (moves faster)
```

### Implementation

```css
.background-layer {
  transform: translateX(calc(var(--scroll) * 0.5));
  transition: transform 600ms ease-in-out;
}

.content-layer {
  transform: translateX(var(--scroll));
  transition: transform 600ms ease-in-out;
}

.nav-menu {
  position: fixed; /* Stays in place */
  /* OR */
  transform: translateX(calc(var(--scroll) * 1.2)); /* Moves faster */
}
```

---

## 🎨 VISUAL FEEDBACK

### Menu State Indicators

```css
/* Current Page */
.nav-menu[data-current="true"] {
  color: var(--gold);
  font-weight: 600;
  
  /* Subtle glow */
  text-shadow: 0 0 20px rgba(230, 179, 37, 0.3);
  
  /* Indicator line */
  &::after {
    content: '';
    display: block;
    width: 20px;
    height: 2px;
    background: var(--gold);
    margin-top: 4px;
  }
}

/* Hover State */
.nav-menu:hover {
  color: var(--gold);
  transform: scale(1.05);
  cursor: pointer;
}

/* Disabled (on same page) */
.nav-menu[data-disabled="true"] {
  opacity: 0.3;
  cursor: not-allowed;
}
```

---

## 📱 MOBILE ADAPTATION

### Touch Gestures (Optional Enhancement)

```javascript
// Swipe gestures map to navigation
Swipe LEFT → Navigate to Contact (right page)
Swipe RIGHT → Navigate to Work (left page)
Swipe UP → Navigate to Capabilities (bottom page)
Swipe DOWN → Navigate to About (top page)

// Implementation
const handleSwipe = (direction) => {
  const swipeMap = {
    'left': '/contact',
    'right': '/work',
    'up': '/capabilities',
    'down': '/about'
  };
  
  router.push(swipeMap[direction]);
};
```

### Hamburger Menu (Mobile)

```html
<!-- Mobile: Traditional menu replaces spatial nav -->
<button class="hamburger">
  <span></span>
  <span></span>
  <span></span>
</button>

<nav class="mobile-menu">
  <a href="/">Home</a>
  <a href="/work">Work</a>
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
  <a href="/capabilities">Capabilities</a>
</nav>

<!-- But: Spatial transitions still apply on navigation -->
```

---

## 🔧 TECHNICAL IMPLEMENTATION

### Framer Motion Example

```tsx
// app/layout.tsx
import { AnimatePresence } from 'framer-motion';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Navigation /> {/* Spatial menu */}
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </body>
    </html>
  );
}

// components/PageTransition.tsx
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const variants = {
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

export function PageTransition({ children }) {
  const pathname = usePathname();
  const direction = getDirection(pathname);
  
  return (
    <motion.div
      key={pathname}
      initial={direction.enter}
      animate="center"
      exit={direction.exit}
      variants={variants}
      transition={{ 
        duration: 0.6, 
        ease: [0.43, 0.13, 0.23, 0.96] // Custom easing
      }}
    >
      {children}
    </motion.div>
  );
}
```

---

## 🎭 ADVANCED EFFECTS

### Blur During Transition (Optional)

```css
/* Add subtle blur during motion */
@keyframes blurTransition {
  0%, 100% { filter: blur(0px); }
  50% { filter: blur(2px); }
}

.page-transition {
  animation: blurTransition 600ms ease-in-out;
}
```

### Scale Effect (Optional)

```javascript
// Exiting page scales down slightly
exit: {
  x: '-100%',
  scale: 0.95,
  opacity: 0
}

// Entering page scales up from slightly smaller
initial: {
  x: '100%',
  scale: 0.95,
  opacity: 0
}
```

---

## 🎯 UX CONSIDERATIONS

### Loading States

```javascript
// If page takes >200ms to load
Show skeleton screen with spatial transition
Never leave user staring at blank screen

// Implementation
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => setIsLoading(false), 200);
  return () => clearTimeout(timer);
}, [pathname]);
```

### Accessibility

```javascript
// Respect prefers-reduced-motion
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

const transitionDuration = prefersReducedMotion ? 0 : 600;

// Also: Provide skip navigation link
<a href="#main-content" class="skip-link">
  Skip to main content
</a>
```

### Keyboard Navigation

```javascript
// Arrow keys navigate spatially
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT') return; // Don't interfere with forms
  
  const keyMap = {
    'ArrowLeft': '/work',
    'ArrowUp': '/about',
    'ArrowRight': '/contact',
    'ArrowDown': '/capabilities',
    'Home': '/'
  };
  
  if (keyMap[e.key]) {
    e.preventDefault();
    router.push(keyMap[e.key]);
  }
});
```

---

## 🎨 DESIGN REFINEMENTS

### Menu Typography

```css
.nav-menu {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  
  /* Subtle text stroke for definition */
  -webkit-text-stroke: 0.3px currentColor;
}
```

### Position Fine-Tuning

```css
/* Desktop precise positioning */
.nav-left {
  left: 3vw;
  top: 50vh;
  transform: rotate(-90deg) translateX(-50%);
  transform-origin: left center;
}

.nav-top {
  top: 3vh;
  left: 50vw;
  transform: translateX(-50%);
}

.nav-right {
  right: 3vw;
  top: 50vh;
  transform: rotate(90deg) translateX(50%);
  transform-origin: right center;
}

.nav-bottom {
  bottom: 3vh;
  left: 50vw;
  transform: translateX(-50%);
}

/* Adjust for different screen sizes */
@media (max-width: 1024px) {
  .nav-left, .nav-right {
    top: calc(50vh - 60px); /* Account for mobile address bar */
  }
}
```

---

## 💡 PRO TIPS

### 1. Pre-load Adjacent Pages
```javascript
// Prefetch pages user is likely to navigate to
<Link href="/work" prefetch={true}>Work</Link>

// Or: Prefetch all navigation targets on mount
useEffect(() => {
  router.prefetch('/work');
  router.prefetch('/about');
  router.prefetch('/contact');
  router.prefetch('/capabilities');
}, []);
```

### 2. Sound Design (Optional)
```javascript
// Subtle whoosh sound on navigation (very quiet)
const playTransitionSound = () => {
  const audio = new Audio('/sounds/whoosh.mp3');
  audio.volume = 0.1;
  audio.play();
};
```

### 3. Cursor Changes
```css
/* Show directional cursor on menu hover */
.nav-left:hover { cursor: w-resize; }
.nav-top:hover { cursor: n-resize; }
.nav-right:hover { cursor: e-resize; }
.nav-bottom:hover { cursor: s-resize; }
```

### 4. Visual Continuity
```javascript
// Shared element transitions (advanced)
// If multiple pages share an element (like logo),
// animate it staying in place while page content moves

<motion.div layoutId="logo">
  <Logo />
</motion.div>
```

---

## 🚨 COMMON PITFALLS TO AVOID

❌ **Don't**: Make transitions longer than 600ms (feels sluggish)
✅ **Do**: Keep it snappy (600ms max, 400-500ms ideal)

❌ **Don't**: Use linear easing (feels robotic)
✅ **Do**: Use ease-in-out or custom cubic-bezier

❌ **Don't**: Animate too many properties (causes jank)
✅ **Do**: Stick to transform and opacity (GPU-accelerated)

❌ **Don't**: Forget mobile optimization
✅ **Do**: Test on real devices with actual fingers

❌ **Don't**: Sacrifice accessibility for aesthetics  
✅ **Do**: Provide alternatives for users with motion sensitivity

---

## 🎬 FINAL CHECKLIST

- [ ] All 4 directional navigations work smoothly
- [ ] Transitions feel physical and intentional
- [ ] Current page is clearly indicated
- [ ] Hover states provide clear affordance
- [ ] Mobile has appropriate fallback (hamburger + spatial transitions)
- [ ] Keyboard navigation works (arrow keys)
- [ ] Reduced motion preference respected
- [ ] Performance is smooth (60fps)
- [ ] Loading states handled gracefully
- [ ] Works on all major browsers

---

**The spatial navigation is the signature of this portfolio. Get it perfect.**

