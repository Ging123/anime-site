import { HttpException, Injectable } from "@nestjs/common";
import UserRepo from "../repository";

@Injectable()
class CreateUserService extends UserRepo {
  
  public async create(email: string, username: string, password: string) {
    await this.verifyIfEmailOrUsernameExists(email, username);
    password = await this.hashPassword(password);
    await this.createUser(email, username, password);
    const code = this.sendConfirmationCode(email);
    return code;
  }

  private async verifyIfEmailOrUsernameExists(email: string, username: string) {
    await this.verifyIfEmailExist(email);
    await this.verifyIfUsernameExist(username);
  }

  private async verifyIfEmailExist(email: string) {
    const emailAlreadyBeingUsed = "This email is already being used";
    const userFound = await this.findByEmail(email);
    if(userFound) throw new HttpException(emailAlreadyBeingUsed, 400);
  }

  private async verifyIfUsernameExist(username: string) {
    const usernameAlreadyBeingUsed = "This username is already being used";
    const userFound = await this.findByUsername(username);
    if(userFound) throw new HttpException(usernameAlreadyBeingUsed, 400);
  }

  private async hashPassword(password: string) {
    const salt = process.env.PASSWORLD_SALT!;
    const hash = await this.bcrypt.hash(password, salt);
    return hash;
  }

  private async sendConfirmationCode(email:string) {
    const payload = { email:email };
    const code = this.jwt.sign(payload, {
      secret:process.env.EMAIL_SECRET,
      expiresIn:"60m"
    });
    
    if(process.env.STATUS === "DEV") return code;
    await this.sendConfirmationCodeQueue.sendConfirmationCode(email, code);
  }
}

export default CreateUserService;