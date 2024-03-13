// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { exec } from "child_process";
import * as vscode from "vscode";
import { Config } from "./config";
import { createStatusBarItem } from "./ui";
import { Command } from "./command";

export const PACKAGE_NAME = "run-command-on-file";

export const config = new Config();
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "run-command-on-file" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  // const command = createCommand();

  for (const command of config.getCommands()) {
    const item = createStatusBarItem(command);
    context.subscriptions.push(createCommand(command.command));
    if (item) {
      context.subscriptions.push(item);
    }
  }
}

// This method is called when your extension is deactivated
export function deactivate() {}

function createCommand(command: string) {
  const commandId = `${PACKAGE_NAME}.runCommand.${command}`;
  return vscode.commands.registerCommand(commandId, () =>
    onCommandHandler(command)
  );
}

function onCommandHandler(command: string) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showInformationMessage("No active editor");
    return;
  }
  const document = editor.document;

  if (document.isUntitled) {
    vscode.window.showInformationMessage("Please save the file first");
    return;
  }

  const commandObject = new Command(command);
  commandObject.execute().then((output) => {
    vscode.window.showInformationMessage(output);
  });
}
