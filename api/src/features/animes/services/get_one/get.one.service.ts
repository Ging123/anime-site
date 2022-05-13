import CreateCacheQueue from "../../../cache/jobs/create_cache/queue";
import CacheManager from "../../../../libs/cache/cache.manager";

import Anime from "../../models/anime.model";
import { Injectable } from "@nestjs/common";

import Base from "../base";

@Injectable()
class GetOneAnimeService extends Base {

  constructor(
    private readonly cacheQueue:CreateCacheQueue,    
    private readonly cache:CacheManager
  ) {super()}


  public async get(name:string) {
    let anime = await this.findAnimeInCache(name);

    if(!anime) {
      anime = await this.findAnimeInDatabase(name);
      if(anime) await this.saveAnimeOnCache(anime);
    }

    return anime;
  }

  
  private async findAnimeInCache(name:string) {
    const key = `anime-${name}`;
    const anime:Anime|undefined = await this.cache.get(key);
    return anime;
  }


  private async findAnimeInDatabase(name:string) {
    return await this.anime.findByName(name, [ "name", "image", "description" ]);
  }


  private async saveAnimeOnCache(anime:Anime) {
    const key = `anime-${anime.name}`;
    const isInDevMode = process.env.STATUS === "DEV";
    const thirtyMinutes = 1800 //In secs

    if(isInDevMode) return await this.cache.create(key, anime, thirtyMinutes);
    await this.cacheQueue.createCache(key, anime, thirtyMinutes);
  }
}

export default GetOneAnimeService;