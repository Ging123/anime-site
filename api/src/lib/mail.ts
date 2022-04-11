import mailConfig from "../configs/mail";
import * as nodemailer from "nodemailer";

interface email {
  to:string;
  subject:string;
  html:string;
}

class Mail {

  public send(email:email) {
    const transporter = nodemailer.createTransport(mailConfig);
    const options = this.createEmailSenderOptions(email);
    transporter.sendMail(options);
  }

  private createEmailSenderOptions(email:email) {
    return {
      from: "My Animes",
      to:email.to,
      subject:email.subject,
      html:email.html
    }
  }
}

export default Mail;