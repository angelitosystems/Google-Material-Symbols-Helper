import * as vscode from "vscode";
import { IconService } from "../services/icon.service";
import { InsertService } from "../services/insert.service";
import { EditorService } from "../services/editor.service";
import { MaterialSymbolStyle } from "../types/icon.types";
import { getSidebarHtml } from "../webviews/sidebarHtml";

export class MaterialSymbolsSidebarProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "google-material-symbols.sidebar";
  private _view?: vscode.WebviewView;

  constructor(
    private readonly _extensionUri: vscode.Uri,
    private readonly _iconService: IconService,
    private readonly _insertService: InsertService,
    private readonly _editorService: EditorService
  ) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    this._updateWebview();

    webviewView.webview.onDidReceiveMessage(async (data) => {
      const config = vscode.workspace.getConfiguration("googleMaterialSymbols");
      const useTailwind = config.get<boolean>("useTailwindClasses", false);
      const grade = config.get<number>("defaultGrade", 0);
      const opticalSize = config.get<number>("defaultOpticalSize", 24);
      const insertAriaHidden = config.get<boolean>("insertAriaHidden", true);

      const style = data.style || config.get<MaterialSymbolStyle>("defaultStyle", "outlined");
      const fill = data.fill !== undefined ? parseInt(data.fill) : config.get<number>("defaultFill", 0);
      const weight = data.weight !== undefined ? parseInt(data.weight) : config.get<number>("defaultWeight", 400);

      switch (data.command) {
        case "ready":
          this._view?.webview.postMessage({
            command: "loadIcons",
            icons: this._iconService.getAllIcons(),
          });
          break;
        case "insert":
          const snippet = this._insertService.generateSnippet({
            name: data.iconName,
            style,
            useTailwind,
            framework: this._editorService.getActiveDocumentFramework(),
            fill,
            weight,
            grade,
            opticalSize,
            insertAriaHidden,
          });
          await this._editorService.insertTextAtCursor(snippet);
          break;
        case "copyHtml":
          const htmlSnippet = this._insertService.generateSnippet({
            name: data.iconName,
            style,
            useTailwind,
            framework: "html",
            fill,
            weight,
            grade,
            opticalSize,
            insertAriaHidden,
          });
          await vscode.env.clipboard.writeText(htmlSnippet);
          vscode.window.showInformationMessage(`HTML copiado: ${data.iconName}`);
          break;
        case "copyReact":
          const reactSnippet = this._insertService.generateSnippet({
            name: data.iconName,
            style,
            useTailwind,
            framework: "react",
            fill,
            weight,
            grade,
            opticalSize,
            insertAriaHidden,
          });
          await vscode.env.clipboard.writeText(reactSnippet);
          vscode.window.showInformationMessage(`React copiado: ${data.iconName}`);
          break;
        case "copyName":
          await vscode.env.clipboard.writeText(data.iconName);
          vscode.window.showInformationMessage(`Nombre copiado: ${data.iconName}`);
          break;
        case "importCdn":
          // Delegar al comando de importación CDN existente
          vscode.commands.executeCommand("google-material-symbols-helper.importCdnByStyle");
          break;
        case "updateSettings":
          // Option to sync webview settings back to VS Code settings if desired
          break;
      }
    });
  }

  private _updateWebview() {
    if (!this._view) {
      return;
    }

    const config = vscode.workspace.getConfiguration("googleMaterialSymbols");
    const style = config.get<MaterialSymbolStyle>("defaultStyle", "outlined");
    const fill = config.get<number>("defaultFill", 0);
    const weight = config.get<number>("defaultWeight", 400);

    this._view.webview.html = getSidebarHtml(
      this._view.webview,
      this._extensionUri,
      style,
      fill,
      weight
    );
  }
}
