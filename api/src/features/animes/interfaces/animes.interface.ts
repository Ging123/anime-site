import Tag from "../../tags/models/tag.model";

export default interface anime {
  name:string;
  description?:string;
  image:string;
  tags:Tag[];
}