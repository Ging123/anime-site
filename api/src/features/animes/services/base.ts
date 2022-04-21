import AnimeRepo from "../repositories/anime.repo";
import { Inject } from "@nestjs/common";

class Base {
  @Inject(AnimeRepo)
  protected readonly anime:AnimeRepo;
}

export default Base;