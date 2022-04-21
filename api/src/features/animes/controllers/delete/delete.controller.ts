import { 
  Controller, 
  Delete, 
  HttpCode, 
  Param, 
  UseGuards, 
  ValidationPipe 
} from "@nestjs/common";

import { UserIsAdminGuard } from "../../../users/guards/user.is.admin.guard";
import DeleteAnimeService from "../../services/delete/delete.service";
import DeleteDto from "./delete.dto";

@UseGuards(UserIsAdminGuard)
@Controller()
export class DeleteController {

  constructor(private readonly anime:DeleteAnimeService) {}
  
  @Delete("animes/:name")
  @HttpCode(204)
  async delete(@Param(new ValidationPipe()) param:DeleteDto) {
    const { name } = param;
    await this.anime.delete(name);
  }
}