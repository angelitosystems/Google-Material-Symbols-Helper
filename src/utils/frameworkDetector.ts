export type Framework = "react" | "angular" | "vue" | "blade" | "php" | "html" | "css";

export function detectFramework(languageId: string, fileName?: string): Framework {
  const lowerFileName = fileName?.toLowerCase() || "";
  
  if (languageId === "typescriptreact" || languageId === "javascriptreact" || lowerFileName.endsWith(".tsx") || lowerFileName.endsWith(".jsx")) {
    return "react";
  }
  
  if (lowerFileName.endsWith(".blade.php")) {
    return "blade";
  }

  if (languageId === "php") {
    return "php";
  }

  if (languageId === "vue" || lowerFileName.endsWith(".vue")) {
    return "vue";
  }

  if (languageId === "css" || languageId === "scss" || languageId === "less") {
    return "css";
  }

  if (languageId === "html") {
    // Basic detection for Angular, though usually languageId for Angular HTML is 'html' or 'angular-html'
    return "html";
  }

  return "html";
}
