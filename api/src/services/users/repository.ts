import SendConfirmationCodeQueue from "../../jobs/email/send_confirmation_code/queue";
import SaveUserTokenQueue from "../../jobs/users/save_token/queue";
import { InjectRepository } from "@nestjs/typeorm";
import User from "../../models/user.model";
import { JwtService } from "@nestjs/jwt";
import Bcrypt from "../../lib/bcrypt";
import { Repository } from "typeorm";

class UserRepo {
  protected readonly bcrypt = new Bcrypt();

  constructor(
    @InjectRepository(User)
    protected readonly user: Repository<User>,
    protected readonly saveTokenQueue: SaveUserTokenQueue,
    protected readonly sendConfirmationCodeQueue: SendConfirmationCodeQueue,
    protected readonly jwt: JwtService
  ) {}

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
}

export default UserRepo;