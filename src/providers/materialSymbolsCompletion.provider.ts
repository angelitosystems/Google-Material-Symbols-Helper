import * as vscode from "vscode";
import { IconService } from "../services/icon.service";
import { InsertService } from "../services/insert.service";
import { MaterialSymbolStyle } from "../types/icon.types";
import { detectFramework } from "../utils/frameworkDetector";

export class MaterialSymbolsCompletionProvider
  implements vscode.CompletionItemProvider
{
  constructor(
    private iconService: IconService,
    private insertService: InsertService,
  ) {}

  public provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): vscode.CompletionItem[] | undefined {
    const linePrefix = document.lineAt(position).text.substring(0, position.character);
    const match = linePrefix.match(/ms-([a-zA-Z0-9_]*)$/);

    if (!match) {
      return undefined;
    }

    const config = vscode.workspace.getConfiguration("googleMaterialSymbols");
    const style = config.get<MaterialSymbolStyle>("defaultStyle", "outlined");
    const useTailwind = config.get<boolean>("useTailwindClasses", false);
    const fill = config.get<number>("defaultFill", 0);
    const weight = config.get<number>("defaultWeight", 400);
    const grade = config.get<number>("defaultGrade", 0);
    const opticalSize = config.get<number>("defaultOpticalSize", 24);
    const insertAriaHidden = config.get<boolean>("insertAriaHidden", true);
    
    const framework = detectFramework(document.languageId, document.fileName);

    const start = position.translate(0, -match[0].length);
    const range = new vscode.Range(start, position);

    return this.iconService.getAllIcons().map((icon) => {
      const completionItem = new vscode.CompletionItem(
        `ms-${icon.name}`,
        vscode.CompletionItemKind.Snippet,
      );
      
      const snippet = this.insertService.generateSnippet({
        name: icon.name,
        style,
        useTailwind,
        framework,
        fill,
        weight,
        grade,
        opticalSize,
        insertAriaHidden,
      });

      completionItem.insertText = new vscode.SnippetString(snippet);
      completionItem.range = range;
      completionItem.detail = `Material Symbol: ${icon.name}`;
      completionItem.documentation = new vscode.MarkdownString(
        `Insert ${icon.name} icon with ${style} style.`
      );
      
      // Sort icons so exact matches or relevant ones come first if needed
      completionItem.filterText = `ms-${icon.name}`;

      return completionItem;
    });
  }
}
