# ==============================================================================
# Script to append Known Issues & Safeguards directly into README.md
# Run from: E:\Videos\web\Anjuman Web Project\Anjuman
# ==============================================================================

$readmePath = "README.md"

$docsContent = @'

---

## Known Issues, Troubleshooting & Safeguards

### 1. Unstyled Site / Plain HTML Layout (BaseLayout Styling Loss)

* **Symptom:** The site renders as bare, unstyled HTML locally (`http://127.0.0.1:4321/`) or on Cloudflare Pages (`https://anjuman.pages.dev/`), with no Tailwind styles or custom fonts loaded.
* **Root Causes:**
  1. `src/styles/global.css` was removed from `src/layouts/BaseLayout.astro`.
  2. `applyBaseStyles: false` was set in `astro.config.mjs`, stopping Astro from auto-injecting Tailwind core layers.
* **Permanent Fixes Implemented:**
  1. **Vite Plugin Safeguard (`astro.config.mjs`):** `injectGlobalCssPlugin` checks `BaseLayout.astro` at build time and automatically prepends `import '../styles/global.css';` if missing.
  2. **Enabled Base Styles:** Set `applyBaseStyles: true` in `tailwind()` inside `astro.config.mjs`.
  3. **Layout Import:** Retained explicit `import '../styles/global.css';` at line 2 of `src/layouts/BaseLayout.astro`.

---

### 2. Cloudflare Pages Deploy Error (`dist\dist`)

* **Symptom:** Wrangler fails with `ENOENT: no such file or directory, scandir '.../dist/dist'`.
* **Root Cause:** Running `npx wrangler pages deploy dist` while the terminal prompt is already located inside the `dist` directory.
* **Fix / Standard Deploy Commands:**
  * From project root (`Anjuman/`):
    ```bash
    npx wrangler pages deploy dist --project-name=anjuman
    ```
  * From inside `dist/`:
    ```bash
    npx wrangler pages deploy . --project-name=anjuman
    ```
  * Absolute path fallback:
    ```bash
    npx wrangler pages deploy "E:\Videos\web\Anjuman Web Project\Anjuman\dist" --project-name=anjuman
    ```

---

### 3. Missing Hero Carousel Assets (404s)

* **Symptom:** Dev console throws 404 errors for `/images/hero/*.webp`.
* **Required Files:** Ensure the following images exist in `public/images/hero/`:
  * `hero-4.webp`
  * `hero-5.webp`
  * `hero-6.webp`
  * `campus-view.webp`
* **Note:** Asset filenames are strictly case-sensitive on Cloudflare Pages.
'@

# Ensure README.md exists, create if missing, or append
if (-not (Test-Path $readmePath)) {
    Set-Content -Path $readmePath -Value "# Anjuman Website Project`n" -Encoding utf8
}

$currentReadme = Get-Content -Path $readmePath -Raw

if ($currentReadme -notmatch "Known Issues, Troubleshooting & Safeguards") {
    Add-Content -Path $readmePath -Value $docsContent -Encoding utf8
    Write-Host "Successfully appended troubleshooting section to README.md." -ForegroundColor Green
} else {
    Write-Host "Troubleshooting section already exists in README.md." -ForegroundColor Yellow
}
### 4. Duplicate Page Rendering Below Footer (Component Corruption)

* **Symptom:** Content from another page (e.g., Newsletter/About cards) renders directly below the homepage footer.
* **Root Cause:** `src/components/FloatingSocial.astro` was accidentally overwritten with full-page markup containing `<BaseLayout>` and `<Footer>`.
* **Fix:** Keep `FloatingSocial.astro` strictly scoped to the `<aside>` floating widget without any layouts or headers.
