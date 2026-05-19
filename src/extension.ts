import * as vscode from "vscode";
import { registerAllCommands } from "./commands";
import { MaterialSymbolsCompletionProvider } from "./providers/materialSymbolsCompletion.provider";
import { MaterialSymbolsSidebarProvider } from "./providers/materialSymbolsSidebar.provider";
import { MaterialSymbolsHoverProvider } from "./providers/materialSymbolsHover.provider";
import { MaterialSymbolsDecorationProvider } from "./providers/materialSymbolsDecoration.provider";
import { IconService } from "./services/icon.service";
import { InsertService } from "./services/insert.service";
import { EditorService } from "./services/editor.service";
import { ImportService } from "./services/import.service";
import { IconParserService } from "./services/iconParser.service";
import { IconAssetService } from "./services/iconAsset.service";

export function activate(context: vscode.ExtensionContext) {
  const iconService = new IconService(context.extensionPath);
  const insertService = new InsertService();
  const editorService = new EditorService();
  const importService = new ImportService();
  const iconParser = new IconParserService();
  const iconAsset = new IconAssetService(context.extensionPath);

  const decorationProvider = new MaterialSymbolsDecorationProvider(iconParser, iconAsset);

  // Register all commands
  const commands = registerAllCommands(
    context,
    iconService,
    insertService,
    editorService,
    importService,
    decorationProvider
  );
  context.subscriptions.push(...commands);

  // Register Sidebar Provider
  const sidebarProvider = new MaterialSymbolsSidebarProvider(
    context.extensionUri,
    iconService,
    insertService,
    editorService
  );
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      MaterialSymbolsSidebarProvider.viewType,
      sidebarProvider
    )
  );

  // Register completion provider
  const languages = ["html", "typescriptreact", "javascriptreact", "vue", "php", "blade", "css", "scss", "less"];
  const documentSelectors: vscode.DocumentSelector = languages.map(lang => ({ language: lang, scheme: "file" }));

  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      documentSelectors,
      new MaterialSymbolsCompletionProvider(iconService, insertService),
      "m", "s", "-"
    )
  );

  // Register Hover Provider
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(
      documentSelectors,
      new MaterialSymbolsHoverProvider(iconParser, iconAsset)
    )
  );

  // Handle Decorations
  vscode.window.onDidChangeActiveTextEditor(editor => {
    if (editor) decorationProvider.updateDecorations(editor);
  }, null, context.subscriptions);

  vscode.workspace.onDidChangeTextDocument(event => {
    const editor = vscode.window.activeTextEditor;
    if (editor && event.document === editor.document) {
      decorationProvider.updateDecorations(editor);
    }
  }, null, context.subscriptions);

  if (vscode.window.activeTextEditor) {
    decorationProvider.updateDecorations(vscode.window.activeTextEditor);
  }

  context.subscriptions.push(decorationProvider);
}

export function deactivate() {}
