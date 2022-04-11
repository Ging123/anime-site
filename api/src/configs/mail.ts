import { ConfigModule } from "@nestjs/config";

ConfigModule.forRoot({
  isGlobal: true
});

export default {
  host: process.env.MAIL_HOST,
  port:parseInt(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
}