export type MaterialSymbolStyle = "outlined" | "rounded" | "sharp";

export interface MaterialSymbol {
  name: string;
  category: string;
  tags: string[];
}

export interface MaterialSymbolsMetadata {
  icons: MaterialSymbol[];
}

export interface IconSnippetOptions {
  name: string;
  style: MaterialSymbolStyle;
  framework: string;
  useTailwind: boolean;
  fill: number;
  weight: number;
  grade: number;
  opticalSize: number;
  insertAriaHidden: boolean;
}
