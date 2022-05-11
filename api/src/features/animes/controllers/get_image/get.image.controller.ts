import { Controller, Get, Param, Req, Res, ValidationPipe } from "@nestjs/common";
import { Request, Response } from "express";

import GetImageDto from "./get.image.dto";
import { join } from "path";

@Controller()
export class GetImageController {
  
  @Get("animes/image/:name")
  get(
    @Param(new ValidationPipe()) image:GetImageDto,
    @Req() req:Request,
    @Res() res:Response
  ) {
    const path = `/src/public/anime_images/${image.name}`;
    const fullPath = join(process.cwd(), path);

    res.sendFile(fullPath, (error) => {
      if(error) res.sendStatus(404);
    });
  }
}