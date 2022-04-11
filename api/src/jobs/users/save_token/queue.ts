import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";

@Injectable()
class SaveUserTokenQueue {
  constructor(
    @InjectQueue("save-user-token-queue") private queue: Queue
  ) {}

  public async saveToken(id:string, refreshToken:string) {
    await this.queue.add("save-user-token-job", { id:id, token:refreshToken });
  }
}

export default SaveUserTokenQueue;