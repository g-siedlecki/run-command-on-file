import * as vscode from "vscode";
import { PACKAGE_NAME } from "./extension";
import { Command } from "./command";

const CONFIG_KEY = "command";
export class Config {
  config: vscode.WorkspaceConfiguration;
  constructor() {
    this.config = this.getConfig();
  }

  getConfig() {
    this.config = vscode.workspace.getConfiguration(PACKAGE_NAME);
    return this.config;
  }

  get(): ConfigType {
    this.getConfig();
    const commandData = this.config.get(CONFIG_KEY) as ConfigType;
    return commandData;
  }

  getCommand() {
    const command = this.get();
    return command;
  }
}

type ConfigType = {
  name: string;
  command: string;
};
