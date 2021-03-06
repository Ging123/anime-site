import { 
  Body, 
  Controller, 
  HttpCode, 
  HttpException, 
  Post, 
  UploadedFile, 
  UseGuards, 
  UseInterceptors, 
  ValidationPipe
} from "@nestjs/common";

import { UserHasValidRole } from "../../../users/guards/user.has.valid.role.guard";
import CreateAnimeService from "../../services/create/create.service";
import ImageValidator from "../../../../utils/image.validator";
import { AllowedRole } from "../../../users/decorators/role";
import { FileInterceptor } from "@nestjs/platform-express";
import CreateDto from "./create.dto";

@Controller()
export class CreateController {

  constructor(
    private readonly anime:CreateAnimeService
  ) {}
   
  @Post("animes")
  @HttpCode(201)
  @AllowedRole(["admin"])
  @UseGuards(UserHasValidRole)
  @UseInterceptors(FileInterceptor("file", {
    dest:"src/public/anime_images",
    fileFilter:(req, file, cb:any) => {
      const validator = new ImageValidator();
      const isImage = validator.isImage(file.originalname, file.mimetype);
      if(isImage) return cb(null, true);
      cb(new HttpException("Image invalid", 400), false);
    }, 
    limits: {
      fileSize:20000000 /*20.000.000 bytes === 20mb*/,
      files:1
    }
  }))
  async create(
    @Body(new ValidationPipe()) anime:CreateDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    await this.anime.create(anime.name, anime.description, image, anime.tags);
  }
}