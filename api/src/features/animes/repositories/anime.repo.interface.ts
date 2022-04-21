import Anime from "../models/anime.model";

type anime = keyof Anime;

interface AnimeRepository {
  findByName:(name:string, select:anime[]) => Promise<any>;
  create:(name:string, description:string, image:string) => Promise<any>;
}

export default AnimeRepository;