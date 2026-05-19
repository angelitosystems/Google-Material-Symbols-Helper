import { MaterialSymbolStyle } from "../types/icon.types";

export interface ImportOptions {
  style: MaterialSymbolStyle;
  iconNames?: string[];
  fill?: number;
  weight?: number;
  grade?: number;
  opticalSize?: number;
}

export class ImportService {
  public buildGoogleSymbolsCdnUrl(options: ImportOptions): string {
    const family = this.getFontFamily(options.style);
    const { iconNames, fill = 0, weight = 400, grade = 0, opticalSize = 24 } = options;
    
    let url = `https://fonts.googleapis.com/css2?family=${family}:opsz,wght,FILL,GRAD@${opticalSize},${weight},${fill},${grade}`;
    
    if (iconNames && iconNames.length > 0) {
      url += `&icon_names=${iconNames.join(",")}`;
    }
    
    url += "&display=block";
    return url;
  }

  public buildGoogleSymbolsHtmlLink(options: ImportOptions): string {
    const url = this.buildGoogleSymbolsCdnUrl(options);
    return `<link href="${url}" rel="stylesheet" />`;
  }

  public buildGoogleSymbolsCssImport(options: ImportOptions): string {
    const url = this.buildGoogleSymbolsCdnUrl(options);
    return `@import url('${url}');`;
  }

  public buildGoogleSymbolsCssClass(style: MaterialSymbolStyle, options: ImportOptions): string {
    const family = this.getReadableFontFamily(style);
    const { fill = 0, weight = 400, grade = 0, opticalSize = 24 } = options;
    
    return `
.material-symbols-${style} {
  font-family: '${family}';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  font-feature-settings: 'liga';
  -webkit-font-feature-settings: 'liga';
  font-variation-settings:
    'FILL' ${fill},
    'wght' ${weight},
    'GRAD' ${grade},
    'opsz' ${opticalSize};
}
`.trim();
  }

  public buildGoogleSymbolsFullCssImport(options: ImportOptions): string {
    const importCss = this.buildGoogleSymbolsCssImport(options);
    const classCss = this.buildGoogleSymbolsCssClass(options.style, options);
    return `${importCss}\n\n${classCss}`;
  }

  private getFontFamily(style: MaterialSymbolStyle): string {
    if (style === "rounded") return "Material+Symbols+Rounded";
    if (style === "sharp") return "Material+Symbols+Sharp";
    return "Material+Symbols+Outlined";
  }

  private getReadableFontFamily(style: MaterialSymbolStyle): string {
    if (style === "rounded") return "Material Symbols Rounded";
    if (style === "sharp") return "Material Symbols Sharp";
    return "Material Symbols Outlined";
  }
}
