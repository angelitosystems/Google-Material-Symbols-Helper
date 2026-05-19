# Google Material Symbols Helper

![Google Material Symbols Helper Preview](media/preview.png)

**Google Material Symbols Helper** es una potente extensión para Visual Studio Code diseñada para agilizar el flujo de trabajo de desarrolladores web que utilizan la biblioteca de iconos [Google Material Symbols](https://fonts.google.com/icons).

## Características Principales

- 🎨 **Galería Visual**: Explora la biblioteca completa de iconos en una vista de panel grande y responsive.
- 📂 **Sidebar Integrado**: Acceso rápido a todos los iconos desde la barra lateral de VS Code.
- ⚡ **Autocompletado Inteligente**: Sugerencias instantáneas al escribir nombres de iconos.
- 👁️ **Vista Previa en Editor**:
    - **Hover Preview**: Pasa el cursor sobre un icono en tu código para ver una previsualización visual grande, su nombre, estilo y ejemplos de código para HTML y React.
    - **Gutter Icons**: Mira miniaturas de los iconos junto a los números de línea para una identificación visual rápida en tus archivos HTML, React, Vue, PHP, etc.
- 🖱️ **Menú Contextual (Click Derecho)**: 
    - **Importar CDN según estilo**: Haz clic derecho y selecciona esta opción para insertar el CDN de Google Fonts.
    - Soporta estilos **Outlined**, **Rounded** y **Sharp**.
    - Inserta `<link>` en archivos HTML/Angular/Vue/Blade/PHP.
    - Inserta `@import` y la clase CSS necesaria en archivos CSS/SCSS.
    - En React (JSX/TSX), te permite elegir entre insertar el link, el import CSS o copiar la URL al portapapeles.
    - Opción de **Importación Optimizada** usando `icon_names` para cargar solo lo que necesitas.
    - Detección de duplicados para evitar múltiples importaciones del mismo estilo.

## Cómo usar la extensión

### A. Vista Previa en el Editor
Abre un archivo compatible (HTML, TSX, JSX, PHP, Vue, Blade, etc.). 
- **Hover**: Al pasar el cursor sobre `<span class="material-symbols-outlined">home</span>`, verás el icono real.
- **Gutter**: Verás el icono de `home` junto al número de línea.
- Configuración: `googleMaterialSymbols.enableHoverPreview` y `googleMaterialSymbols.enableGutterPreview`.

### B. Importar CDN desde Click Derecho
1. Haz clic derecho en el editor.
2. Selecciona **Google Material Symbols: Importar CDN según estilo**.
3. Elige el estilo deseado o la opción optimizada.
4. Sigue los pasos según tu framework detectado.

### C. Desde el Sidebar
1. Haz clic en el icono de estrella en la **Activity Bar**.
2. Busca un icono y haz clic en **Insertar**.

## Configuración (Settings)

```json
{
  "googleMaterialSymbols.defaultStyle": "rounded",
  "googleMaterialSymbols.useTailwindClasses": true,
  "googleMaterialSymbols.enableHoverPreview": true,
  "googleMaterialSymbols.enableGutterPreview": true,
  "googleMaterialSymbols.maxGutterIcons": 200
}
```

---

## English Summary

**Google Material Symbols Helper** is a VS Code extension to search, preview, and insert Google Material Symbols. Now featuring **Hover & Gutter previews**, **Context Menu CDN imports**, and full framework support (React, Angular, Vue, etc.).

## Licencia
MIT
