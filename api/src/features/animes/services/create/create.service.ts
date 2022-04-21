import CreateCacheQueue from "../../../cache/jobs/create_cache/queue";
import CacheManager from "../../../../libs/cache/cache.manager";
import CreateAnimeQueue from "../../jobs/create_anime/queue";
import { HttpException, Injectable } from "@nestjs/common";
import ShellJs from "../../../../libs/commands/shell_js";
import anime from "../../interfaces/animes.interface";
import Base from "../base";

type imageMulter = Express.Multer.File;

@Injectable()
class CreateAnimeService extends Base {

  private readonly shell = new ShellJs();

  constructor(
    private readonly queue:CreateCacheQueue,
    private readonly newAnime:CreateAnimeQueue,
    private readonly cache:CacheManager
  ) { super() }

  public async create(anime:string, description:string, image:imageMulter) {
    this.validateImage(image);
    await this.verifyIfAnimeAlreadyExist(anime, image);
    if(process.env.STATUS !== "DEV") this.saveAnimeOnCache(anime, description, image.destination);
    else await this.saveAnimeOnCache(anime, description, image.path);
    await this.saveAnimeOnDb(anime, description, image.path);
  }

  private validateImage(image:imageMulter) {
    const imageWasntSent = "Image wasn't sent";
    if(!image) throw new HttpException(imageWasntSent, 400);
  }

  private async verifyIfAnimeAlreadyExist(anime:string, image:imageMulter) {
    const animeExist = await this.anime.findName(anime);
    const animeAlreadyExist = "This anime already exists";
    if(!animeExist) return;
    this.shell.deleteAnimeImage(image.path)
    throw new HttpException(animeAlreadyExist, 400);
  }

  private async saveAnimeOnCache(anime:string, description:string, image:string) {
    const animesOnCache:anime[] = await this.cache.get("animes") || [];
    animesOnCache.push({
      name:anime,
      description:description,
      image:image
    });
    await this.queue.createCache("anime", animesOnCache);
  }

  private async saveAnimeOnDb(anime:string, description:string, image:string) {
    if(process.env.STATUS !== "DEV") return this.newAnime.create(anime, description, image);
    await this.newAnime.create(anime, description, image);
  }
}

export default CreateAnimeService;