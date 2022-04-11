import { Processor, Process, OnQueueFailed } from "@nestjs/bull";
import Mail from "../../../lib/mail";
import { Job } from "bull";

interface data {
  to:string;
  code:string;
}

@Processor("send-confirmation-code-queue")
class SendConfirmationCodeConsumer {
  
  @OnQueueFailed()
  error(err:Job) {
    console.log(`error in send-confirmation-code-queue - ${err.failedReason}`);
  }


  @Process("send-confirmation-code-job")
  saveToken(job: Job<data>) {
    const mail = new Mail();
    const url = `${process.env.API_URL}/email/confirm?code=${job.data.code}`;
    mail.send({
      to:job.data.to,
      subject:"Confirm your account",
      html:`<h1>Confirm your account</h1>
            <div>Click <a href="${url}">here</a> to confirm your email</div>`
    });
  }
}

export default SendConfirmationCodeConsumer;