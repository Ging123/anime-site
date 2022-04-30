import { Processor, Process, OnQueueFailed } from "@nestjs/bull";
import UserRepo from "../../repositories/user.repo";
import { Inject } from "@nestjs/common";
import { Job } from "bull";

interface data {
  id:string;
}

@Processor("delete-user-queue")
class DeleteUserConsumer {
  
  constructor(
    @Inject(UserRepo)
    private readonly user:UserRepo
  ) {}

  @OnQueueFailed()
  error(err:Job) {
    console.log(`delete-user-queue - ${err.failedReason}`);
  }

  @Process("delete-user-job")
  async delete(job: Job<data>) {
    await this.user.deleteById(job.data.id);
  }
}

export default DeleteUserConsumer;