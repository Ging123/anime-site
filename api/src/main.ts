import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cors from "./configs/cors";
import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors(cors);
  await app.listen(8000);
}

bootstrap();