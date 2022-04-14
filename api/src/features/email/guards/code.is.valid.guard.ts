import { 
  Injectable, 
  CanActivate, 
  ExecutionContext, 
  HttpException 
} from '@nestjs/common';

import GetUserService from "../../users/services/users/get/get.service";
import Jwt from "../../../libs/token/jwt";

@Injectable()
class CodeIsValidGuard implements CanActivate {

  constructor(
    private readonly user:GetUserService,
    private readonly jwt:Jwt
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const code = req.query.code;
    const email = this.validateToken(code);
    await this.validateIfOwnerOfCodeIsConfirmed(email);
    return true;
  }

  private validateToken(code:string) {
    try {
      const codeData = this.jwt.convert(code, process.env.EMAIL_SECRET);
      return codeData.email;
    }
    catch(err) {
      const jwtExpired = "jwt expired";
      const error = err.message;
      if(error === jwtExpired) throw new HttpException("Code expired", 401);
      throw new HttpException("Code invalid", 400);
    }
  }

  private async validateIfOwnerOfCodeIsConfirmed(email:string) {
    const user = await this.user.getByEmail(email);
    if(!user) throw new HttpException("User doesn't exists", 400);
    if(user.confirmed) throw new HttpException("User already confirmed", 403);
  }
}

export default CodeIsValidGuard;