# Quick Reference Guide

## Project Overview

Lando Norris tribute website with GSAP scroll animations

---

## File Structure

```
📁 javohirsalohiddinov/
├── 📄 index.html              ← Main HTML file
├── 📄 README.md               ← Project documentation
├── 📄 OPTIMIZATION_REPORT.md  ← Detailed changes log
├── 📄 .gitignore              ← Git ignore rules
│
├── 📁 css/
│   └── 📄 main.css            ← All styles (organized by sections)
│
├── 📁 js/
│   ├── 📄 main.js             ← Main JavaScript (optimized & commented)
│   └── 📁 gsap-public/        ← GSAP animation library
│
├── 📁 assets/
│   ├── 📁 svg/                ← SVG files
│   │   └── svg-path.svg
│   └── 📁 images/             ← Image files
│
├── 📁 fonts/                  ← Custom fonts (Brier)
└── 📁 media/                  ← Media files
```

---

## Key Sections in Code

### HTML (index.html)

```
├── <head>        → Meta tags, fonts, CSS
├── <nav>         → Fixed navigation bar
└── <main>
    ├── <section class="hero">          → Hero with SVG signature
    ├── <section class="scrolling-text"> → Animated text loops
    └── <section class="demo">          → Demo section
```

### CSS (css/main.css)

```
1. CSS Reset & Base Styles
2. Typography & Fonts
3. Navigation Styles
4. Navigation Buttons
5. Hero Section
6. Scrolling Text Section
7. Demo Section
8. Media Queries (Responsive)
```

### JavaScript (js/main.js)

```
1. GSAP Plugin Registration
2. Scroll Smoother Setup
3. Hero Section Animations
4. SVG Signature Animation
5. Scrolling Text Animations
6. Navigation Animations
7. Store Button Hover Animation
8. Menu Button SVG Animation
```

---

## Class Names Reference

### Navigation

- `.nav` - Fixed navigation container
- `.navlink` - Logo/name link
- `.navj` - First name (Javohir)
- `.navs` - Last name (Salohiddinov)
- `.buttons` - Button container
- `.navbutton` - Store button
- `.navmenu` - Menu button
- `.menuPath` - SVG in menu button

### Sections

- `.hero` - Main hero section
- `.sign` - SVG signature
- `.scrolling-text` - Text animation container
- `.text-loop-right` - Right scrolling text
- `.text-loop-left` - Left scrolling text
- `.demo` - Demo section

### Button Elements

- `.store` - Store icon
- `.storeText` - Store button text
- `.hoverTextTop` - Top hover text
- `.hoverTextBottom` - Bottom hover text
- `.e`, `.f` - Design elements

---

## GSAP Animations Summary

### 1. Hero Scroll Animation

```javascript
gsap.to(".hero", {
  scrollTrigger: { trigger: ".hero", start: "top top", scrub: true, pin: true },
  x: "70vh",
  y: "220vh",
  width: "38%",
  height: "45vh",
});
```

### 2. SVG Signature Drawing

- Uses DrawSVGPlugin
- Splits paths and draws on scroll
- Pinned to center during animation

### 3. Text Loops

- Infinite horizontal scrolling
- Right: moves right (93.5%)
- Left: moves left (-1600%)
- Duration: 500s each

### 4. Navigation Transitions

- Changes color and size on scroll
- `.navj`: Dark → Light gray
- `.navs`: Dark → Light beige
- Buttons shrink and change style

### 5. Store Button Hover

- Uses SplitText plugin
- Each character animates up on hover
- Smooth stagger effect (0.03s)

### 6. Menu Button States

- Toggle between Home and Menu
- SVG paths animate with DrawSVGPlugin
- Hover effects for both states

---

## CSS Custom Properties

### Colors

```css
--primary-green: #D1FE07
--dark-green: rgb(7, 43, 0)
--text-dark: #2D3025
--gray: #737373
--light-gray: #bcbcbcff
--beige: #e1e1deff
--button-bg: #F3F3EB
```

### Fonts

```css
--font-display: 'Brier-Regular', serif
--font-body: "Mona Sans", sans-serif
```

---

## Responsive Breakpoints

```css
/* Tablet */
@media (max-width: 1024px) {
  /* Font sizes reduce */
  /* Button widths adjust */
}

/* Mobile Landscape */
@media (max-width: 768px) {
  /* Nav adjusts to 96% width */
  /* Text sizes scale down */
  /* Buttons expand to 30% */
}

/* Mobile Portrait */
@media (max-width: 480px) {
  /* Smallest text sizes */
  /* Buttons expand to 40% */
  /* Optimal for small screens */
}
```

---

## Development Commands

### Start Local Server

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

### View in Browser

```
http://localhost:8000
```

---

## Troubleshooting

### Animations not working?

1. Check console for errors
2. Verify GSAP files are loaded
3. Ensure selectors match HTML classes
4. Check ScrollTrigger is registered

### Fonts not loading?

1. Verify font files exist in `/fonts/`
2. Check CSS `@font-face` path
3. Try clearing browser cache

### SVG not drawing?

1. Ensure DrawSVGPlugin is loaded (GSAP premium)
2. Check path has `id="house"`
3. Verify signature splitting function runs

### Responsive issues?

1. Check viewport meta tag in HTML
2. Verify media queries in CSS
3. Test on real devices, not just browser resize

---

## Browser Testing Checklist

- [ ] Chrome (Desktop & Mobile)
- [ ] Firefox
- [ ] Safari (macOS & iOS)
- [ ] Edge
- [ ] Opera

### Test Points

- [ ] Smooth scrolling works
- [ ] SVG animates on scroll
- [ ] Text loops continuously
- [ ] Navigation changes on scroll
- [ ] Hover effects work
- [ ] Menu toggle works
- [ ] Responsive on mobile
- [ ] No console errors

---

## Performance Tips

1. **Images**: Optimize and use WebP format
2. **Fonts**: Preload critical fonts
3. **GSAP**: Using minified versions ✅
4. **CSS**: Already organized and efficient ✅
5. **JS**: Code is optimized ✅

---

## Useful Links

- [GSAP Docs](https://greensock.com/docs/)
- [ScrollTrigger](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [DrawSVG](https://greensock.com/docs/v3/Plugins/DrawSVGPlugin)
- [SplitText](https://greensock.com/docs/v3/Plugins/SplitText)

---

## Quick Edits

### Change Colors

Edit `css/main.css` - Colors are clearly labeled in sections

### Change Text

Edit `index.html` - Text content is in semantic sections

### Adjust Animations

Edit `js/main.js` - Animations are organized by section with comments

### Add New Section

1. Add HTML in `index.html` <main>
2. Style in `css/main.css` (add new section comment)
3. Animate in `js/main.js` (add to relevant section)

---

**Need help?** Check OPTIMIZATION_REPORT.md for detailed changes
**Getting started?** See README.md for full documentation

---

_Last updated: December 12, 2025_
