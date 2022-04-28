import ConfirmEmailConsumer from "../jobs/confirm_email/consumer";
import SaveUserTokenConsumer from "../jobs/save_token/consumer";
import DeleteUserConsumer from "../jobs/delete_user/consumer";
import ConfirmEmailQueue from "../jobs/confirm_email/queue";
import SaveUserTokenQueue from "../jobs/save_token/queue";
import DeleteUserQueue from "../jobs/delete_user/queue";
import { BullModule } from "@nestjs/bull";


export default [
  SaveUserTokenQueue,
  SaveUserTokenConsumer,
  ConfirmEmailConsumer,
  ConfirmEmailQueue,
  DeleteUserConsumer,
  DeleteUserQueue
];

export const queues = BullModule.registerQueue(
  { name:"save-user-token-queue" },
  { name:"confirm-email-queue" },
  { name:"delete-user-queue" }
);