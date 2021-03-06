import Tag from "../../../tags/models/tag.model";
import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";

@Injectable()
class CreateAnimeQueue {
  constructor(
    @InjectQueue("create-anime-queue") private queue: Queue
  ) {}

  public async create(name:string, description="", image:string, tags:Tag[]) {
    const data = {
      name:name,
      description:description,
      image:image,
      tags:tags
    }
    await this.queue.add("create-anime-job", data, { attempts:3 });
  }
}

export default CreateAnimeQueue;