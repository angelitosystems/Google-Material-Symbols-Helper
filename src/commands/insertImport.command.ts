import * as vscode from "vscode";
import { ImportService } from "../services/import.service";
import { MaterialSymbolStyle } from "../types/icon.types";

export function registerInsertImportCommand(importService: ImportService): vscode.Disposable {
  return vscode.commands.registerCommand(
    "google-material-symbols-helper.insertImport",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No active editor found.");
        return;
      }

      const config = vscode.workspace.getConfiguration("googleMaterialSymbols");
      const style = config.get<MaterialSymbolStyle>("defaultStyle", "outlined");
      const fill = config.get<number>("defaultFill", 0);
      const weight = config.get<number>("defaultWeight", 400);
      const grade = config.get<number>("defaultGrade", 0);
      const opticalSize = config.get<number>("defaultOpticalSize", 24);

      const importOptions = { style, fill, weight, grade, opticalSize };
      const snippet = importService.buildGoogleSymbolsFullCssImport(importOptions);

      await editor.insertSnippet(new vscode.SnippetString(`${snippet}\n`));
    },
  );
}
