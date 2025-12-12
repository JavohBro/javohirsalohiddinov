# Code of Conduct

## 🎯 Coding Standards & Contribution Guidelines

---

## 🔧 Coding Standards

### HTML

```html
<!-- ✅ Good: Semantic and accessible -->
<nav role="navigation" aria-label="Main navigation">
  <button aria-label="Menu">Menu</button>
</nav>

<!-- ❌ Avoid: Non-semantic -->
<div class="nav">
  <div class="btn">Menu</div>
</div>
```

### CSS

```css
/* ✅ Good: Organized with comments */
/* ======================
   Navigation Styles
   ====================== */
.nav {
  position: fixed;
  z-index: 100;
}

/* ❌ Avoid: Unorganized, no context */
.nav {
  position: fixed;
  z-index: 100;
}
```

### JavaScript

```javascript
// ✅ Good: Clear, commented, const where appropriate
const navButton = document.querySelector(".nav-button");

/**
 * Toggles the navigation menu
 */
function toggleMenu() {
  navButton.classList.toggle("active");
}

// ❌ Avoid: Unclear, no comments, var
var nb = document.querySelector(".nav-button");
function tm() {
  nb.classList.toggle("active");
}
```

---

## 📝 Contribution Guidelines

### Before You Start:

1. Read the README.md
2. Check existing issues/PRs
3. Discuss major changes first
4. Set up your development environment

### Making Changes:

1. **Create a branch** from `main` or `refactor-code`

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the coding standards

3. **Test thoroughly**

   - Test on different browsers
   - Test responsive design
   - Check console for errors

4. **Commit with clear messages**

   ```bash
   git commit -m "Add: New scroll animation for hero section"
   ```

5. **Push and create a Pull Request**

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Describe your PR clearly**
   - What did you change?
   - Why did you change it?
   - How to test it?

---

## 📊 Quality Standards

### Pull Request Checklist:

Before submitting, ensure:

- [ ] Code follows project style guide
- [ ] Comments added for complex logic
- [ ] No console.log() or debug code
- [ ] Tested in multiple browsers
- [ ] Responsive design maintained
- [ ] No new errors in console
- [ ] Documentation updated (if needed)
- [ ] Commit messages are clear

---

_Last Updated: December 12, 2025_
