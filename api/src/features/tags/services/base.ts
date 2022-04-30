import TagRepo from "../repositories/tag.repo";
import { Inject } from "@nestjs/common";

class Base {

  @Inject(TagRepo)
  protected readonly tag:TagRepo;
}

export default Base;