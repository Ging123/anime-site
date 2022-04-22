import createTestApi from "../../../../utils/create.test.api";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

const userData = {
  email:"sacsacsa@outlook.com",
  username:"asfoaskfasoaovmmvv",
  password:"123456789",
  adminKey:process.env.ADMIN_KEY,
  emailOrUsername:"asfoaskfasoaovmmvv"
}
var app: any;
var server: INestApplication;
var token:string;

beforeAll(async () => {
  server = await createTestApi();
  app = server.getHttpServer();
  await request(app).post("/users").send(userData);
  const res = await request(app).post("/users/login").send(userData);
  token = res.body.access_token;
});

afterAll(async () => {
  await server.close();
});

test("Delete user", async () => {
  const res = await request(app)
    .delete("/users")
    .set("authorization", token);
  expect(res.status).toBe(204);
});