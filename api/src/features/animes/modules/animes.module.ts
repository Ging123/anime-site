import { UsersModule } from "../../users/modules/users.module";
import { CacheModule } from "../../cache/module/cache.module";
import customProviders from "./custom.providers";
import { TypeOrmModule } from "@nestjs/typeorm";
import Anime from "../models/anime.model";
import { Module } from "@nestjs/common";
import controllers from "./controllers";
import jobs, { queues } from "./jobs";
import services from "./services";

@Module({
  imports:[
    TypeOrmModule.forFeature([Anime]), 
    CacheModule, 
    CacheModule, 
    queues,
    UsersModule
  ],
  controllers:controllers,
  providers: [ 
    ...services, 
    ...customProviders, 
    ...jobs 
  ]
})
export class AnimesModule {}