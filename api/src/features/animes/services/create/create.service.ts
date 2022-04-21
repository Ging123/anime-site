import CreateCacheQueue from "../../../cache/jobs/create_cache/queue";
import CacheManager from "../../../../libs/cache/cache.manager";
import CreateAnimeQueue from "../../jobs/create_anime/queue";
import { HttpException, Injectable } from "@nestjs/common";
import anime from "../../interfaces/animes.interface";
import Base from "../base";

type imageMulter = Express.Multer.File;

@Injectable()
class CreateAnimeService extends Base {

  constructor(
    private readonly queue:CreateCacheQueue,
    private readonly newAnime:CreateAnimeQueue,
    private readonly cache:CacheManager
  ) { super() }

  public async create(anime:string, description:string, image:imageMulter) {
    this.validateImage(image);
    await this.verifyIfAnimeAlreadyExist(anime, image);
    await this.saveOnCache(anime, description, image.path);
    await this.saveAnimeOnDb(anime, description, image.path);
  }

  private validateImage(image:imageMulter) {
    const imageWasntSent = "Image wasn't sent";
    if(!image) throw new HttpException(imageWasntSent, 400);
  }

  private async verifyIfAnimeAlreadyExist(anime:string, image:imageMulter) {
    const animeExist = await this.anime.findByName(anime, ["name"]);
    const animeAlreadyExist = "This anime already exists";
    if(!animeExist) return;
    this.shell.deleteAnimeImage(image.path)
    throw new HttpException(animeAlreadyExist, 400);
  }


  private async saveOnCache(anime:string, description:string, image:string) {
    const isInDevMode = process.env.STATUS === "DEV";
    if(!isInDevMode) return this.saveAnimeOnCache(anime, description, image);
    await this.saveAnimeOnCache(anime, description, image);
  }
  

  private async saveAnimeOnCache(anime:string, description:string, image:string) {
    const animesOnCache:anime[] = await this.cache.get("animes") || [];
    const isInDevMode = process.env.STATUS === "DEV";
    animesOnCache.push({
      name:anime,
      description:description,
      image:image
    });
    if(isInDevMode) return await this.cache.create("animes", animesOnCache);
    await this.queue.createCache("animes", animesOnCache);
  }

  private async saveAnimeOnDb(anime:string, description:string, image:string) {
    const isInDevMode = process.env.STATUS === "DEV";
    if(isInDevMode) return await this.anime.create(anime, description, image);
    this.newAnime.create(anime, description, image);
  }
}

export default CreateAnimeService;