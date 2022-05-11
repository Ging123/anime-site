import createTestApi from "../../../../utils/create.test.api";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

const testCode = process.env.TEST_CODE;
const tagName = "sacashrt";
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
  await request(app).delete(`/tags/${tagName}`).set("test", testCode);
  await server.close();
});

test("Get all tags", async () => {
  let res = await request(app).get("/tags");
  const quantityOfTagsFromDatabase = res.body.length;

  expect(res.status).toBe(200);
  expect(quantityOfTagsFromDatabase).toBeGreaterThan(0);

  res = await request(app).get("/tags");
  const quantityOfTagsFromCache = res.body.length;

  expect(res.status).toBe(200);
  expect(quantityOfTagsFromCache).toBeGreaterThan(0);
});