import Tag from "../models/tag.model";

type tag = keyof Tag;

export default interface TagRepoInterface {
  insert:(name:string) => Promise<any>;
  findByName:(name:string, select:tag[]) => Promise<any>;
  findManyByName:(name:string[]) => Promise<any>;
  delete:(name:string) => Promise<any>;
}