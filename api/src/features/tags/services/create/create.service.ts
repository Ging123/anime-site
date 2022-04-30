import { HttpException, Injectable } from "@nestjs/common";
import CreateTagQueue from "../../jobs/create_tag/queue";
import Base from "../base";

@Injectable()
class CreateTagService extends Base {

  constructor (
    private readonly newTag:CreateTagQueue
  ) {super()}

  public async create(name:string) {
    await this.verifyIfTagAlreadyExists(name);
    await this.createTag(name);
  }

  private async verifyIfTagAlreadyExists(name:string) {
    const tagAlreadyExist = "This tag already exists";
    const tag = await this.tag.findByName(name, ["name"]);
    if(tag) throw new HttpException(tagAlreadyExist, 400);
  }

  private async createTag(name:string) {
    const isInDev = process.env.STATUS === "DEV";
    if(isInDev) return await this.tag.insert(name);
    this.newTag.create(name);
  }
}

export default CreateTagService;