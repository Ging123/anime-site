import ShellInterface from "./shell.interface";
import * as shell from "shelljs";

class ShellJs implements ShellInterface {
  
  public deleteAnimeImage(path:string) {
    shell.rm(path);
  }
}

export default ShellJs;