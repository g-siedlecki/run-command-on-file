import * as vscode from "vscode";
import { ConfigType } from "./config";
import { PACKAGE_NAME } from "./extension";
export function createStatusBarItem(command:ConfigType) {
  if (!command) return;
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    1
  );
  
  statusBarItem.text = command.name;
  statusBarItem.command = `${PACKAGE_NAME}.runCommand.${command.command}`;
  statusBarItem.show();
  return statusBarItem;
}
