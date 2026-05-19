import * as vscode from "vscode";
import { detectFramework, Framework } from "../utils/frameworkDetector";

export class EditorService {
  public getActiveEditor(): vscode.TextEditor | undefined {
    return vscode.window.activeTextEditor;
  }

  public async insertTextAtCursor(text: string) {
    const editor = this.getActiveEditor();
    if (!editor) {
      this.showNoEditorMessage();
      return;
    }
    await editor.insertSnippet(new vscode.SnippetString(text));
  }

  public async replaceSelection(text: string) {
    const editor = this.getActiveEditor();
    if (!editor) {
      this.showNoEditorMessage();
      return;
    }
    const selection = editor.selection;
    await editor.edit((editBuilder) => {
      editBuilder.replace(selection, text);
    });
  }

  public getActiveDocumentFramework(): Framework {
    const editor = this.getActiveEditor();
    if (!editor) {
      return "html";
    }
    return detectFramework(editor.document.languageId, editor.document.fileName);
  }

  public documentContains(text: string): boolean {
    const editor = this.getActiveEditor();
    if (!editor) return false;
    return editor.document.getText().includes(text);
  }

  public showNoEditorMessage() {
    vscode.window.showWarningMessage("Abre un archivo para realizar esta acción.");
  }
}
