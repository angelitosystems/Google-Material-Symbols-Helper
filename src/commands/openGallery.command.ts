import * as vscode from "vscode";
import { IconService } from "../services/icon.service";
import { InsertService } from "../services/insert.service";
import { EditorService } from "../services/editor.service";
import { GalleryPanel } from "../webviews/galleryPanel";

export function registerOpenGalleryCommand(
  extensionUri: vscode.Uri,
  iconService: IconService,
  insertService: InsertService,
  editorService: EditorService
): vscode.Disposable {
  return vscode.commands.registerCommand(
    "google-material-symbols-helper.openGallery",
    () => {
      GalleryPanel.createOrShow(extensionUri, iconService, insertService, editorService);
    },
  );
}
