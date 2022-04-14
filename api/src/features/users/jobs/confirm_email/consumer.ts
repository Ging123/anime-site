import { Processor, Process, OnQueueFailed } from "@nestjs/bull";
import UserRepo from "../../repositories/user.repo";
import { Inject } from "@nestjs/common";
import { Job } from "bull";

interface data {
  email:string;
}

@Processor("confirm-email-queue")
class ConfirmEmailConsumer {
  
  constructor(
    @Inject(UserRepo)
    private readonly user:UserRepo
  ) {}

  @OnQueueFailed()
  error(err:Job) {
    console.log(`confirm-email-queue - ${err.failedReason}`);
  }

  @Process("confirm-email-job")
  async confirmEmail(job: Job<data>) {
    await this.user.confirmEmail(job.data.email);
  }
}

export default ConfirmEmailConsumer;