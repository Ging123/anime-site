import createTestApi from "../../../../utils/create.test.api";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

const testCode = process.env.TEST_CODE;
const tagName = "aaaax";
var app: any;
var server: INestApplication;

beforeAll(async () => {
  server = await createTestApi()
  app = server.getHttpServer();

  await request(app)
    .post("/tags")
    .send({ name:tagName })
    .set("test", testCode);
});

afterAll(async () => {
  await server.close();
});

test("Test delete a tag", async () => {
  const res = await request(app)
    .delete(`/tags/${tagName}`)
    .set("test", testCode);
  expect(res.status).toBe(204);
});

test("Send tag name with invalid length", async () => {
  const tagDoesntExists = "This tag doesn't exists";
  const res = await request(app)
    .delete(`/tags/ksdofkaokfasokfakfakaksajfoijasfjasoifjaisfjaiosfioasjfoiasjfoiasjfoiajsfoiajiofjafjaoifjaoifjaoifjaifjaifjaifjaijaifjiajijijijoj`)
    .set("test", testCode);
  expect(res.body.message).toContain(tagDoesntExists);
  expect(res.status).toBe(400);
});