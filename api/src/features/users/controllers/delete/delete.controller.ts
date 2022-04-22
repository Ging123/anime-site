import { Controller, Delete, Headers, HttpCode, UseGuards } from "@nestjs/common";
import DeleteUserService from "../../services/delete/delete.service";
import { UserHasValidRole } from "../../guards/user.has.valid.role.guard";
import { AllowedRole } from "../../decorators/role";

@Controller()
export class DeleteController {

  constructor(private readonly user:DeleteUserService) {}

  @Delete("users")
  @AllowedRole(["admin", "user"])
  @UseGuards(UserHasValidRole)
  @HttpCode(204)
  async delete(@Headers() header) {
    const accessToken = header.authorization;
    await this.user.delete(accessToken);
  }
}