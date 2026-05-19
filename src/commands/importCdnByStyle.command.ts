import * as vscode from "vscode";
import { ImportService, ImportOptions } from "../services/import.service";
import { EditorService } from "../services/editor.service";
import { MaterialSymbolStyle } from "../types/icon.types";

export function registerImportCdnByStyleCommand(
  importService: ImportService,
  editorService: EditorService
): vscode.Disposable {
  return vscode.commands.registerCommand(
    "google-material-symbols-helper.importCdnByStyle",
    async () => {
      const editor = editorService.getActiveEditor();
      if (!editor) {
        editorService.showNoEditorMessage();
        return;
      }

      const styleChoices: { label: string; style: MaterialSymbolStyle; optimized: boolean }[] = [
        { label: "Outlined", style: "outlined", optimized: false },
        { label: "Rounded", style: "rounded", optimized: false },
        { label: "Sharp", style: "sharp", optimized: false },
        { label: "Outlined (Optimized with icon_names)", style: "outlined", optimized: true },
        { label: "Rounded (Optimized with icon_names)", style: "rounded", optimized: true },
        { label: "Sharp (Optimized with icon_names)", style: "sharp", optimized: true },
      ];

      const selectedStyle = await vscode.window.showQuickPick(styleChoices, {
        placeHolder: "Selecciona el estilo de Material Symbols para importar",
      });

      if (!selectedStyle) return;

      let iconNames: string[] | undefined = undefined;
      if (selectedStyle.optimized) {
        const iconNamesInput = await vscode.window.showInputBox({
          placeHolder: "home, search, settings",
          prompt: "Ingresa los nombres de los iconos separados por coma",
        });

        if (iconNamesInput === undefined) return;
        iconNames = iconNamesInput
          .split(",")
          .map((n) => n.trim())
          .filter((n) => n.length > 0);
      }

      const config = vscode.workspace.getConfiguration("googleMaterialSymbols");
      const options: ImportOptions = {
        style: selectedStyle.style,
        iconNames,
        fill: config.get<number>("defaultFill", 0),
        weight: config.get<number>("defaultWeight", 400),
        grade: config.get<number>("defaultGrade", 0),
        opticalSize: config.get<number>("defaultOpticalSize", 24),
      };

      const framework = editorService.getActiveDocumentFramework();
      const cdnUrl = importService.buildGoogleSymbolsCdnUrl(options);

      // Check for duplicates
      if (editorService.documentContains(cdnUrl)) {
        const alreadyExists = await vscode.window.showWarningMessage(
          `El CDN de Material Symbols ${selectedStyle.label} ya parece existir en este archivo.`,
          "Insertar de todas formas",
          "Cancelar"
        );
        if (alreadyExists !== "Insertar de todas formas") return;
      }

      if (framework === "react") {
        const reactChoice = await vscode.window.showQuickPick(
          [
            { label: "Insertar link HTML aquí", value: "html" },
            { label: "Insertar import CSS aquí", value: "css" },
            { label: "Copiar CDN al portapapeles", value: "copy" },
          ],
          { placeHolder: "¿Dónde quieres insertar el CDN?" }
        );

        if (!reactChoice) return;

        if (reactChoice.value === "html") {
          const htmlLink = importService.buildGoogleSymbolsHtmlLink(options);
          await editorService.insertTextAtCursor(htmlLink);
        } else if (reactChoice.value === "css") {
          const fullCss = importService.buildGoogleSymbolsFullCssImport(options);
          await editorService.insertTextAtCursor(fullCss);
        } else if (reactChoice.value === "copy") {
          await vscode.env.clipboard.writeText(cdnUrl);
          vscode.window.showInformationMessage("CDN URL copiada al portapapeles.");
        }
      } else if (framework === "css") {
        const fullCss = importService.buildGoogleSymbolsFullCssImport(options);
        await editorService.insertTextAtCursor(fullCss);
      } else {
        // HTML, Angular, Vue, Blade, PHP
        const htmlLink = importService.buildGoogleSymbolsHtmlLink(options);
        await editorService.insertTextAtCursor(htmlLink);
      }
    }
  );
}
