import { 
  Controller, 
  Delete, 
  HttpCode, 
  Param, 
  UseGuards, 
  ValidationPipe 
} from "@nestjs/common";

import { UserHasValidRole } from "../../../users/guards/user.has.valid.role.guard";
import DeleteAnimeService from "../../services/delete/delete.service";
import { AllowedRole } from "../../../users/decorators/role";
import DeleteDto from "./delete.dto";

@Controller()
export class DeleteController {

  constructor(private readonly anime:DeleteAnimeService) {}
  
  @Delete("animes/:name")
  @AllowedRole(["admin"])
  @UseGuards(UserHasValidRole)
  @HttpCode(204)
  async delete(@Param(new ValidationPipe()) param:DeleteDto) {
    const { name } = param;
    await this.anime.delete(name);
  }
}