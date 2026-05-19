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
  
  const fontStyle = style.charAt(0).toUpperCase() + style.slice(1);
  const fontUrl = `https://fonts.googleapis.com/css2?family=Material+Symbols+${fontStyle}:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-25..200&display=block`;

  const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'media', 'sidebar.js'));
  const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'media', 'sidebar.css'));

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource} https:; style-src ${webview.cspSource} 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; script-src 'nonce-${nonce}';">
    <link href="${fontUrl}" rel="stylesheet">
    <link href="${styleUri}" rel="stylesheet">
</head>
<body>
    <div class="container">
        <div class="search-box">
            <input type="text" id="searchInput" placeholder="Buscar icono..." autofocus>
        </div>
        
        <div class="controls">
            <div class="control-group">
                <label>Style</label>
                <select id="styleSelect">
                    <option value="outlined" ${style === 'outlined' ? 'selected' : ''}>Outlined</option>
                    <option value="rounded" ${style === 'rounded' ? 'selected' : ''}>Rounded</option>
                    <option value="sharp" ${style === 'sharp' ? 'selected' : ''}>Sharp</option>
                </select>
            </div>
            <div class="control-group">
                <label>Fill</label>
                <select id="fillSelect">
                    <option value="0" ${fill === 0 ? 'selected' : ''}>0</option>
                    <option value="1" ${fill === 1 ? 'selected' : ''}>1</option>
                </select>
            </div>
            <div class="control-group">
                <label>Weight</label>
                <select id="weightSelect">
                    <option value="100" ${weight === 100 ? 'selected' : ''}>100</option>
                    <option value="200" ${weight === 200 ? 'selected' : ''}>200</option>
                    <option value="300" ${weight === 300 ? 'selected' : ''}>300</option>
                    <option value="400" ${weight === 400 ? 'selected' : ''}>400</option>
                    <option value="500" ${weight === 500 ? 'selected' : ''}>500</option>
                    <option value="600" ${weight === 600 ? 'selected' : ''}>600</option>
                    <option value="700" ${weight === 700 ? 'selected' : ''}>700</option>
                </select>
            </div>
        </div>

        <div id="stats" class="stats">Cargando iconos...</div>

        <div id="iconGrid" class="grid"></div>
    </div>

    <script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`;
}
