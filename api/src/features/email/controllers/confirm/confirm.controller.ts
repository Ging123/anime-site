import ConfirmUserEmailService from "../../../users/services/confirm_email/confirm.email.service";
import { Controller, Get, HttpCode, Query, UseGuards } from "@nestjs/common";
import CodeIsValidGuard from "../../guards/code.is.valid.guard";

interface data { code:string };

@Controller()
export class ConfirmController {

  constructor(
    private readonly user:ConfirmUserEmailService,
  ) {}
  
  @Get("email/confirm")
  @HttpCode(200)
  @UseGuards(CodeIsValidGuard)
  async confirm(@Query() data:data) {
    await this.user.confirmEmail(data.code);
  }
}