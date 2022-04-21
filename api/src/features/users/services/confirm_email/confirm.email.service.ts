import ConfirmEmailQueue from "src/features/users/jobs/confirm_email/queue";
import Base from "../base";

class ConfirmUserEmailService extends Base {

  private readonly queue:ConfirmEmailQueue;

  public async confirmEmail(code:string) {
    const secret = process.env.EMAIL_SECRET;
    const email = this.jwt.convert(code, secret).email;
    await this.confirm(email);
  }

  private async confirm(email:string) {
    const isInDevMode = process.env.STATUS === "DEV";
    if(isInDevMode) return await this.user.confirmEmail(email);
    this.queue.confirmEmail(email);
  }
}

export default ConfirmUserEmailService;