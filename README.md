# Google Material Symbols Helper

> Search, preview, autocomplete, copy and insert Google Material Symbols without leaving Visual Studio Code.

**Google Material Symbols Helper** is developed and maintained by **[Angelito Systems S.A.C.](https://github.com/angelitosystems)**, a software and AI solutions company that builds apps, business systems, web platforms, automation workflows and AI-powered tools for entrepreneurs, startups, SMEs and growing companies.

- **Project repository:** <https://github.com/angelitosystems/Google-Material-Symbols-Helper>
- **Official Google Material Symbols library:** <https://fonts.google.com/icons>
- **Official Google Material Symbols documentation:** <https://developers.google.com/fonts/docs/material_symbols>
- **Official Google Material Design Icons repository:** <https://github.com/google/material-design-icons>

---

## About Angelito Systems S.A.C.

**Angelito Systems S.A.C.** creates practical digital solutions for entrepreneurs, businesses and organizations that want to improve, automate and scale their operations.

We design and build:

- Mobile apps.
- Web platforms.
- Business systems.
- Admin dashboards.
- Automation tools.
- AI-assisted workflows.
- Custom software for real-world business needs.

This extension is part of our developer productivity toolkit: small, useful tools created to speed up everyday development workflows and help teams build faster with better consistency.

---

## Features

### Sidebar — always-on icon browser

Open the **Google Symbols** panel in the Activity Bar to browse, filter and insert icons at any time. The sidebar loads thousands of Material Symbols with instant search, style controls, Fill and Weight controls, and a one-click **Insert CDN** button that injects the correct `<link>` or `@import` into the active file.

Supported styles:

- Outlined
- Rounded
- Sharp

### Full-screen gallery

Run **Google Material Symbols: Open Gallery** from the Command Palette to open a large, searchable icon grid. This is useful when you want to explore icon names visually before inserting one into your project.

### Intelligent autocomplete

Use the `ms-` prefix to quickly insert icons with IntelliSense.

Examples:

```txt
ms-home
ms-search
ms-dashboard
ms-settings
ms-shopping_cart
```

The extension inserts framework-aware snippets in supported files.

HTML, Angular, Vue, Blade and PHP:

```html
<span class="material-symbols-outlined" aria-hidden="true">home</span>
```

React, JSX and TSX:

```tsx
<span className="material-symbols-outlined" aria-hidden="true">home</span>
```

With Tailwind support enabled:

```html
<span class="material-symbols-outlined text-[22px] text-slate-600 dark:text-slate-300" aria-hidden="true">home</span>
```

### Live editor previews

- **Hover Preview** — hover any Material Symbol icon name in your code to see a visual preview, the icon name, style and copy-ready HTML/React snippets.
- **Gutter Icons** — small icon previews can appear beside line numbers so you can scan your markup faster.

### One-click CDN import

Right-click inside an HTML, CSS, JSX, Vue or PHP file and choose:

```txt
Google Material Symbols: Import CDN by Style
```

The extension can:

- Detect the current framework or file type.
- Insert a `<link>` tag in HTML, Angular, Vue, Blade and PHP files.
- Insert a full `@import` + CSS class block in CSS, SCSS and Less files.
- Offer clipboard copy or CSS import options in React files.
- Support optimized imports using `icon_names`.
- Detect duplicate imports before inserting again.

### Insert from anywhere

Every icon card exposes quick actions:

| Action | Result |
|---|---|
| **Insert** | Inserts the `<span>` snippet at your cursor. |
| **HTML** | Copies a ready-to-paste HTML snippet. |
| **React** | Copies a JSX snippet with `className`. |
| **Name** | Copies the raw icon name. |

---

## Installation

Search **Google Material Symbols Helper** in the VS Code Extension Marketplace and click **Install**, or run:

```bash
ext install angelitosystems.google-material-symbols-helper
```

---

## Usage

### Sidebar

1. Click the **Google Symbols** icon in the Activity Bar.
2. Use the search box to find an icon by name or keyword.
3. Adjust **Style**, **Fill** and **Weight** to preview variations.
4. Click **Insert** to place the icon at your cursor.
5. Use **Insert CDN** to add the Google Fonts import to the active file.

### Gallery

Open the Command Palette:

```txt
Ctrl + Shift + P
```

Run:

```txt
Google Material Symbols: Open Gallery
```

### Autocomplete

In any supported file, type:

```txt
ms-home
```

Then select the suggestion from IntelliSense. If suggestions do not appear automatically, press:

```txt
Ctrl + Space
```

### Context menu CDN import

Right-click in the editor and run:

```txt
Google Material Symbols: Import CDN by Style
```

Choose the style: **Outlined**, **Rounded** or **Sharp**.

---

## Settings

| Setting | Default | Description |
|---|---:|---|
| `googleMaterialSymbols.defaultStyle` | `outlined` | Default icon style: `outlined`, `rounded`, or `sharp`. |
| `googleMaterialSymbols.defaultFill` | `0` | FILL axis value: `0` or `1`. |
| `googleMaterialSymbols.defaultWeight` | `400` | Weight axis: `100` – `700`. |
| `googleMaterialSymbols.defaultGrade` | `0` | Grade axis: `-25`, `0`, or `200`. |
| `googleMaterialSymbols.defaultOpticalSize` | `24` | Optical size axis: `20`, `24`, `40`, or `48`. |
| `googleMaterialSymbols.useTailwindClasses` | `false` | Append Tailwind utility classes when inserting icons. |
| `googleMaterialSymbols.insertAriaHidden` | `true` | Add `aria-hidden="true"` to inserted spans. |
| `googleMaterialSymbols.enableHoverPreview` | `true` | Show icon preview on hover. |
| `googleMaterialSymbols.enableGutterPreview` | `true` | Show icon thumbnails in the editor gutter. |
| `googleMaterialSymbols.maxGutterIcons` | `200` | Maximum gutter icons per file for performance. |

Example `settings.json`:

```json
{
  "googleMaterialSymbols.defaultStyle": "rounded",
  "googleMaterialSymbols.defaultFill": 1,
  "googleMaterialSymbols.defaultWeight": 300,
  "googleMaterialSymbols.useTailwindClasses": true,
  "googleMaterialSymbols.enableHoverPreview": true,
  "googleMaterialSymbols.enableGutterPreview": true
}
```

---

## Supported languages

| File type | Support |
|---|---|
| `.html` | Yes |
| `.component.html` | Yes |
| `.jsx` | Yes |
| `.tsx` | Yes |
| `.vue` | Yes |
| `.blade.php` | Yes |
| `.php` | Yes |
| `.css` | Yes |
| `.scss` | Yes |
| `.less` | Yes |

---

## Commands

| Command | Description |
|---|---|
| `Google Material Symbols: Open Gallery` | Open the full-screen icon gallery. |
| `Google Material Symbols: Insert Icon` | Search and insert an icon via Quick Pick. |
| `Google Material Symbols: Import CDN by Style` | Insert the Google Fonts CDN for the selected style. |
| `Google Material Symbols: Insert Import` | Insert a CSS `@import` at the cursor. |
| `Google Material Symbols: Insert Optimized Import` | Insert an optimized import with specific `icon_names`. |
| `Google Material Symbols: Refresh Icon Previews` | Refresh editor previews and gutter icons. |

---

## Development

Install dependencies:

```bash
npm install
```

Generate icon data:

```bash
npm run generate:icons
```

Compile:

```bash
npm run compile
```

Run locally:

```txt
Press F5 in VS Code
```

Package as VSIX:

```bash
npm run package
```

---

## Package metadata recommendation

For Marketplace and GitHub visibility, your `package.json` should include metadata similar to this:

```json
{
  "publisher": "angelitosystems",
  "author": {
    "name": "Angelito Systems S.A.C.",
    "url": "https://github.com/angelitosystems"
  },
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/angelitosystems/Google-Material-Symbols-Helper.git"
  },
  "bugs": {
    "url": "https://github.com/angelitosystems/Google-Material-Symbols-Helper/issues"
  },
  "homepage": "https://github.com/angelitosystems/Google-Material-Symbols-Helper#readme"
}
```

---

## Brand, ownership and attribution

**Google Material Symbols Helper** is an open-source Visual Studio Code extension developed and maintained by **Angelito Systems S.A.C.**

**Angelito Systems S.A.C.** provides software, mobile apps, business systems, automation and AI-powered digital solutions for entrepreneurs, companies and organizations.

### Google Material Symbols attribution

Material Symbols and Material Design Icons are created by **Google**.

Useful official links:

- Google Material Symbols library: <https://fonts.google.com/icons>
- Google Material Symbols documentation: <https://developers.google.com/fonts/docs/material_symbols>
- Google Material Design Icons repository: <https://github.com/google/material-design-icons>
- Google Material Design Icons license: <https://github.com/google/material-design-icons/blob/master/LICENSE>

Google Material Symbols / Material Design Icons are made available by Google under the **Apache License 2.0**. This extension only helps developers search, preview and insert those icons inside Visual Studio Code.

This extension is **not** an official Google product. It is not affiliated with, sponsored by, endorsed by or maintained by Google.

---

## License

Extension source code: **MIT License** © 2026 **Angelito Systems S.A.C.**

Google Material Symbols / Material Design Icons: created by **Google** and distributed under their respective Google / Apache License 2.0 terms.

See [`LICENSE`](./LICENSE) and [`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md) for details.
