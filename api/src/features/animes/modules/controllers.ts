import { GetImageController } from "../controllers/get_image/get.image.controller";
import { GetManyController } from "../controllers/get_many/get.many.controller";
import { GetOneController } from "../controllers/get_one/get.one.controller";
import { CreateController } from "../controllers/create/create.controller";
import { UpdateController } from "../controllers/update/update.controller";
import { DeleteController } from "../controllers/delete/delete.controller";

export default [
  CreateController,
  DeleteController,
  GetOneController,
  UpdateController,
  GetManyController,
  GetImageController
];