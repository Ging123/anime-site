import { AppModule } from "../app.module";
import { Test } from "@nestjs/testing";

export default async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  
  const server = moduleRef.createNestApplication();
  await server.init();
  return server;
}