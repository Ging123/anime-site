import { Processor, Process, OnQueueFailed } from "@nestjs/bull";
import UserRepo from "../../repositories/user.repo";
import { Inject } from "@nestjs/common";
import { Job } from "bull";

interface data {
  id:string;
  token:string;
}

@Processor("save-user-token-queue")
class SaveUserTokenConsumer {
  
  constructor(
    @Inject(UserRepo)
    private readonly user:UserRepo
  ) {}

  @OnQueueFailed()
  error(err:Job) {
    console.log(`save-user-token-queue - ${err.failedReason}`);
  }

  @Process("save-user-token-job")
  async saveToken(job: Job<data>) {
    await this.user.saveToken(job.data.id, job.data.token );
  }
}

export default SaveUserTokenConsumer;