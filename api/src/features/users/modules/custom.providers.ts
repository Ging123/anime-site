import UserRepo from "../repositories/user.repo"
import Jwt from "../../../libs/token/jwt";

export default [
  {
    provide:UserRepo,
    useClass:UserRepo 
  },
  {
    provide:Jwt,
    useClass:Jwt
  }
];