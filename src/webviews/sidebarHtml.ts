import * as vscode from "vscode";
import { getNonce } from "../utils/nonce";
import { MaterialSymbolStyle } from "../types/icon.types";

export function getSidebarHtml(
  webview: vscode.Webview,
  extensionUri: vscode.Uri,
  style: MaterialSymbolStyle,
  fill: number,
  weight: number,
): string {
  const nonce = getNonce();

  // CDN único con las 3 variantes en una sola petición (sin duplicados)
  const fontUrl =
    "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-25..200" +
    "&family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-25..200" +
    "&family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-25..200" +
    "&display=block";

  const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "media", "sidebar.js"));
  const styleUri  = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "media", "sidebar.css"));

  const weightOpts = [100, 200, 300, 400, 500, 600, 700]
    .map(w => `<option value="${w}"${w === weight ? " selected" : ""}>${w}</option>`)
    .join("\n                    ");

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
    <!-- Material Symbols CDN – las 3 variantes en una sola petición -->
    <link href="${fontUrl}" rel="stylesheet">
    <link href="${styleUri}" rel="stylesheet">
</head>
<body>
<div class="container">

    <!-- Búsqueda -->
    <div class="search-box">
        <input type="text" id="searchInput" placeholder="Buscar icono..." autofocus>
    </div>

    <!-- Controles -->
    <div class="controls">
        <div class="control-group">
            <label for="styleSelect">Style</label>
            <select id="styleSelect">
                <option value="outlined"${style === "outlined" ? " selected" : ""}>Outlined</option>
                <option value="rounded"${style === "rounded"  ? " selected" : ""}>Rounded</option>
                <option value="sharp"${style === "sharp"    ? " selected" : ""}>Sharp</option>
            </select>
        </div>
        <div class="control-group">
            <label for="fillSelect">Fill</label>
            <select id="fillSelect">
                <option value="0"${fill === 0 ? " selected" : ""}>0</option>
                <option value="1"${fill === 1 ? " selected" : ""}>1</option>
            </select>
        </div>
        <div class="control-group">
            <label for="weightSelect">Weight</label>
            <select id="weightSelect">
                ${weightOpts}
            </select>
        </div>
    </div>

    <!-- Botón para insertar CDN en el <head> del archivo activo -->
    <div class="cdn-row">
        <span>Insertar CDN en &lt;head&gt;</span>
        <button class="cdn-btn" id="cdnBtn">+ Insertar</button>
    </div>

    <!-- Estadísticas -->
    <div id="stats" class="stats">Cargando iconos...</div>

    <!-- Grilla (único scroll de la sidebar) -->
    <div id="iconGrid" class="icon-grid"></div>

</div>
<script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`;
}
