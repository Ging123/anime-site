import connect from "../../../../utils/typeorm.connection";
import User from "../../../users/models/user.model";
import { AppModule } from "../../../../app.module";
import { INestApplication } from "@nestjs/common";
import { Connection, Repository } from "typeorm";
import { Test } from "@nestjs/testing";
import * as request from "supertest";

const userData = {
  email:"ccascacascbty@gmail.com",
  username:"asfasvsjnfgbdf bdfbd",
  password:"asdsadwqeqwxcsac",
  adminKey:process.env.ADMIN_KEY
}
var animeName = "hunterhunterrr";
var token:string;
var userRepo:Repository<User>;
var db:Connection;
var app: any;
var server: INestApplication;

beforeAll(async () => {
  db = await connect()
  userRepo = db.getRepository(User);

  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  server = moduleRef.createNestApplication();

  await server.init();
  app = server.getHttpServer();

  await request(app).post("/users").send(userData);

  const res = await request(app)
    .post("/users/login")
    .send({ 
      emailOrUsername:userData.email, 
      password:userData.password 
    });
  token = res.body.access_token;
});

afterAll(async () => {
  await userRepo.delete({ email:userData.email });
  await server.close();
  await db.close();
});

test("Delete an anime", async () => {
  await request(app)
    .post("/animes")
    .set("authorization", token)
    .field("name", animeName)
    .field("description", "kkkkk")
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