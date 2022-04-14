import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";

@Injectable()
class ConfirmEmailQueue {
  constructor(
    @InjectQueue("confirm-email-queue") private queue: Queue
  ) {}

  public async confirmEmail(email:string) {
    await this.queue.add("confirm-email-job", { email:email });
  }
}

export default ConfirmEmailQueue;