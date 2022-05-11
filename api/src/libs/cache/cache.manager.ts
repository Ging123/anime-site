import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import CacheInterface from "./cache.interface";
import { Cache } from "cache-manager";

const fiveMinutes = 300; //SECONDS

@Injectable()
class CacheManager implements CacheInterface {

  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cache:Cache
  ) {}

  public async create(key:string, value:any, timeInSeconds=fiveMinutes) {
    return await this.cache.set(key, value, {ttl:timeInSeconds});
  }

  public async get(key:string):Promise<any> {
    return await this.cache.get(key);
  }

  public async delete(key:string) {
    return await this.cache.del(key);
  }
}

export default CacheManager;