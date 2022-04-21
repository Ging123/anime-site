import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";

@Injectable()
class CreateCacheQueue {
  constructor(
    @InjectQueue("create-cache-queue") private queue: Queue
  ) {}

  public async createCache(key:string, data:any) {
    await this.queue.add("create-cache-job", { key:key, data:data });
  }
}

export default CreateCacheQueue;