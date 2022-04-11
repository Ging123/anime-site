import {
  Controller,
  Post,
  ValidationPipe,
  Body,
  HttpCode,
} from "@nestjs/common";
import CreateUserService from "../../../services/users/create/create.service";
import CreateUserDto from "./create.dto";

@Controller()
export class CreateController {
  constructor(private readonly user: CreateUserService) {}

  @Post("users")
  @HttpCode(201)
  async create(@Body(new ValidationPipe()) user: CreateUserDto) {
    const { email, username, password } = user;
    const confirmationCode = await this.user.create(email, username, password);
    if(confirmationCode) return confirmationCode;
  }
}
