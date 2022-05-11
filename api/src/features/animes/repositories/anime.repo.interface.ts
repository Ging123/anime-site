import Anime from "../models/anime.model";

type anime = keyof Anime;

interface AnimeRepository {
  findByName:(name:string, select:anime[]) => Promise<any>;
  insert:(name:string, description:string, image:string, tags:any[]) => Promise<any>;
  deleteByName:(name:string) => Promise<any>;
  find:(page:number, asc:boolean) => Promise<any>;
  findByTagId:(page:number, asc:boolean, tagId:string) => Promise<any>;
}

export default AnimeRepository;