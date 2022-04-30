import DeleteTagQueue from "../../jobs/delete_tag/queue";
import { Injectable } from "@nestjs/common";
import Base from "../base";

@Injectable()
class DeleteTagService extends Base {

  constructor(private readonly queue:DeleteTagQueue) { super() }
  
  public async delete(name:string) {
    const isInDev = process.env.STATUS === "DEV";
    if(isInDev) return await this.tag.delete(name);
    this.queue.delete(name);
  }
}

export default DeleteTagService;