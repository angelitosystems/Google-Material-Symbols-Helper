import * as vscode from "vscode";
import { IconParserService } from "../services/iconParser.service";
import { IconAssetService } from "../services/iconAsset.service";

export class MaterialSymbolsDecorationProvider {
  private decorationTypes: Map<string, vscode.TextEditorDecorationType> = new Map();
  private timeout: NodeJS.Timeout | undefined;

  constructor(
    private iconParser: IconParserService,
    private iconAsset: IconAssetService
  ) {}

  public updateDecorations(editor: vscode.TextEditor) {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }

    this.timeout = setTimeout(() => this.triggerUpdate(editor), 500);
  }

  private triggerUpdate(editor: vscode.TextEditor) {
    const config = vscode.workspace.getConfiguration("googleMaterialSymbols");
    const enabled = config.get<boolean>("enableGutterPreview", true);
    
    if (!enabled) {
      this.clearAllDecorations(editor);
      return;
    }

    const icons = this.iconParser.parseDocument(editor.document);
    const maxIcons = config.get<number>("maxGutterIcons", 200);
    const limitedIcons = icons.slice(0, maxIcons);

    // Group icons by style-name to use the same decoration type
    const groupedIcons: Map<string, vscode.Range[]> = new Map();
    
    limitedIcons.forEach(icon => {
      const key = `${icon.style}-${icon.name}`;
      if (!groupedIcons.has(key)) {
        groupedIcons.set(key, []);
      }
      groupedIcons.get(key)!.push(icon.range);
    });

    // Apply decorations
    // First, clear existing decoration types that are not in this document
    // Actually, it's better to just update the ones we found and clear others if needed,
    // but DecorationType is global. We should just set decorations to [] for types not present.
    
    this.decorationTypes.forEach((type, key) => {
      const ranges = groupedIcons.get(key) || [];
      editor.setDecorations(type, ranges);
    });

    // For new icons, create decoration types
    groupedIcons.forEach((ranges, key) => {
      if (!this.decorationTypes.has(key)) {
        const [style, name] = key.split("-") as [any, string];
        const iconUri = this.iconAsset.getIconUri(name, style);
        
        const type = vscode.window.createTextEditorDecorationType({
          gutterIconPath: iconUri,
          gutterIconSize: "contain"
        });
        
        this.decorationTypes.set(key, type);
        editor.setDecorations(type, ranges);
      }
    });
  }

  private clearAllDecorations(editor: vscode.TextEditor) {
    this.decorationTypes.forEach(type => {
      editor.setDecorations(type, []);
    });
  }

  public dispose() {
    this.decorationTypes.forEach(type => type.dispose());
    this.decorationTypes.clear();
  }
}
