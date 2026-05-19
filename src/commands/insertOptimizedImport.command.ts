import * as vscode from "vscode";
import { ImportService } from "../services/import.service";
import { MaterialSymbolStyle } from "../types/icon.types";

export function registerInsertOptimizedImportCommand(importService: ImportService): vscode.Disposable {
  return vscode.commands.registerCommand(
    "google-material-symbols-helper.insertOptimizedImport",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No active editor found.");
        return;
      }

      const iconNamesInput = await vscode.window.showInputBox({
        placeHolder: "home, search, settings",
        prompt: "Ingrese los nombres de los iconos separados por coma para una importación optimizada.",
      });

      if (iconNamesInput !== undefined) {
        const iconNames = iconNamesInput
          .split(",")
          .map((name) => name.trim())
          .filter((name) => name.length > 0);

        const config = vscode.workspace.getConfiguration("googleMaterialSymbols");
        const style = config.get<MaterialSymbolStyle>("defaultStyle", "outlined");

        const snippet = importService.buildGoogleSymbolsCssImport({ style, iconNames });
        await editor.insertSnippet(new vscode.SnippetString(`${snippet}\n`));
      }
    },
  );
}
