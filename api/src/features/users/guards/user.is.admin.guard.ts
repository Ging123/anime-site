import { Injectable, CanActivate, ExecutionContext, Inject, HttpException } from '@nestjs/common';
import Jwt from "../../../libs/token/jwt";

interface user {
  id:string;
  role:"admin"|"user";
}

@Injectable()
export class UserIsAdminGuard implements CanActivate {
  constructor(
    @Inject(Jwt)
    private readonly token:Jwt
  ) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers.authorization;
    const user = this.convertToken(accessToken);
    this.validateUserRole(user.role);
    return true;
  }

  private convertToken(accessToken:string) {
    try {
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const user:user = this.token.convert(accessToken, secret);
      return user;
    }
    catch(err) {
      const jwtExpired = "jwt expired";
      const error = err.message;
      if(error === jwtExpired) throw new HttpException("Token expired", 401);
      throw new HttpException("Token invalid", 400);
    }
  }

  private validateUserRole(role:"admin"|"user") {
    const youAreNotAnAdmin = "You must be admin to access this rote";
    if(role !== "admin") throw new HttpException(youAreNotAnAdmin, 403); 
  }
}