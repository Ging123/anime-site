import { Body, Controller, HttpCode, Post, ValidationPipe } from "@nestjs/common";
import LoginService from "../../services/login/login.service";
import LoginDto from "./login.dto";

@Controller()
export class LoginController {
  constructor(private readonly user: LoginService) {}

  @Post("users/login")
  @HttpCode(201)
  async login(@Body(new ValidationPipe()) user: LoginDto) {
    const { emailOrUsername, password } = user;
    const token = await this.user.login(emailOrUsername, password);
    return token;
  }
}