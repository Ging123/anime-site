import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";

@Injectable()
class SendConfirmationCodeQueue {
  constructor(
    @InjectQueue("send-confirmation-code-queue") private queue: Queue
  ) {}

  public async sendConfirmationCode(to:string, code:string) {
    const data = { to:to, code:code };
    await this.queue.add("send-confirmation-code-job", data);
  }
}

export default SendConfirmationCodeQueue;