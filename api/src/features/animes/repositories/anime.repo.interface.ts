interface AnimeRepository {
  findName:(name:string) => Promise<any>;
  create:(name:string, description:string, image:string) => Promise<any>;
}

export default AnimeRepository;