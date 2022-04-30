import DeleteTagConsumer from "../jobs/delete_tag/consumer";
import CreateTagConsumer from "../jobs/create_tag/consumer";
import DeleteTagQueue from "../jobs/delete_tag/queue";
import CreateTagQueue from "../jobs/create_tag/queue";
import { BullModule } from "@nestjs/bull";

export default [
  CreateTagConsumer,
  CreateTagQueue,
  DeleteTagConsumer,
  DeleteTagQueue
];

export const queues = BullModule.registerQueue(
  { name:"create-tag-queue" },
  { name:"delete-tag-queue" } 
);