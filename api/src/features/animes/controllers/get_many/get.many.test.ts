import createTestApi from "../../../../utils/create.test.api";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

const testCode = process.env.TEST_CODE;
const tagName = "asdsaf"
const animeName = "ffff";
var app: any;
var server: INestApplication;

beforeAll(async () => {
  server = await createTestApi()
  app = server.getHttpServer();

  await request(app)
    .post("/tags")
    .send({ name:tagName })
    .set("test", testCode);

  await request(app)
    .post("/animes")
    .set("test", testCode)
    .field("name", animeName)
    .field("description", "sadasas")
    .field("tags[0]", tagName)
    .attach("file", "src/assets_for_tests/1_BytAjqXDOjUZl7MEs1WHUw.png")
});

afterAll(async () => {
  await request(app).delete(`/animes/${animeName}`).set("test", testCode);
  await request(app).delete(`/tags/${tagName}`).set("test", testCode);
  await server.close();
});

test("Get a page of animes", async () => {
  let res = await request(app).get("/animes");
  const animesGotFromDatabase = res.body.length;

  expect(res.status).toBe(200);
  expect(animesGotFromDatabase).toBeTruthy();

  res = await request(app).get("/animes");
  const animesGotFromCache = res.body.length;

  expect(res.status).toBe(200);
  expect(animesGotFromCache).toBeTruthy();
});

test("Get a page of animes in descendent order", async () => {
  let res = await request(app).get("/animes").send({ asc:false });
  const animesGotFromDatabase = res.body.length;

  expect(res.status).toBe(200);
  expect(animesGotFromDatabase).toBeGreaterThan(0);

  res = await request(app).get("/animes").send({ asc:false });
  const animesGotFromCache = res.body.length;

  expect(res.status).toBe(200);
  expect(animesGotFromCache).toBeGreaterThan(0);
});

test("Get a page of animes of a specific tag", async () => {
  const tagId = await getTagId();
  const data = { tag:tagId}

  let res = await request(app).get("/animes").send(data);
  const animesGotFromDatabase = res.body.length;

  expect(res.status).toBe(200);
  expect(animesGotFromDatabase).toBeTruthy();

  res = await request(app).get("/animes").send(data);
  const animesGotFromCache = res.body.length;

  expect(res.status).toBe(200);
  expect(animesGotFromCache).toBeTruthy();
});


test("Get a page without nothing", async () => {
  let res = await request(app).get("/animes").send({ page:3 });
  const quantityOfAnimesFound = res.body.length;

  expect(res.status).toBe(200);
  expect(quantityOfAnimesFound).toBe(0);
});

test("Send page less than 1", async () => {
  let res = await request(app).get("/animes").send({ page:-1 });
  const invalidPageError = "Page invalid";

  expect(res.status).toBe(400);
  expect(res.body.message).toContain(invalidPageError);
});

async function getTagId() {
  const res = await request(app).get("/tags");
  const firstTag = 0;

  const tagId = res.body[firstTag].id;
  return tagId
}