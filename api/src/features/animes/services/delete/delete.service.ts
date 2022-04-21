import CreateCacheQueue from "../../../cache/jobs/create_cache/queue";
import CacheManager from "../../../../libs/cache/cache.manager";
import DeleteAnimeQueue from "../../jobs/delete_anime/queue";
import { HttpException, Injectable } from "@nestjs/common";
import Base from "../base";

@Injectable()
class DeleteAnimeService extends Base {

  constructor(
    private readonly newCache:CreateCacheQueue,
    private readonly animeInCache:CacheManager,
    private readonly animeToDelete:DeleteAnimeQueue
  ) {super()}

  public async delete(name:string) {
    const anime = await this.getAnime(name);
    this.deleteImage(anime.image);
    await this.deleteFromCache(name);
    await this.deleteAnimeFromDatabase(anime.name);
  }

  private async getAnime(name:string) {
    const animeDoesntExist = "This anime doesn't exists";
    const anime = await this.anime.findByName(name, ["name", "image"]);
    if(!anime) throw new HttpException(animeDoesntExist, 400);
    return anime;
  }

  private deleteImage(path:string) {
    this.shell.deleteAnimeImage(path);
  }

  private async deleteFromCache(name:string) {
    const isInDevMode = process.env.STATUS === "DEV";
    if(isInDevMode) return await this.deleteAnimeFromCache(name);
    this.deleteAnimeFromCache(name);
  }

  private async deleteAnimeFromCache(name:string) {
    const isInDevMode = process.env.STATUS === "DEV";
    let animesInCache = await this.animeInCache.get("animes");
    animesInCache = animesInCache.filter((anime) => anime.name !== name);
    if(isInDevMode) return await this.animeInCache.create("animes", animesInCache);
    this.newCache.createCache("animes", animesInCache);
  }

  private async deleteAnimeFromDatabase(name:string) {
    const isInDevMode = process.env.STATUS === "DEV";
    if(isInDevMode) return await this.anime.deleteByName(name);
    this.animeToDelete.delete(name);
  }
}

export default DeleteAnimeService;