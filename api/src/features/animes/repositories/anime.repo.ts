import AnimeRepository from "./anime.repo.interface";
import { InjectRepository } from "@nestjs/typeorm";
import Anime from "../models/anime.model";
import { Repository } from "typeorm";

class AnimeRepo implements AnimeRepository {

  @InjectRepository(Anime)
  private readonly anime:Repository<Anime>;

  public async findName(name:string) {
    return await this.anime.findOne(
      { name:name }, { select:["name"] }
    );
  }
  
  public async create(name:string, description = "", image:string) {
    return await this.anime.insert({
      name:name,
      description:description,
      image:image
    });
  }
}

export default AnimeRepo;