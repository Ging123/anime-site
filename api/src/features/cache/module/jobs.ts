import CreateCacheConsumer from "../jobs/create_cache/consumer";
import CreateCacheQueue from "../jobs/create_cache/queue";
import { BullModule } from "@nestjs/bull";

export default [
  CreateCacheConsumer,
  CreateCacheQueue
];

export const queues = BullModule.registerQueue(
  { name:"create-cache-queue" }
);