import { Injectable } from "@nestjs/common";
import Base from "../base";

@Injectable() 
class GetUserService extends Base {

  public async getByEmail(email:string) {
    return await this.user.findByEmail(email);
  }
}

export default GetUserService;