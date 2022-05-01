import { Param, Controller, Get, ValidationPipe } from "@nestjs/common";
import GetUserService from "../../services/get/get.service";
import GetOneDto from "./get.one.dto";

@Controller()
export class GetOneController {

  constructor(private readonly anime:GetUserService) {}
  
  @Get("animes/:name")
  async getOne(@Param(new ValidationPipe()) anime:GetOneDto) {
    return await this.anime.findOne(anime.name);
  }
}