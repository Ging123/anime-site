import SaveUserTokenQueue from "../../../jobs/save_token/queue";
import { HttpException, Injectable } from "@nestjs/common";
import UserRepo from "../base";

@Injectable()
class LoginService extends UserRepo {

  private readonly saveTokenQueue: SaveUserTokenQueue;

  public async login(emailOrUsername:string, password:string) {
    const user = await this.getUser(emailOrUsername);
    this.verifyIfUserAccountIsConfirmed(user.confirmed);
    await this.verifyIfPasswordMatch(password, user.password);
    const token = this.createTokens(user.id);
    this.saveUserToken(user.id, token.refresh_token);
    return token;
  }

  private async getUser(emailOrUsername:string) {
    const user = await this.user.findByEmailOrUsername(emailOrUsername);
    const userDoesntExists = "This email or username doesn't exists";
    if(!user) throw new HttpException(userDoesntExists, 400);
    return user;
  }

  private async verifyIfUserAccountIsConfirmed(confirmed:boolean) {
    const userAccountIsNotConfirmed = "This account wasn't confirmed";
    if(!confirmed) throw new HttpException(userAccountIsNotConfirmed, 400);
  }

  private async verifyIfPasswordMatch(password:string, hashedPassword:string) {
    const salt = process.env.PASSWORD_SALT;
    const match = await this.bcrypt.compare(password, hashedPassword, salt);
    const wrongPassword = "Wrong password";
    if(!match) throw new HttpException(wrongPassword, 400);
  }

  private createTokens(userId:string) {
    const payload = { id:userId };
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    return {
      access_token: this.jwt.createToken(payload, accessTokenSecret, "60m"),
      refresh_token: this.jwt.createToken(payload, refreshTokenSecret)
    }
  }

  private async saveUserToken(id:string, token:string) {
    const salt = process.env.REFRESH_TOKEN_SALT;
    token = await this.bcrypt.hash(token, salt);
    await this.saveTokenQueue.saveToken(id, token);
  }
}

export default LoginService;