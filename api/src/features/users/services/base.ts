import UserRepo from "../repositories/user.repo";
import Bcrypt from "../../../libs/hash/bcrypt";
import Jwt from "../../../libs/token/jwt";
import { Inject } from "@nestjs/common";

class Base {

  protected readonly bcrypt = new Bcrypt();
  
  constructor(
    @Inject(UserRepo)
    protected readonly user:UserRepo,
    protected readonly jwt: Jwt
  ) {}
}

export default Base;