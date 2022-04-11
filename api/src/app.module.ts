import throttler, { throttlerProvider } from "./configs/throttler";
import { UsersModule } from "./modules/users/users.module";
import postgres from "./configs/postgres";
import { Module } from "@nestjs/common";
import bull from "./configs/bull";
import env from "./configs/env";

@Module({
  imports: [env, postgres, UsersModule, throttler, bull],
  providers: [throttlerProvider],
  controllers: [],
})
export class AppModule {}
