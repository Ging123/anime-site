import AnimeRepository from "./anime.repo.interface";
import { InjectRepository } from "@nestjs/typeorm";
import Anime from "../models/anime.model";
import { Repository } from "typeorm";

type anime = keyof Anime;

class AnimeRepo implements AnimeRepository {

  @InjectRepository(Anime)
  private readonly anime:Repository<Anime>;
  
  public async create(name:string, description = "", image:string) {
    return await this.anime.insert({
      name:name,
      description:description,
      image:image
    });
  }

  public async findByName(name:string, select:anime[]) {
    return await this.anime.findOne(
      { name:name }, { select:select }
    );
  }

  public async deleteByName(name:string) {
    return await this.anime.delete(
      { name:name }
    );
  }
}

export default AnimeRepo;