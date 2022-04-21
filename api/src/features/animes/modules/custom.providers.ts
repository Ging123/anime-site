import AnimeRepo from "../repositories/anime.repo";

export default [
  {
    provide:AnimeRepo,
    useClass:AnimeRepo
  }
];