import createTestApi from "../../../../utils/create.test.api";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

const testCode = process.env.TEST_CODE;
const tagName = "xs"
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

test("Get a image", async () => {
  const imageName = await getImageName();
  const res = await request(app).get(`/animes/image/${imageName}`);
  expect(res.status).toBe(200);
});

test("Try to get image that doesn't exists", async () => {
  const res = await request(app).get(`/animes/image/a`);
  expect(res.status).toBe(404);
});

async function getImageName() {
  const anime = await request(app).get(`/animes/${animeName}`);
  const imageUrl = anime.body.image;

  const urlArray = imageUrl.split('/');
  const lastIndex = urlArray.length - 1;

  const imageName = urlArray[lastIndex]
  return imageName;
}