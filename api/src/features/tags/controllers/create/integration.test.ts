import createTestApi from "../../../../utils/create.test.api";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

const testCode = process.env.TEST_CODE;
const tagName = "aaaa";
var app: any;
var server: INestApplication;

beforeAll(async () => {
  server = await createTestApi()
  app = server.getHttpServer();
});

afterAll(async () => {
  await request(app).delete(`/tags/${tagName}`).set("test", testCode);
  await server.close();
});

test("Test create a tag", async () => {
  const res = await request(app)
    .post("/tags")
    .send({ name:tagName })
    .set("test", testCode);
  expect(res.status).toBe(201);
});

describe("Test syntax error in tag name", () => {

  test("Don't send tag name", async () => {
    const tagWasntSend = "Tag is empty";
    const tagIsNotAString = "Tag must be a string";
    const res = await request(app).post("/tags").set("test", testCode);
    expect(res.status).toBe(400);
    expect(res.body.message).toContain(tagWasntSend);
    expect(res.body.message).toContain(tagIsNotAString);
  });

  test("Send tag name greater than allowed", async () => {
    const tagNameGreaterThanAllowed = "Tag length must be shorter than 30";
    const res = await request(app)
      .post("/tags")
      .send({ name:"aksodkasodkasodkasopkaspokapopopokpokfoqwkfoqwkfqkfpoqwpofqkpofkqpofkqwpokfqwpogpoepogjqpogqpogqpo"})
      .set("test", testCode);
    expect(res.status).toBe(400);
    expect(res.body.message).toContain(tagNameGreaterThanAllowed);
  });
});

test("Send tag name that already exists", async () => {
  const tagAlreadyExists = "This tag already exists";
  const res = await request(app)
    .post("/tags")
    .send({ name:tagName })
    .set("test", testCode);
  expect(res.status).toBe(400);
  expect(res.body.message).toBe(tagAlreadyExists);
});