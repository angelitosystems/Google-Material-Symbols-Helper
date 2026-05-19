import * as vscode from "vscode";
import { getNonce } from "../utils/nonce";
import { MaterialSymbol, MaterialSymbolStyle } from "../types/icon.types";

export function getGalleryHtml(
  webview: vscode.Webview,
  extensionUri: vscode.Uri,
  icons: MaterialSymbol[],
  style: MaterialSymbolStyle,
): string {
  const nonce = getNonce();

  // CDN único con las 3 variantes
  const fontUrl =
    "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-25..200" +
    "&family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-25..200" +
    "&family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-25..200" +
    "&display=block";

  const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "media", "gallery.js"));
  const styleUri  = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "media", "gallery.css"));

  const fontStyle = style.charAt(0).toUpperCase() + style.slice(1);

  return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy"
          content="default-src 'none';
                   img-src ${webview.cspSource} https:;
                   style-src ${webview.cspSource} 'unsafe-inline' https://fonts.googleapis.com;
                   font-src https://fonts.gstatic.com;
                   script-src 'nonce-${nonce}';">
    <!-- Material Symbols CDN – 3 variantes en una sola petición -->
    <link href="${fontUrl}" rel="stylesheet">
    <link href="${styleUri}" rel="stylesheet">
</head>
<body>
    <!-- Header sticky: el scroll lo hace body -->
    <div class="header">
        <div class="title-row">
            <h1>Material Symbols</h1>
            <div class="badge">${fontStyle}</div>
        </div>
        <div class="search-row">
            <input type="text" id="searchInput" placeholder="Buscar miles de iconos..." autofocus>
        </div>
        <div id="stats" class="stats">Cargando...</div>
    </div>

    <div id="iconGrid" class="grid"></div>

    <script nonce="${nonce}">
        window.__ICONS__ = ${JSON.stringify(icons)};
        window.__STYLE__ = "${style}";
    </script>
    <script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`;
}
