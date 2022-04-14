import ConfirmUserEmailService from "../services/users/confirm_email/confirm.email.service";
import { EmailModule } from "../../../features/email/modules/email.module";
import GetUserService from "../services/users/get/get.service";
import { forwardRef, Module } from "@nestjs/common";
import customProviders from "./custom.providers";
import { TypeOrmModule } from "@nestjs/typeorm";
import User from "../models/user.model";
import { JwtModule } from "@nestjs/jwt";
import controllers from "./controllers";
import jobs, { queues } from "./jobs";
import servicies from "./servicies";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({}),
    queues, 
    forwardRef(() => EmailModule)
  ],
  controllers: [...controllers],
  providers: [
    ...servicies,
    ...jobs,
    ...customProviders
  ],
  exports:[
    ...jobs, 
    queues, 
    GetUserService,
    ConfirmUserEmailService
  ]
})

export class UsersModule {}