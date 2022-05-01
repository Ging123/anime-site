import createTestApi from "../../../../utils/create.test.api";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

const userData = {
  email:"xxasawq@gmail.com",
  username:"xxasawq bdfbd",
  password:"asdsadwqeqwxcsac",
  adminKey:process.env.ADMIN_KEY,
  emailOrUsername:"xxasawq bdfbd"
}
const tagName = "ccc"
const animeName = "blleach";
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

  await request(app)
    .post("/animes")
    .set("authorization", token)
    .field("name", animeName)
    .field("description", "sadasas")
    .field("tags[0]", tagName)
    .attach("file", "src/assets_for_tests/1_BytAjqXDOjUZl7MEs1WHUw.png")
});

afterAll(async () => {
  await request(app).delete(`/tags/${tagName}`).set("authorization", token);
  await request(app).delete("/users").set("authorization", token);
  await request(app).delete(`/animes/${animeName}`).set("authorization", token);
  await server.close();
});

test("Get an anime", async () => {
  const res = await request(app).get(`/animes/${animeName}`);
  const animeData = res.body;
  expect(animeData.name).toBeDefined();
  expect(animeData.image).toBeDefined();
  expect(animeData.description).toBeDefined();
  expect(res.status).toBe(200);
});

test("Send invalid name", async () => {
  const animeDoesntExists = "This anime doesn't exist";
  const res = await request(app).get("/animes/askdosakodksaodskapodsapofksapofkpofkafkpaokaopfpoakfpoakfpoakfpafpafpapfkapfapfajfpajfpoajfpoakfpoafpapfajjjasdasjodpasdaspodkaspodkaspdkaspoaspofsapoposafpoasfpoasfaskpfafogopsdjgojsdpogjsdpogpdsgposgpsdkgpsdkpogksdpogspogkspokgposkgpoweopkgwepogowegewjgoewjgpowejpogwepgjwkgjggjgbbbbnbnbnbnbnbnngjgjgjnvnccxzxzcizjijasfjkhhllljojphph");
  expect(res.body.message).toContain(animeDoesntExists);
  expect(res.status).toBe(400);
});