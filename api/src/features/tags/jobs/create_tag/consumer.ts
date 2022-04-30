import { Processor, Process, OnQueueFailed } from "@nestjs/bull";
import { tag } from "../../interfaces/tag.interface";
import TagRepo from "../../repositories/tag.repo";
import { Inject } from "@nestjs/common";
import { Job } from "bull";

@Processor("create-tag-queue")
class CreateTagConsumer {
  
  constructor(
    @Inject(TagRepo)
    private readonly tag:TagRepo
  ) {}

  @OnQueueFailed()
  error(err:Job) {
    console.log(`create-tag-queue - ${err.failedReason}`);
  }

  @Process("create-tag-job")
  async create(job: Job<tag>) {
    const { name } = job.data;
    await this.tag.insert(name);
  }
}

export default CreateTagConsumer;