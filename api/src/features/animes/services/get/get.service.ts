import CreateCacheQueue from "../../../cache/jobs/create_cache/queue";
import CacheManager from "../../../../libs/cache/cache.manager";

import { filter } from "../../interfaces/filter.interface";
import Anime from "../../models/anime.model";

import { Injectable } from "@nestjs/common";
import Base from "../base";

@Injectable()
class GetAnimeService extends Base {

  constructor(
    private readonly cacheQueue:CreateCacheQueue,    
    private readonly cache:CacheManager
  ) {super()}
  

  public async findOne(name:string) {
    return await this.anime.findByName(name, [ "name", "image", "description" ]);
  }


  public async findMany(filter:filter) {
    let animes = await this.findManyAnimesInCache(filter);

    if(!animes) {
      animes = await this.findManyAnimesInDatabase(filter);
      if(animes) await this.saveAnimesOnCache(animes, filter);;
    }
    
    return animes;
  }


  private async findManyAnimesInCache(filter:filter) {
    const key = this.getAnimeCacheKey(filter);
    const animes:Anime[]|undefined = await this.cache.get(key);
    return animes;
  }


  private async findManyAnimesInDatabase(filter:filter) {
    if(!filter.tagId) return await this.anime.find(filter.page, filter.asc);
    return await this.anime.findByTagId(filter.page, filter.asc, filter.tagId);
  }


  private async saveAnimesOnCache(animes:Anime[], filter:filter) {
    const key = this.getAnimeCacheKey(filter);
    const isInDevMode = process.env.STATUS === "DEV";
    const twoMinutes = 120; // in seconds 

    if(isInDevMode) return await this.cache.create(key, animes, twoMinutes);
    await this.cacheQueue.createCache(key, animes, twoMinutes);
  }


  private getAnimeCacheKey(filter:filter) {
    const page = filter.page || 1;
    const asc = filter.asc || true;

    if(!filter.tagId) return `animes-page-${page}-asc-${asc}`;
    return `animes-page-${page}-asc-${asc}-tag-${filter.tagId}`;
  }
}

export default GetAnimeService;