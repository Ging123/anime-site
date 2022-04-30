import createTestApi from "../../../../utils/create.test.api";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

const userData = {
  email:"ccascacascbty@gmail.com",
  username:"asfasvsjnfgbdf bdfbd",
  password:"asdsadwqeqwxcsac",
  adminKey:process.env.ADMIN_KEY,
  emailOrUsername:"asfasvsjnfgbdf bdfbd"
}
const tagName = "test"
var animeName = "hunterhunterrr";
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
  await request(app).delete(`/tags/${tagName}`).set("authorization", token);
  await request(app).delete("/users").set("authorization", token);
  await server.close();
});

test("Delete an anime", async () => {
  await request(app)
    .post("/animes")
    .set("authorization", token)
    .field("name", animeName)
    .field("description", "kkkkk")
    .field("tags[0]", tagName)
    .attach("file", "src/assets_for_tests/1_BytAjqXDOjUZl7MEs1WHUw.png");
  const res = await request(app)
    .delete(`/animes/${animeName}`)
    .set("authorization", token);
  expect(res.status).toBe(204);
});

test("Send invalid anime name", async () => {
  const animeDoesntExist = "This anime doesn't exists";
  const invalidName = "koaskdoaskdoskdokasodkasodksaodksaodksaodksaokadoskdosakdosakdosakdoaskdoaksodksaokdoaskodkasodkoaskdosakdosakdoaskdosakdoskadopsakdopsakfpksapkspaokfpkaspokpfokpokopkopkopkpkaposkfopsakfkasopkfpoaksofkasopfsakfopasfksaofksaopocoamscosmaomcaosmoasmcosacacacaa";
  const res = await request(app)
    .delete(`/animes/${invalidName}`)
    .set("authorization", token);
  expect(res.status).toBe(400);
  expect(res.body.message[0]).toBe(animeDoesntExist);
});

test("Send anime that doesn't exists", async () => {
  const animeDoesntExist = "This anime doesn't exists";
  const res = await request(app)
    .delete(`/animes/${animeName}`)
    .set("authorization", token);
  expect(res.status).toBe(400);
  expect(res.body.message).toBe(animeDoesntExist);
});