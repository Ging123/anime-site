import CreateCacheQueue from "../../../cache/jobs/create_cache/queue";
import CacheManager from "../../../../libs/cache/cache.manager";

import { Injectable } from "@nestjs/common";
import Tag from "../../models/tag.model";

import Base from "../base";

@Injectable()
class GetAllTagsService extends Base {

  constructor(
    private readonly cacheQueue:CreateCacheQueue,    
    private readonly cache:CacheManager
  ) { super() }
  

  public async get() {
    let tags = await this.getTagsInCache();

    if(!tags) {
      tags = await this.getTagsInDatabase();
      if(tags) await this.saveTagsInCache(tags);
    }

    return tags;
  }


  private async getTagsInCache() {
    const tags = await this.cache.get("tags");
    return tags;
  }


  private async getTagsInDatabase() {
    const tags = await this.tag.findAll();
    return tags;
  }

  
  private async saveTagsInCache(tags:Tag[]) {
    const isInDevMode = process.env.STATUS === "DEV";
    const fiveMinutes = 300//In seconds

    if(isInDevMode) return await this.cache.create("tags", tags, fiveMinutes);
    await this.cacheQueue.createCache("tags", tags, fiveMinutes);
  }
}

export default GetAllTagsService;