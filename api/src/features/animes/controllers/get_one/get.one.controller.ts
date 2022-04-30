import { Body, Controller, Get, ValidationPipe } from "@nestjs/common";
import GetUserService from "../../services/get/get.service";
import GetOneDto from "./get.one.dto";

@Controller()
export class GetController {

  constructor(private readonly anime:GetUserService) {}
  
  @Get("users/:name")
  async getOne(@Body(new ValidationPipe()) anime:GetOneDto) {
    return await this.anime.find(anime.name);
  }
}