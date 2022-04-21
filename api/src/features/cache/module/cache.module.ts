import CacheManager from "../../../libs/cache/cache.manager";
import { Module } from "@nestjs/common";
import jobs, { queues } from "./jobs";

const cache = { provide:CacheManager, useClass:CacheManager }

@Module({
  imports:[ queues ],
  providers:[ cache, ...jobs ],
  exports:[ cache, queues, ...jobs ]
})
export class CacheModule {}