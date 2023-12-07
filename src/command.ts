import { exec } from "child_process";
import * as vscode from "vscode";

export class Command {
  name: string;
  arguments: Record<string, string | undefined>;
  constructor(
    command: string,
    args?: string | Record<string, string | undefined>
  ) {
    this.name = command;
    this.arguments = this.createArguments(args);
    const fileName = vscode.window.activeTextEditor?.document.fileName;
    if (fileName) {
      this.arguments = { ...this.arguments, [fileName]: undefined };
    }
  }

  async execute(): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(this.getCommand(), (error, stdout, stderr) => {
        if (error || stderr) {
          reject((error || stderr) as string);
        }
        resolve(stdout as string);
      });
    });
  }

  private getCommand() {
    return `${this.name} ${this.getArguments()}`;
  }

  private getArguments() {
    return Object.entries(this.arguments).reduce((acc, [key, value]) => {
      if (!key && !value) {
        return acc;
      }
      if (!value) {
        return `${acc} ${key}`;
      }
      return `${acc} ${key}=${value}`;
    }, "");
  }

  private createArguments(
    args?: string | Record<string, string | undefined>
  ): Record<string, string | undefined> {
    if (!args) {
      return {};
    }
    if (typeof args === "string") {
      return { [args]: undefined };
    }
    return args;
  }
}
