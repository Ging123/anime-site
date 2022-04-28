import { Injectable } from "@nestjs/common";
import Base from "../base";

@Injectable()
class GetAnimeService extends Base {

  public async find(name:string) {
    return await this.anime.findByName(name, [
      "id","name","image","description"
    ]);
  }
}

export default GetAnimeService;