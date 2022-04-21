import { Processor, Process, OnQueueFailed } from "@nestjs/bull";
import CacheManager from "../../../../libs/cache/cache.manager";
import { Inject } from "@nestjs/common";
import { Job } from "bull";

interface data {
  key:string;
}

@Processor("delete-cache-queue")
class DeleteCacheConsumer {
  
  constructor(
    @Inject(CacheManager)
    private readonly cache:CacheManager
  ) {}

  @OnQueueFailed()
  error(err:Job) {
    console.log(`delete-cache-queue - ${err.failedReason}`);
  }

  @Process("delete-cache-job")
  async deleteCache(job: Job<data>) {
    const { key } = job.data;
    await this.cache.delete(key);
  }
}

export default DeleteCacheConsumer;