import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import Tag from "../models/tag.model";
import { Repository } from "typeorm";
import TagRepoInterface from "./tag.repo.interface";

type tag = keyof Tag;

@Injectable() 
class TagRepo implements TagRepoInterface {

  @InjectRepository(Tag)
  private readonly tag:Repository<Tag>;

  public async insert(name:string) {
    return await this.tag.insert({ name:name });
  }

  public async findByName(name:string, select:tag[]) {
    return await this.tag.findOne({ name:name }, { select:select })
  }

  public async findManyByName(name:string[]) {
    const query = this.createArrayWithNameObject(name);
    return await this.tag.find({ where:query });
  }

  private createArrayWithNameObject(name:string[]) {
    const _array = [];
    for(const tag of name) {
      _array.push({ name:tag });
    }
    return _array;
  }

  public async delete(name:string) {
    return await this.tag.delete({ name:name })
  }
}

export default TagRepo;