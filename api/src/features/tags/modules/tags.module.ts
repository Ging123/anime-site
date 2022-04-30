import customProviders from "./custom.providers";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import controllers from "./controllers";
import Tag from "../models/tag.model";
import jobs, { queues } from "./jobs";
import services from "./services";

@Module({
  imports:[ queues, TypeOrmModule.forFeature([Tag]), JwtModule.register({}), ],
  controllers:controllers,
  providers:[ ...customProviders, ...services, ...jobs ],
  exports:[ ...customProviders ]
})
export class TagsModule {}