import { UserRepository } from "./user.repo.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import User from "../models/user.model";
import { Repository } from "typeorm";

@Injectable()
class UserRepo implements UserRepository {

  @InjectRepository(User)
  private readonly user:Repository<User>;

  public async findByEmail(email: string) {
    return await this.user.findOne({
      where: { email: email },
    });
  }

  public async findByUsername(username: string) {
    return await this.user.findOne({
      where: { username: username },
    });
  }
  
  public async findByEmailOrUsername(emailOrUsername:string) {
    return await this.user.findOne({
      where: [{ email:emailOrUsername }, { username:emailOrUsername }]
    });
  }

  public async deleteByEmail(email: string) {
    return await this.user.delete({ email: email });
  }

  public async createUser(email: string, username: string, password: string) {
    return await this.user.insert({
      email: email,
      username: username,
      password: password,
      role: "user",
      confirmed: false
    });
  }

  public async confirmEmail(email:string) {
    await this.user.update({email:email}, {confirmed:true})
  }

  public async saveToken(id:string, token:string) {
    return await this.user.update({ id:id }, { token:token });
  }
}

export default UserRepo;