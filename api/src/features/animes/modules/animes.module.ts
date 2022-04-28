import { UsersModule } from "../../users/modules/users.module";
import { CacheModule } from "../../cache/module/cache.module";
import { TagsModule } from "../../tags/modules/tags.module";
import customProviders from "./custom.providers";
import { TypeOrmModule } from "@nestjs/typeorm";
import Tag from "../../tags/models/tag.model";
import Anime from "../models/anime.model";
import { Module } from "@nestjs/common";
import controllers from "./controllers";
import jobs, { queues } from "./jobs";
import services from "./services";

@Module({
  imports:[
    TypeOrmModule.forFeature([Anime, Tag]), 
    CacheModule, 
    queues,
    UsersModule,
    TagsModule
  ],
  controllers:controllers,
  providers: [ 
    ...services, 
    ...customProviders, 
    ...jobs 
  ]
})
export class AnimesModule {}