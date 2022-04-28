import { CreateController } from "../controllers/create/create.controller";
import { UpdateController } from "../controllers/update/update.controller";
import { DeleteController } from "../controllers/delete/delete.controller";
import { GetController } from "../controllers/get_one/get.one.controller";

export default [
  CreateController,
  DeleteController,
  GetController,
  UpdateController
]