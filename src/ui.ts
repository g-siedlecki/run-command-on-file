import * as vscode from "vscode";
import { PACKAGE_NAME, config } from "./extension";
export function createStatusBarItem() {
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    1
  );

  statusBarItem.text = config.getCommand()?.name || "Run command"; //todo: let user change name
  statusBarItem.command = `${PACKAGE_NAME}.runCommand`;
  statusBarItem.show();
  return statusBarItem;
}
