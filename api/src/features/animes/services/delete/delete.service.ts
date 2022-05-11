import CreateCacheQueue from "../../../cache/jobs/create_cache/queue";
import CacheManager from "../../../../libs/cache/cache.manager";

import DeleteAnimeQueue from "../../jobs/delete_anime/queue";
import { HttpException, Injectable } from "@nestjs/common";

import { join } from "path";
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
    await this.deleteAnimeFromDatabase(anime.name);
  }


  private async getAnime(name:string) {
    const animeDoesntExist = "This anime doesn't exists";
    const anime = await this.anime.findByName(name, ["name", "image"]);

    if(!anime) throw new HttpException(animeDoesntExist, 400);
    return anime;
  }


  private deleteImage(imageUrl:string) {
    const path = this.getImagePath(imageUrl);
    this.shell.deleteAnimeImage(path);
  }

  
  private getImagePath(imageUrl:string) {
    const urlArray = imageUrl.split('/');
    const lastIndex = urlArray.length - 1;

    const imageName = urlArray[lastIndex]
    const path = `/src/public/anime_images/${imageName}`;

    const fullPath = join(process.cwd(), path);
    return fullPath;
  }


  private async deleteAnimeFromDatabase(name:string) {
    const isInDevMode = process.env.STATUS === "DEV";
    if(isInDevMode) return await this.anime.deleteByName(name);
    this.animeToDelete.delete(name);
  }
}

export default DeleteAnimeService;