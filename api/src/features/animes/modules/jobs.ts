import DeleteAnimeConsumer from "../jobs/delete_anime/consumer";
import CreateAnimeConsumer from "../jobs/create_anime/consumer";
import DeleteAnimeQueue from "../jobs/delete_anime/queue";
import CreateAnimeQueue from "../jobs/create_anime/queue";
import { BullModule } from "@nestjs/bull";

export default [
  CreateAnimeConsumer,
  CreateAnimeQueue,
  DeleteAnimeConsumer,
  DeleteAnimeQueue
]

export const queues = BullModule.registerQueue(
  { name:"create-anime-queue" },
  { name:"delete-anime-queue" }
);