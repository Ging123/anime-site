import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";

@Injectable()
class CreateTagQueue {
  constructor(
    @InjectQueue("create-tag-queue") private queue: Queue
  ) {}

  public async create(name:string) {
    const data = { name:name };
    await this.queue.add("create-tag-job", data, { attempts:3 });
  }
}

export default CreateTagQueue;