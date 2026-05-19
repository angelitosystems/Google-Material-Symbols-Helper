# Changelog

All notable changes to **Google Material Symbols Helper** are documented here.

This project is developed and maintained by **Angelito Systems S.A.C.**, a software and AI solutions company focused on digital solutions for entrepreneurs, businesses and organizations through apps, systems, automation and AI-powered tools.

This project follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and [Semantic Versioning](https://semver.org/).

---

## [1.3.2] - 2026-05-19

### Changed
- Improved README wording and project positioning in English.
- Added clearer ownership information for **Angelito Systems S.A.C.**.
- Added company description: apps, business systems, web platforms, automation workflows and AI-powered tools for entrepreneurs, startups, SMEs and companies.
- Added official project repository link for **Google Material Symbols Helper**.
- Added recommended `package.json` metadata for Marketplace and GitHub publishing.

### Added
- Added explicit attribution for **Google** as the creator of Material Symbols / Material Design Icons.
- Added official Google links for the Material Symbols library, documentation, repository and license.
- Added a `THIRD_PARTY_NOTICES.md` file for Google Material Symbols / Material Design Icons attribution and licensing notes.

---

## [1.3.1] - 2026-05-19

### Changed
- Updated project ownership and branding to **Angelito Systems S.A.C.**.
- Updated README with company information, product positioning and AI-powered solutions description.
- Updated license copyright holder to **Angelito Systems S.A.C.**.
- Added clearer attribution explaining that Google Material Symbols belongs to Google and that this extension is not an official Google product.

---

## [1.3.0] - 2026-05-19

### Fixed
- **Eliminated duplicate scroll** in the Sidebar. `body` no longer generates its own scrollbar; the icon grid is the only scrollable element, eliminating the double-scrollbar UX bug.
- **Single CDN request** — both the Sidebar and the Gallery now load all three font variants (Outlined, Rounded, Sharp) in one `<link>` tag instead of re-requesting each time the style changed.

### Added
- **Insert CDN button** directly in the Sidebar toolbar — one click injects the correct `<link>` or `@import` into the active file without opening a separate menu.
- **Copy icon name** action added to every icon card in the Sidebar, alongside Insert, HTML and React.

### Improved
- Sidebar layout rebuilt with `flex: 1` grid that fills the exact remaining viewport height — no overflow, no empty space.
- Icon cards now have a subtle `translateY(-1px)` lift on hover and smooth border-color transition.
- Hover action overlay uses a backdrop blur effect for legibility on any theme.
- Labels for Style, Fill and Weight use uppercase and letter spacing for clearer hierarchy.
- Scrollbar replaced with a 4 px native thin scrollbar matching VS Code panels.
- Gallery header is now correctly `position: sticky` with the body as the scroll container, fixing a layout regression where the header would scroll out of view.

---

## [1.2.0] - 2026-05-18

### Added
- **Hover Previews** — hovering any icon name in code shows the real rendered glyph, its name and copy-ready snippets.
- **Gutter Icons** — small icon thumbnails appear beside line numbers in all supported file types.
- **Context Menu** — right-click → *Import CDN by Style* for one-step CDN injection.
- **Improved Import Service** — optimized imports via `icon_names`, duplicate detection and framework-aware format selection.
- **Decoration Provider** — real-time parser for detecting icons in HTML, JSX, TSX, Vue, Blade and PHP.
- **Refresh Command** — *Refresh Icon Previews* forces a decoration update on the active editor.

### Fixed
- Fixed 404 errors when downloading icon SVGs by switching to the stable GitHub Material Design Icons repository.
- Fixed multiple framework-detection edge cases for Blade, PHP and `.vue` single-file components.
- Capped gutter icons per file using `maxGutterIcons` to prevent performance degradation on large files.

---

## [1.1.0] - 2026-05-18

### Fixed
- Fixed icon rendering in Sidebar and Gallery Webviews after VS Code CSP policy tightening.
- Improved Sidebar performance with virtual/lazy rendering.
- Fixed autocomplete trigger range and framework detection for `.jsx` files.

---

## [0.0.1] - 2026-05-18

### Added
- Initial release.
- Sidebar view with search, style, fill and weight controls.
- Full-screen Gallery Webview.
- IntelliSense autocomplete for icon names.
- Support for Material Symbols Outlined, Rounded and Sharp styles.
