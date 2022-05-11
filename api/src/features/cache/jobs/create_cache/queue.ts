import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";

@Injectable()
class CreateCacheQueue {
  constructor(
    @InjectQueue("create-cache-queue") private queue: Queue
  ) {}

  public async createCache(key:string, value:any, timeInSeconds?:number) {
    const data = { key:key, data:value, timeInSeconds:timeInSeconds };
    await this.queue.add("create-cache-job", data);
  }
}

export default CreateCacheQueue;