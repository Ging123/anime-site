import SendConfirmationCodeConsumer from "../../email/jobs/send_confirmation_code/consumer";
import SendConfirmationCodeQueue from "../../email/jobs/send_confirmation_code/queue";
import { BullModule } from "@nestjs/bull";

export default [
  {
    provide:SendConfirmationCodeQueue,
    useClass:SendConfirmationCodeQueue
  },
  SendConfirmationCodeConsumer
];

export const queues = BullModule.registerQueue(
  { name:"send-confirmation-code-queue" }
);