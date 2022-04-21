import ShellJs from "../../../libs/commands/shell_js";
import AnimeRepo from "../repositories/anime.repo";
import { Inject } from "@nestjs/common";

class Base {

  protected readonly shell = new ShellJs();

  @Inject(AnimeRepo)
  protected readonly anime:AnimeRepo;
}

export default Base;