import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";

@Injectable()
class DeleteUserQueue {
  constructor(
    @InjectQueue("delete-user-queue") private queue: Queue
  ) {}

  public async delete(id:string) {
    await this.queue.add("delete-user-job", { id:id });
  }
}

export default DeleteUserQueue;