import { Injectable, CanActivate, ExecutionContext, Inject, HttpException } from '@nestjs/common';
import Jwt from "../../../libs/token/jwt";
import { role } from '../interfaces/user';
import { Reflector } from '@nestjs/core';

interface user {
  id:string;
  role:role;
}

@Injectable()
export class UserHasValidRole implements CanActivate {
  constructor(
    @Inject(Jwt)
    private readonly token:Jwt,
    private readonly reflector: Reflector
  ) {}

  canActivate(context: ExecutionContext) {
    const validRole = this.reflector.get<role[]>("role", context.getHandler());
    const request = context.switchToHttp().getRequest();

    const accessToken = request.headers.authorization;
    const test = request.headers.test;

    const isNotInProduction = this.verifyIfIsInTestMode(test);
    if(isNotInProduction) return true;

    const user = this.convertToken(accessToken);
    this.validateUserRole(user.role, validRole);

    return true;
  }

  private verifyIfIsInTestMode(testKey:string) {
    const isInDevMode = process.env.STATUS === "DEV";
    const testKeyIsValid = process.env.TEST_CODE === testKey;
    
    if(testKeyIsValid && isInDevMode) return true;
    return false;
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

  private validateUserRole(userRole:string, validRoles:role[]) {
    const dontHavePermission = "You don't have permission to access this rote";
    for(const validRole of validRoles) {
      if(userRole === validRole) return;
    }
    throw new HttpException(dontHavePermission, 403);
  }
}