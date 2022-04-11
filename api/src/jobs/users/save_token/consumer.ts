import { Processor, Process, OnQueueFailed } from "@nestjs/bull";
import { InjectRepository } from "@nestjs/typeorm";
import User from "../../../models/user.model";
import { Repository } from "typeorm";
import { Job } from "bull";

interface data {
  id:string;
  token:string;
}

@Processor("save-user-token-queue")
class SaveUserTokenConsumer {
  
  constructor(
    @InjectRepository(User)
    protected readonly user: Repository<User>,
  ) {}

  @OnQueueFailed()
  error(err:Job) {
    console.log(`save-user-token-queue - ${err.failedReason}`);
  }

  @Process("save-user-token-job")
  async saveToken(job: Job<data>) {
    await this.user.update({ id:job.data.id }, { token:job.data.token });
  }
}

export default SaveUserTokenConsumer;