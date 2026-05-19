import * as vscode from "vscode";
import { IconService } from "../services/icon.service";
import { InsertService } from "../services/insert.service";
import { EditorService } from "../services/editor.service";
import { MaterialSymbolStyle } from "../types/icon.types";
import { getGalleryHtml } from "./galleryHtml";

export class GalleryPanel {
  public static currentPanel: GalleryPanel | undefined;
  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];

  private constructor(
    panel: vscode.WebviewPanel,
    extensionUri: vscode.Uri,
    private iconService: IconService,
    private insertService: InsertService,
    private editorService: EditorService,
  ) {
    this._panel = panel;
    this._extensionUri = extensionUri;

    this._update();

    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    this._panel.webview.onDidReceiveMessage(
      async (message) => {
        const config = vscode.workspace.getConfiguration("googleMaterialSymbols");
        const style = config.get<MaterialSymbolStyle>("defaultStyle", "outlined");
        const useTailwind = config.get<boolean>("useTailwindClasses", false);
        const fill = config.get<number>("defaultFill", 0);
        const weight = config.get<number>("defaultWeight", 400);
        const grade = config.get<number>("defaultGrade", 0);
        const opticalSize = config.get<number>("defaultOpticalSize", 24);
        const insertAriaHidden = config.get<boolean>("insertAriaHidden", true);

        const options = {
            name: message.iconName,
            style,
            useTailwind,
            fill,
            weight,
            grade,
            opticalSize,
            insertAriaHidden
        };

        switch (message.command) {
          case "insert":
            const snippet = this.insertService.generateSnippet({
                ...options,
                framework: this.editorService.getActiveDocumentFramework()
            });
            await this.editorService.insertTextAtCursor(snippet);
            return;
          case "copyHtml":
            const htmlSnippet = this.insertService.generateSnippet({
              ...options,
              framework: "html",
            });
            await vscode.env.clipboard.writeText(htmlSnippet);
            vscode.window.showInformationMessage(`HTML copiado: ${message.iconName}`);
            return;
          case "copyReact":
            const reactSnippet = this.insertService.generateSnippet({
              ...options,
              framework: "react",
            });
            await vscode.env.clipboard.writeText(reactSnippet);
            vscode.window.showInformationMessage(`React copiado: ${message.iconName}`);
            return;
          case "copyName":
            await vscode.env.clipboard.writeText(message.iconName);
            vscode.window.showInformationMessage(`Nombre copiado: ${message.iconName}`);
            return;
        }
      },
      null,
      this._disposables,
    );
  }

  public static createOrShow(
    extensionUri: vscode.Uri,
    iconService: IconService,
    insertService: InsertService,
    editorService: EditorService,
  ) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    if (GalleryPanel.currentPanel) {
      GalleryPanel.currentPanel._panel.reveal(column);
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      "materialSymbolsGallery",
      "Material Symbols Gallery",
      column || vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [vscode.Uri.joinPath(extensionUri, "media")],
      },
    );

    GalleryPanel.currentPanel = new GalleryPanel(
      panel,
      extensionUri,
      iconService,
      insertService,
      editorService,
    );
  }

  private _update() {
    const webview = this._panel.webview;
    const config = vscode.workspace.getConfiguration("googleMaterialSymbols");
    const style = config.get<MaterialSymbolStyle>("defaultStyle", "outlined");
    const icons = this.iconService.getAllIcons();

    this._panel.webview.html = getGalleryHtml(
      webview,
      this._extensionUri,
      icons,
      style,
    );
  }

  public dispose() {
    GalleryPanel.currentPanel = undefined;
    this._panel.dispose();
    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }
}
