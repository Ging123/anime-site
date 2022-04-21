import CreateAnimeConsumer from "../jobs/create_anime/consumer";
import CreateAnimeQueue from "../jobs/create_anime/queue";
import { BullModule } from "@nestjs/bull";

export default [
  CreateAnimeConsumer,
  CreateAnimeQueue
]

export const queues = BullModule.registerQueue(
  { name:"create-anime-queue" }
);