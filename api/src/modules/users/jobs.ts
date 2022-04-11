import SendConfirmationCodeConsumer from "../../jobs/email/send_confirmation_code/consumer";
import SendConfirmationCodeQueue from "../../jobs/email/send_confirmation_code/queue";
import SaveUserTokenConsumer from "../../jobs/users/save_token/consumer";
import SaveUserTokenQueue from "../../jobs/users/save_token/queue";
import { BullModule } from "@nestjs/bull";

export default [
  SaveUserTokenQueue,
  SaveUserTokenConsumer,
  SendConfirmationCodeConsumer,
  SendConfirmationCodeQueue
];

export const queues = BullModule.registerQueue(
  { name:"save-user-token-queue" },
  { name:"send-confirmation-code-queue" }
);