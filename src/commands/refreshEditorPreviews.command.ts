import * as vscode from "vscode";
import { MaterialSymbolsDecorationProvider } from "../providers/materialSymbolsDecoration.provider";

export function registerRefreshEditorPreviewsCommand(
  decorationProvider: MaterialSymbolsDecorationProvider
): vscode.Disposable {
  return vscode.commands.registerCommand(
    "google-material-symbols-helper.refreshEditorPreviews",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        decorationProvider.updateDecorations(editor);
      }
    }
  );
}
