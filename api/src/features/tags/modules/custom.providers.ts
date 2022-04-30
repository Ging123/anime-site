import TagRepo from "../repositories/tag.repo";
import Jwt from "../../../libs/token/jwt";

export default [
  {
    provide:TagRepo,
    useClass:TagRepo
  },
  {
    provide:Jwt,
    useClass:Jwt
  }
]