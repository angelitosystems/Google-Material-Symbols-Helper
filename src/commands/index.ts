import * as vscode from "vscode";
import { IconService } from "../services/icon.service";
import { InsertService } from "../services/insert.service";
import { EditorService } from "../services/editor.service";
import { ImportService } from "../services/import.service";
import { MaterialSymbolsDecorationProvider } from "../providers/materialSymbolsDecoration.provider";
import { registerInsertIconCommand } from "./insertIcon.command";
import { registerInsertImportCommand } from "./insertImport.command";
import { registerInsertOptimizedImportCommand } from "./insertOptimizedImport.command";
import { registerOpenGalleryCommand } from "./openGallery.command";
import { registerImportCdnByStyleCommand } from "./importCdnByStyle.command";
import { registerRefreshEditorPreviewsCommand } from "./refreshEditorPreviews.command";

export function registerAllCommands(
  context: vscode.ExtensionContext,
  iconService: IconService,
  insertService: InsertService,
  editorService: EditorService,
  importService: ImportService,
  decorationProvider: MaterialSymbolsDecorationProvider
): vscode.Disposable[] {
  const disposables: vscode.Disposable[] = [
    registerInsertIconCommand(iconService, insertService, editorService),
    registerInsertImportCommand(importService),
    registerInsertOptimizedImportCommand(importService),
    registerOpenGalleryCommand(context.extensionUri, iconService, insertService, editorService),
    registerImportCdnByStyleCommand(importService, editorService),
    registerRefreshEditorPreviewsCommand(decorationProvider),
  ];

  // Additional copy commands
  disposables.push(
    vscode.commands.registerCommand("google-material-symbols-helper.copyHtml", async () => {
        const icons = iconService.getAllIcons();
        const items = icons.map(i => ({ label: i.name }));
        const selected = await vscode.window.showQuickPick(items, { placeHolder: "Seleccione icono para copiar HTML" });
        if (selected) {
            const config = vscode.workspace.getConfiguration("googleMaterialSymbols");
            const snippet = insertService.generateSnippet({
                name: selected.label,
                style: config.get("defaultStyle", "outlined"),
                useTailwind: config.get("useTailwindClasses", false),
                framework: "html",
                fill: config.get("defaultFill", 0),
                weight: config.get("defaultWeight", 400),
                grade: config.get("defaultGrade", 0),
                opticalSize: config.get("defaultOpticalSize", 24),
                insertAriaHidden: config.get("insertAriaHidden", true)
            });
            await vscode.env.clipboard.writeText(snippet);
        }
    }),
    vscode.commands.registerCommand("google-material-symbols-helper.copyReact", async () => {
        const icons = iconService.getAllIcons();
        const items = icons.map(i => ({ label: i.name }));
        const selected = await vscode.window.showQuickPick(items, { placeHolder: "Seleccione icono para copiar React" });
        if (selected) {
            const config = vscode.workspace.getConfiguration("googleMaterialSymbols");
            const snippet = insertService.generateSnippet({
                name: selected.label,
                style: config.get("defaultStyle", "outlined"),
                useTailwind: config.get("useTailwindClasses", false),
                framework: "react",
                fill: config.get("defaultFill", 0),
                weight: config.get("defaultWeight", 400),
                grade: config.get("defaultGrade", 0),
                opticalSize: config.get("defaultOpticalSize", 24),
                insertAriaHidden: config.get("insertAriaHidden", true)
            });
            await vscode.env.clipboard.writeText(snippet);
        }
    })
  );

  return disposables;
}
