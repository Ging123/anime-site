import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";

@Injectable()
class DeleteTagQueue {
  constructor(
    @InjectQueue("delete-tag-queue") private queue: Queue
  ) {}

  public async delete(name:string) {
    const data = { name:name };
    await this.queue.add("delete-tag-job", data, { attempts:3 });
  }
}

export default DeleteTagQueue;