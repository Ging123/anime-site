import { TypeOrmModule } from "@nestjs/typeorm";
import User from "../../models/user.model";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import controllers from "./controllers";
import jobs, { queues } from "./jobs";
import servicies from "./servicies";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    queues,
    JwtModule.register({})
  ],
  controllers: [...controllers],
  providers: [
    ...jobs,
    ...servicies
  ],
})

export class UsersModule {}