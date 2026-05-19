import * as vscode from "vscode";
import { MaterialSymbolStyle } from "../types/icon.types";

export interface ParsedIcon {
  name: string;
  style: MaterialSymbolStyle;
  className: string;
  range: vscode.Range;
  line: number;
  fullMatch: string;
}

export class IconParserService {
  /**
   * Regex to match Material Symbols spans.
   * Group 1: style (outlined|rounded|sharp)
   * Group 2: icon name
   */
  private readonly REGEX_SYMBOL = /<span[^>]*?(?:class|className)=["'][^"']*?material-symbols-(outlined|rounded|sharp)[^"']*?["'][^>]*?>\s*([a-z0-9_]+)\s*<\/span>/gis;

  public parseDocument(document: vscode.TextDocument): ParsedIcon[] {
    const text = document.getText();
    return this.parseText(text, document);
  }

  public parseText(text: string, document?: vscode.TextDocument): ParsedIcon[] {
    const icons: ParsedIcon[] = [];
    let match;

    // Reset regex index
    this.REGEX_SYMBOL.lastIndex = 0;

    while ((match = this.REGEX_SYMBOL.exec(text)) !== null) {
      const style = match[1] as MaterialSymbolStyle;
      const name = match[2].trim();
      const fullMatch = match[0];
      
      let range: vscode.Range;
      let line = 0;

      if (document) {
        const startPos = document.positionAt(match.index);
        const endPos = document.positionAt(match.index + fullMatch.length);
        range = new vscode.Range(startPos, endPos);
        line = startPos.line;
      } else {
        // Fallback if no document is provided (less accurate)
        range = new vscode.Range(0, 0, 0, 0);
      }
      
      // Extract full class for reference if needed
      const classMatch = fullMatch.match(/(?:class|className)=["']([^"']+)["']/);
      const className = classMatch ? classMatch[1] : `material-symbols-${style}`;

      icons.push({
        name,
        style,
        className,
        range,
        line,
        fullMatch,
      });
    }

    return icons;
  }

  public getSymbolAtPosition(document: vscode.TextDocument, position: vscode.Position): ParsedIcon | undefined {
    const icons = this.parseDocument(document);
    return icons.find(icon => icon.range.contains(position));
  }
}
