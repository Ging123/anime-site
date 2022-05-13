import GetManyAnimesService from "../services/get_many/get.many.service";
import GetOneAnimeService from "../services/get_one/get.one.service";

import CreateAnimeService from "../services/create/create.service";
import DeleteAnimeService from "../services/delete/delete.service";

import UpdateAnimeService from "../services/update/update.service";

export default [
  CreateAnimeService, 
  DeleteAnimeService,
  GetManyAnimesService,
  UpdateAnimeService,
  GetOneAnimeService
];