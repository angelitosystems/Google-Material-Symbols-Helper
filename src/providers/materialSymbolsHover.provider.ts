import * as vscode from "vscode";
import { IconParserService } from "../services/iconParser.service";
import { IconAssetService } from "../services/iconAsset.service";

export class MaterialSymbolsHoverProvider implements vscode.HoverProvider {
  constructor(
    private iconParser: IconParserService,
    private iconAsset: IconAssetService
  ) {}

  public provideHover(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.ProviderResult<vscode.Hover> {
    const config = vscode.workspace.getConfiguration("googleMaterialSymbols");
    if (!config.get<boolean>("enableHoverPreview", true)) {
      return undefined;
    }

    const hoveredIcon = this.iconParser.getSymbolAtPosition(document, position);

    if (!hoveredIcon) {
      return undefined;
    }

    const iconUri = this.iconAsset.getIconUri(hoveredIcon.name, hoveredIcon.style);
    
    const markdown = new vscode.MarkdownString();
    markdown.isTrusted = true;
    markdown.supportHtml = true;

    markdown.appendMarkdown(`# Material Symbol Preview\n\n`);
    markdown.appendMarkdown(`**Icon:** ${hoveredIcon.name}  \n`);
    markdown.appendMarkdown(`**Style:** ${hoveredIcon.style}  \n\n`);

    // Preview image
    markdown.appendMarkdown(`![${hoveredIcon.name}](${iconUri.toString()}|width=64,height=64)\n\n`);

    markdown.appendMarkdown(`---\n\n`);

    markdown.appendMarkdown(`**HTML:**\n`);
    markdown.appendCodeblock(`<span class="material-symbols-${hoveredIcon.style}" aria-hidden="true">${hoveredIcon.name}</span>`, "html");

    markdown.appendMarkdown(`**React:**\n`);
    markdown.appendCodeblock(`<span className="material-symbols-${hoveredIcon.style}" aria-hidden="true">${hoveredIcon.name}</span>`, "typescriptreact");

    return new vscode.Hover(markdown, hoveredIcon.range);
  }
}
