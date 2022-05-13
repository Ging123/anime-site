import createTestApi from "../../../../utils/create.test.api";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

const testCode = process.env.TEST_CODE;
const tagName = "ccc"
const animeName = "blleach";
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

test("Get an anime", async () => {
  let res = await request(app).get(`/animes/${animeName}`);
  const animeGotFromDb = res.body;
  
  expect(animeGotFromDb.name).toBeTruthy();
  expect(res.status).toBe(200);

  res = await request(app).get(`/animes/${animeName}`);
  const animeGotFromCache = res.body;
  
  expect(animeGotFromCache.name).toBeTruthy();
  expect(res.status).toBe(200);
});


test("Send invalid name", async () => {
  const animeDoesntExists = "This anime doesn't exist";
  const res = await request(app).get("/animes/askdosakodksaodskapodsapofksapofkpofkafkpaokaopfpoakfpoakfpoakfpafpafpapfkapfapfajfpajfpoajfpoakfpoafpapfajjjasdasjodpasdaspodkaspodkaspdkaspoaspofsapoposafpoasfpoasfaskpfafogopsdjgojsdpogjsdpogpdsgposgpsdkgpsdkpogksdpogspogkspokgposkgpoweopkgwepogowegewjgoewjgpowejpogwepgjwkgjggjgbbbbnbnbnbnbnbnngjgjgjnvnccxzxzcizjijasfjkhhllljojphph");
  
  expect(res.body.message).toContain(animeDoesntExists);
  expect(res.status).toBe(400);
});


test("Send an anime that doesn't exists", async () => {
  const res = await request(app).get("/animes/a");
  const animeFound = res.body;

  expect(animeFound.name).toBeUndefined();
  expect(res.status).toBe(200);
});