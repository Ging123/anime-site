import GetAllTagsService from "../../services/get_all/get.all.service";
import { Controller, Get } from "@nestjs/common";

@Controller()
class GetAllController {

  constructor(
    private readonly tags:GetAllTagsService
  ) {}

  @Get("tags")
  async get() {
    return await this.tags.get();
  }
}

export default GetAllController;