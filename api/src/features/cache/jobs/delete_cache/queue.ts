import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";

@Injectable()
class DeleteCacheQueue {
  constructor(
    @InjectQueue("delete-cache-queue") private queue: Queue
  ) {}

  public async deleteCache(key:string) {
    await this.queue.add("delete-cache-job", { key:key });
  }
}

export default DeleteCacheQueue;