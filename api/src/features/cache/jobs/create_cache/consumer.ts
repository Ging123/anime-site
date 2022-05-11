import { Processor, Process, OnQueueFailed } from "@nestjs/bull";
import CacheManager from "../../../../libs/cache/cache.manager";
import { Inject } from "@nestjs/common";
import { Job } from "bull";

interface data {
  key:string;
  data:any;
  timeInSeconds?:number;
}

@Processor("create-cache-queue")
class CreateCacheConsumer {
  
  constructor(
    @Inject(CacheManager)
    private readonly cache:CacheManager
  ) {}

  @OnQueueFailed()
  error(err:Job) {
    console.log(`create-cache-queue - ${err.failedReason}`);
  }

  @Process("create-cache-job")
  async createCache(job: Job<data>) {
    const { key, data, timeInSeconds } = job.data;
    await this.cache.create(key, data, timeInSeconds);
  }
}

export default CreateCacheConsumer;