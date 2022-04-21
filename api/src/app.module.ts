import { AnimesModule } from "./features/animes/modules/animes.module";
import { EmailModule } from "./features/email/modules/email.module";
import { UsersModule } from "./features/users/modules/users.module";
import { CacheModule } from "./features/cache/module/cache.module";
import throttler, { throttlerProvider } from "./configs/throttler";
import cacheManager from "./configs/cache.manager";
import postgres from "./configs/postgres";
import { Module } from "@nestjs/common";
import bull from "./configs/bull";
import env from "./configs/env";

@Module({
  imports: [
    env, 
    postgres, 
    UsersModule, 
    throttler, 
    bull, 
    EmailModule, 
    AnimesModule,
    cacheManager,
    CacheModule
  ],
  providers: [throttlerProvider],
  controllers: [],
})
export class AppModule {}