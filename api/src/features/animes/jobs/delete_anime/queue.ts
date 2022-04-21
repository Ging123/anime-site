import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";

@Injectable()
class DeleteAnimeQueue {
  constructor(
    @InjectQueue("delete-anime-queue") private queue: Queue
  ) {}

  public async delete(name:string) {
    const data = { name:name }
    await this.queue.add("delete-anime-job", data, { attempts:3 });
  }
}

export default DeleteAnimeQueue;