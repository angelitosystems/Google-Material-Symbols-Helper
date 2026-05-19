import { IconSnippetOptions } from "../types/icon.types";

export class InsertService {
  public generateSnippet(options: IconSnippetOptions): string {
    const {
      name,
      style,
      framework,
      useTailwind,
      fill,
      weight,
      grade,
      opticalSize,
      insertAriaHidden,
    } = options;

    if (framework === "css") {
      return `.icon-${name}::before {
  content: "${name}";
  font-family: "Material Symbols ${this.capitalize(style)}";
}`.trim();
    }

    const classNameAttr = framework === "react" ? "className" : "class";
    const baseClass = `material-symbols-${style}`;
    const tailwindClasses = useTailwind
      ? " text-[22px] text-slate-600 dark:text-slate-300"
      : "";
    const ariaHidden = insertAriaHidden ? ' aria-hidden="true"' : "";

    // For Material Symbols, we can use font-variation-settings directly in style attribute if needed,
    // but usually they are handled via CSS classes. The user asked for specific snippet.
    const variationSettings = `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${opticalSize}`;
    const styleAttr = ` style="font-variation-settings: ${variationSettings}"`;

    return `<span ${classNameAttr}="${baseClass}${tailwindClasses}"${ariaHidden}${styleAttr}>${name}</span>`;
  }

  private capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}
