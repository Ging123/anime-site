import SendConfirmationCodeQueue from "../../../email/jobs/send_confirmation_code/queue";
import { HttpException, Inject, Injectable } from "@nestjs/common";
import UserRepo from "../base";

@Injectable()
class CreateUserService extends UserRepo {
  
  @Inject(SendConfirmationCodeQueue)
  private readonly sendConfirmationCodeQueue: SendConfirmationCodeQueue;

  public async create(email:string, username:string, password:string, adminKey:string) {
    await this.verifyIfEmailOrUsernameExists(email, username);
    
    password = await this.hashPassword(password);
    const role = this.validateRole(adminKey);
    await this.user.createUser(email, username, password, role);
    
    if(role === "admin") return "";
    return this.sendConfirmationCode(email);
  }

  private async verifyIfEmailOrUsernameExists(email: string, username: string) {
    await this.verifyIfEmailExist(email);
    await this.verifyIfUsernameExist(username);
  }

  private async verifyIfEmailExist(email: string) {
    const emailAlreadyBeingUsed = "This email is already being used";
    const userFound = await this.user.findByEmail(email);
    if(userFound) throw new HttpException(emailAlreadyBeingUsed, 400);
  }

  private async verifyIfUsernameExist(username: string) {
    const usernameAlreadyBeingUsed = "This username is already being used";
    const userFound = await this.user.findByUsername(username);
    if(userFound) throw new HttpException(usernameAlreadyBeingUsed, 400);
  }

  private async hashPassword(password: string) {
    const salt = process.env.PASSWORD_SALT;
    const hash = await this.bcrypt.hash(password, salt);
    return hash;
  }

  private validateRole(adminKey:string) {
    if(adminKey === process.env.ADMIN_KEY) return "admin";
    return "user";
  }

  private sendConfirmationCode(email:string) {
    const payload = { email:email };
    const secret = process.env.EMAIL_SECRET;
    const code = this.jwt.createToken(payload, secret, "1h");
    if(process.env.STATUS === "DEV") return code;
    this.sendConfirmationCodeQueue.sendConfirmationCode(email, code);
  }
}

export default CreateUserService;