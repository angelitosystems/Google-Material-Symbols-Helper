import * as fs from "fs";
import * as path from "path";
import { MaterialSymbol } from "../types/icon.types";

export class IconService {
  private icons: MaterialSymbol[] = [];

  constructor(private extensionPath: string) {
    this.loadIcons();
  }

  private loadIcons() {
    const jsonPath = path.join(
      this.extensionPath,
      "src",
      "generated",
      "material-symbols.json",
    );

    // Fallback if the file doesn't exist yet (e.g. before npm run generate:icons)
    if (!fs.existsSync(jsonPath)) {
      console.warn("Material Symbols JSON not found. Run 'npm run generate:icons' first.");
      this.icons = [];
      return;
    }

    try {
      const content = fs.readFileSync(jsonPath, "utf8");
      this.icons = JSON.parse(content);
    } catch (error) {
      console.error("Error loading Material Symbols JSON:", error);
      this.icons = [];
    }
  }

  public getAllIcons(): MaterialSymbol[] {
    return this.icons;
  }

  public searchIcons(query: string): MaterialSymbol[] {
    const lowerQuery = query.toLowerCase();
    return this.icons.filter(
      (icon) =>
        icon.name.toLowerCase().includes(lowerQuery) ||
        icon.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
    );
  }
}
