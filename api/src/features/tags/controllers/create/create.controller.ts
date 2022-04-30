import { 
  Body, 
  Controller, 
  HttpCode,
  Post,
  UseGuards,
  ValidationPipe 
} from "@nestjs/common";

import { UserHasValidRole } from "../../../users/guards/user.has.valid.role.guard";
import CreateTagService from "../../services/create/create.service";
import { AllowedRole } from "../../../users/decorators/role";
import CreateDto from "./create.dto";

@Controller()
class CreateController {

  constructor(private readonly tag:CreateTagService) {}

  @HttpCode(201)
  @Post("tags")
  @AllowedRole(["admin"])
  @UseGuards(UserHasValidRole)
  async create(@Body(new ValidationPipe()) tag:CreateDto) {
    await this.tag.create(tag.name);
  }
}

export default CreateController;