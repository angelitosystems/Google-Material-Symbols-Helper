import * as vscode from "vscode";
import * as https from "https";
import * as fs from "fs";
import * as path from "path";
import { IncomingMessage } from "http";
import { MaterialSymbolStyle } from "../types/icon.types";

export class IconAssetService {
  private baseDir: string;

  constructor(extensionPath: string) {
    this.baseDir = path.join(extensionPath, "media", "symbols");
    this.ensureDirectoryStructure();
  }

  private ensureDirectoryStructure() {
    const styles: MaterialSymbolStyle[] = ["outlined", "rounded", "sharp"];
    styles.forEach((style) => {
      const dir = path.join(this.baseDir, style);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  public getIconUri(name: string, style: MaterialSymbolStyle): vscode.Uri {
    const fileName = `${name}.svg`;
    const filePath = path.join(this.baseDir, style, fileName);

    if (fs.existsSync(filePath)) {
      return vscode.Uri.file(filePath);
    }

    // Attempt to download in background
    this.downloadIcon(name, style, filePath);
    
    // Return the URL as fallback if not yet downloaded
    return vscode.Uri.parse(this.getGoogleSymbolsSvgUrl(name, style));
  }

  public getGoogleSymbolsSvgUrl(name: string, style: MaterialSymbolStyle): string {
    const styleFormatted = style === 'outlined' ? 'materialsymbolsoutlined' : 
                          style === 'rounded' ? 'materialsymbolsrounded' : 
                          'materialsymbolssharp';
    // Using GitHub raw URL as it's more stable than gstatic's internal short_term/release paths
    return `https://raw.githubusercontent.com/google/material-design-icons/master/symbols/web/${name}/${styleFormatted}/${name}_24px.svg`;
  }

  private downloadIcon(name: string, style: MaterialSymbolStyle, dest: string) {
    const url = this.getGoogleSymbolsSvgUrl(name, style);
    
    https.get(url, (response: IncomingMessage) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          // Notify that icon is ready
          vscode.commands.executeCommand("google-material-symbols-helper.refreshEditorPreviews");
        });
      }
    }).on('error', () => {
      if (fs.existsSync(dest)) {
        fs.unlinkSync(dest);
      }
    });
  }
}
