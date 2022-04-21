import DeleteCacheConsumer from "../jobs/delete_cache/consumer";
import CreateCacheConsumer from "../jobs/create_cache/consumer";
import DeleteCacheQueue from "../jobs/delete_cache/queue";
import CreateCacheQueue from "../jobs/create_cache/queue";
import { BullModule } from "@nestjs/bull";

export default [
  CreateCacheConsumer,
  CreateCacheQueue,
  DeleteCacheConsumer,
  DeleteCacheQueue
];

export const queues = BullModule.registerQueue(
  { name:"create-cache-queue" },
  { name:"delete-cache-queue" }
);