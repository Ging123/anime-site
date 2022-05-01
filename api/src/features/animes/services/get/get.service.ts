import { Injectable } from "@nestjs/common";
import Base from "../base";

@Injectable()
class GetAnimeService extends Base {

  public async findOne(name:string) {
    return await this.anime.findByName(name, [ "name","image","description" ]);
  }
}

export default GetAnimeService;