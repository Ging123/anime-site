import { Body, Controller, Get, Res, ValidationPipe } from "@nestjs/common";
import GetAnimeService from "../../services/get/get.service";
import GetManyDto from "./get.many.dto";
import { Response } from "express";
import { join } from "path";

@Controller()
export class GetManyController {

  constructor ( private readonly anime:GetAnimeService ) {}

  @Get("animes")
  async getMany(
    @Body(new ValidationPipe()) filter:GetManyDto
  ) {
    return await this.anime.findMany(filter);
  }
}