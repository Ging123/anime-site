import CreateAnimeQueue from "../../jobs/create_anime/queue";
import { HttpException, Injectable } from "@nestjs/common";

import TagRepo from "../../../tags/repositories/tag.repo";
import Tag from "../../../tags/models/tag.model";

import Base from "../base";

type imageMulter = Express.Multer.File;

@Injectable()
class CreateAnimeService extends Base {

  constructor(
    private readonly newAnime:CreateAnimeQueue,
    private readonly tag:TagRepo
  ) { super() }

  public async create(anime:string, description:string, image:imageMulter, tags:string[]) {
    this.validateImage(image);
    await this.verifyIfAnimeAlreadyExist(anime, image.path);

    const animeTags = await this.verifyIfTagsExist(tags, image.path);
    const imageUrl = this.createUrlWithImage(image.filename);

    await this.saveAnimeOnDb(anime, description, imageUrl, animeTags);
  }


  private validateImage(image:imageMulter) {
    const imageWasntSent = "Image wasn't sent";
    if(!image) throw new HttpException(imageWasntSent, 400);
  }


  private async verifyIfAnimeAlreadyExist(anime:string, image:string) {
    const animeExist = await this.anime.findByName(anime, ["name"]);
    const animeAlreadyExist = "This anime already exists";

    if(!animeExist) return;
    this.shell.deleteAnimeImage(image);

    throw new HttpException(animeAlreadyExist, 400);
  }


  private async verifyIfTagsExist(tags:string[], image:string) {
    const someTagDoesntExists = "Some tag that you sent doesn't exist";
    const tagsFound = await this.tag.findManyByName(tags);

    const allTagsExists = tags.length === tagsFound.length;
    if(allTagsExists) return tagsFound; 

    this.shell.deleteAnimeImage(image)
    throw new HttpException(someTagDoesntExists, 400);
  }


  private createUrlWithImage(imageName:string) {
    const apiUrl = process.env.API_URL;
    const imageUrl = `${apiUrl}/animes/image/${imageName}`;
    return imageUrl;
  }


  private async saveAnimeOnDb(anime:string, description:string, image:string, tags:Tag[]) {
    const isInDevMode = process.env.STATUS === "DEV";
    if(isInDevMode) return await this.anime.insert(anime, description, image, tags);
    this.newAnime.create(anime, description, image, tags);
  }
}

export default CreateAnimeService;