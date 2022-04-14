import { EmailModule } from "./features/email/modules/email.module";
import { UsersModule } from "./features/users/modules/users.module";
import throttler, { throttlerProvider } from "./configs/throttler";
import postgres from "./configs/postgres";
import { Module } from "@nestjs/common";
import bull from "./configs/bull";
import env from "./configs/env";

@Module({
  imports: [env, postgres, UsersModule, throttler, bull, EmailModule],
  providers: [throttlerProvider],
  controllers: [],
})
export class AppModule {}