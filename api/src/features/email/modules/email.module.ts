import { ConfirmController } from "../controllers/confirm/confirm.controller";
import { UsersModule } from "../../users/modules/users.module";
import { forwardRef, Module } from "@nestjs/common";
import User from "../../users/models/user.model";
import { TypeOrmModule } from "@nestjs/typeorm";
import Jwt from "../../../libs/token/jwt";
import { JwtModule } from "@nestjs/jwt";
import jobs, { queues } from "./jobs";
import guards from "./guards";

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([User]),
    queues,
    forwardRef(() => UsersModule)
  ],
  controllers: [ ConfirmController ],
  providers: [
    ...guards,
    ...jobs,
    {
      provide:Jwt,
      useClass:Jwt
    }
  ],
  exports:[...jobs, queues]
})

export class EmailModule {}