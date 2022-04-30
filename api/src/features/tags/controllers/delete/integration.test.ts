import createTestApi from "../../../../utils/create.test.api";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

const userData = {
  email:"vs3q42141rff@gmail.com",
  username:"asssbbb  bdfbd",
  password:"asdsadwqeqwxcsac",
  adminKey:process.env.ADMIN_KEY,
  emailOrUsername:"asssbbb  bdfbd"
}
const tagName = "aaaax";
var token:string;
var app: any;
var server: INestApplication;

beforeAll(async () => {
  server = await createTestApi()
  app = server.getHttpServer();
  await request(app).post("/users").send(userData);
  const res = await request(app).post("/users/login").send(userData);
  token = res.body.access_token;

  await request(app)
    .post("/tags")
    .send({ name:tagName })
    .set("authorization", token);
});

afterAll(async () => {
  await request(app).delete("/users").set("authorization", token);
  await server.close();
});

test("Test delete a tag", async () => {
  const res = await request(app)
    .delete(`/tags/${tagName}`)
    .set("authorization", token);
  expect(res.status).toBe(204);
});

test("Send tag name with invalid length", async () => {
  const tagDoesntExists = "This tag doesn't exists";
  const res = await request(app)
    .delete(`/tags/ksdofkaokfasokfakfakaksajfoijasfjasoifjaisfjaiosfioasjfoiasjfoiasjfoiajsfoiajiofjafjaoifjaoifjaoifjaifjaifjaifjaijaifjiajijijijoj`)
    .set("authorization", token);
  expect(res.body.message).toContain(tagDoesntExists);
  expect(res.status).toBe(400);
});