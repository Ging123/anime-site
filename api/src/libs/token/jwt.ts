import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import Token from "./token.interface";

@Injectable()
class Jwt implements Token {

  constructor(
    private readonly jwt: JwtService
  ) {}
  

  public convert(token:string, secret:string) {
    const data = this.jwt.verify(token, { secret:secret });
    return data;
  }


  public createToken(payload:object|string, secret:string, expiresIn?:string) {
    const tokenOption:any = { secret:secret };
    if(expiresIn) tokenOption.expiresIn = expiresIn;
    return this.jwt.sign(payload, tokenOption);
  }
}

export default Jwt;