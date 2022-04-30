import { Processor, Process, OnQueueFailed } from "@nestjs/bull";
import { tag } from "../../interfaces/tag.interface";
import TagRepo from "../../repositories/tag.repo";
import { Inject } from "@nestjs/common";
import { Job } from "bull";

@Processor("delete-tag-queue")
class DeleteTagConsumer {
  
  constructor(
    @Inject(TagRepo)
    private readonly tag:TagRepo
  ) {}

  @OnQueueFailed()
  error(err:Job) {
    console.log(`delete-tag-queue - ${err.failedReason}`);
  }

  @Process("delete-tag-job")
  async delete(job: Job<tag>) {
    const { name } = job.data;
    await this.tag.delete(name);
  }
}

export default DeleteTagConsumer;