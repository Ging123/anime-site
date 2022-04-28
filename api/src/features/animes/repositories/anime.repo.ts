import AnimeRepository from "./anime.repo.interface";
import { InjectRepository } from "@nestjs/typeorm";
import Tag from "../../tags/models/tag.model";
import Anime from "../models/anime.model";
import { Repository } from "typeorm";

type anime = keyof Anime;

class AnimeRepo implements AnimeRepository {

  @InjectRepository(Anime)
  private readonly anime:Repository<Anime>;
  
  public async insert(name:string, description="", image:string, tags:Tag[]) {
    const newAnime = this.anime.create();
    newAnime.name = name;
    newAnime.image = image;
    newAnime.description = description;
    newAnime.tags = tags;
    return await this.anime.save(newAnime);
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