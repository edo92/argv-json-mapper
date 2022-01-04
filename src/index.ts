import * as path from "path";
import * as fs from "fs";
import { ErrHandler } from "./errors";

export interface IModifier {
  readonly filePath: string;
  readonly jsonFile: Argvs;
  modify: (callback: (argvs: string[]) => Argvs) => void;
}

export class Modifier implements IModifier {
  public readonly filePath: string;
  public readonly jsonFile: Argvs;
  private readonly argvs: string[];

  constructor(filePath: string) {
    this.argvs = process.argv.splice(2);
    this.filePath = path.resolve(filePath);
    this.jsonFile = require(this.filePath);
  }

  public modify(callback: (argv: string[]) => Argvs): void {
    const params = callback(this.argvs);
    this.modifyParams(params);
    this.writeToJson();
  }

  private setEachParam(params: Argvs) {
    Object.keys(params).map((param) => {
      if (!params[param]) throw new ErrHandler("emptyParam");
      this.jsonFile[param] = params[param];
    });
  }

  private modifyParams(params: Argvs): void {
    if (!this.jsonFile) throw new ErrHandler("emptyJson");
    this.setEachParam(params);
  }

  private writeToJson(): void {
    const jsonFile = JSON.stringify(this.jsonFile);
    Promise.resolve(fs.writeFileSync(this.filePath, jsonFile));
  }
}
