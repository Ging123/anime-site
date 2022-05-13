import { Param, Controller, Get, ValidationPipe } from "@nestjs/common";
import GetOneAnimeService from "../../services/get_one/get.one.service";
import GetOneDto from "./get.one.dto";

@Controller()
export class GetOneController {

  constructor(private readonly anime:GetOneAnimeService) {}
  
  @Get("animes/:name")
  async getOne(@Param(new ValidationPipe()) anime:GetOneDto) {
    return await this.anime.get(anime.name);
  }
}