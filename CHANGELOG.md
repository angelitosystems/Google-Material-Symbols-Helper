# Changelog

All notable changes to the "Google Material Symbols Helper" extension will be documented in this file.

## [1.2.0] - 2026-05-18

### Added
- **Visual Previews in Editor**:
    - **Hover Previews**: Added visual preview of icons when hovering over icon names in code.
    - **Gutter Icons**: Added small icon previews in the editor margin (gutter).
- **Context Menu Integration**: New "Google Material Symbols: Importar CDN según estilo" command available on right-click.
- **Improved Import Service**: Support for optimized imports with `icon_names`, duplicate detection, and format selection for React.
- **Decoration Provider**: Real-time parser for detecting icons in HTML, JSX, TSX, Vue, Blade, and PHP.
- **Refresh Command**: "Google Material Symbols: Refrescar vista previa de iconos" to force update editor decorations.

### Fixed
- Fixed 404 error when downloading icon SVGs by switching to the stable GitHub Material Design Icons repository.
- Improved icon rendering stability in Webviews.
- Fixed multiple framework detection edge cases.
- Optimized performance for large files by limiting gutter icons.

## [1.1.0] - 2026-05-18

### Fixed
- Fixed icon rendering in Webviews (Sidebar and Gallery).
- Improved Sidebar performance with lazy loading.
- Fixed autocomplete range and framework detection.

## [0.0.1] - 2026-05-18

### Added
- Initial release.
- Sidebar view, Gallery Webview, and Autocomplete.
- Support for Material Symbols Outlined, Rounded and Sharp.
