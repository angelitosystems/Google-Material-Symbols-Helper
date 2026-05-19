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
  const fontStyle = style.charAt(0).toUpperCase() + style.slice(1);
  const fontUrl = `https://fonts.googleapis.com/css2?family=Material+Symbols+${fontStyle}:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-25..200&display=block`;

  const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'media', 'gallery.js'));
  const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'media', 'gallery.css'));

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
    <div class="header">
        <div class="title-row">
            <h1>Material Symbols Gallery</h1>
            <div class="badge">${fontStyle}</div>
        </div>
        <div class="search-row">
            <input type="text" id="searchInput" placeholder="Search thousands of icons..." autofocus>
        </div>
        <div id="stats" class="stats">Loading...</div>
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
