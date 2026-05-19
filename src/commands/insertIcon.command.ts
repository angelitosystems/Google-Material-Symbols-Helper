import * as vscode from "vscode";
import { IconService } from "../services/icon.service";
import { InsertService } from "../services/insert.service";
import { EditorService } from "../services/editor.service";
import { MaterialSymbolStyle } from "../types/icon.types";

export function registerInsertIconCommand(
  iconService: IconService,
  insertService: InsertService,
  editorService: EditorService
): vscode.Disposable {
  return vscode.commands.registerCommand(
    "google-material-symbols-helper.insertIcon",
    async () => {
      const editor = editorService.getActiveEditor();
      if (!editor) {
        editorService.showNoEditorMessage();
        return;
      }

      const icons = iconService.getAllIcons();
      if (icons.length === 0) {
        vscode.window.showErrorMessage(
          "No icons found. Please run 'npm run generate:icons' or wait for the extension to initialize.",
        );
        return;
      }

      const items: vscode.QuickPickItem[] = icons.map((icon) => ({
        label: icon.name,
        description: icon.category,
        detail: icon.tags.join(", "),
      }));

      const selected = await vscode.window.showQuickPick(items, {
        placeHolder: "Search for a Material Symbol...",
        matchOnDescription: true,
        matchOnDetail: true,
      });

      if (selected) {
        const config = vscode.workspace.getConfiguration("googleMaterialSymbols");
        const style = config.get<MaterialSymbolStyle>("defaultStyle", "outlined");
        const useTailwind = config.get<boolean>("useTailwindClasses", false);
        const fill = config.get<number>("defaultFill", 0);
        const weight = config.get<number>("defaultWeight", 400);
        const grade = config.get<number>("defaultGrade", 0);
        const opticalSize = config.get<number>("defaultOpticalSize", 24);
        const insertAriaHidden = config.get<boolean>("insertAriaHidden", true);

        const snippet = insertService.generateSnippet({
          name: selected.label,
          style,
          useTailwind,
          framework: editorService.getActiveDocumentFramework(),
          fill,
          weight,
          grade,
          opticalSize,
          insertAriaHidden,
        });

        await editorService.insertTextAtCursor(snippet);
      }
    },
  );
}
