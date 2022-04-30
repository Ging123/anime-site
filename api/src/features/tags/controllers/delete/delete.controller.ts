import { 
  Controller, 
  Delete, 
  HttpCode, 
  Param, 
  UseGuards, 
  ValidationPipe 
} from "@nestjs/common";

import { UserHasValidRole } from "../../../users/guards/user.has.valid.role.guard";
import DeleteTagService from "../../services/delete/delete.service";
import { AllowedRole } from "../../../users/decorators/role";
import DeleteDto from "./delete.dto";

@Controller()
class DeleteController {

  constructor( private readonly tag:DeleteTagService ) {}
  
  @HttpCode(204)
  @Delete("tags/:name")
  @AllowedRole(["admin"])
  @UseGuards(UserHasValidRole)
  async delete(@Param(new ValidationPipe()) tag:DeleteDto) {
    await this.tag.delete(tag.name);
  }
}

export default DeleteController;