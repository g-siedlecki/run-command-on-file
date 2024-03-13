import * as vscode from "vscode";
import { PACKAGE_NAME } from "./extension";

const CONFIG_KEY = "commands";
export class Config {
  config: vscode.WorkspaceConfiguration;
  constructor() {
    this.config = this.getConfig();
  }

  getConfig() {
    this.config = vscode.workspace.getConfiguration(PACKAGE_NAME);
    return this.config;
  }

  get(): ConfigType[] {
    this.getConfig();
    const commandData = this.config.get(CONFIG_KEY) as ConfigType[];
    return commandData;
  }

  getCommands() {
    const commands = this.get();
    return commands||[];
  }
}

export type ConfigType = {
  name: string;
  command: string;
};
