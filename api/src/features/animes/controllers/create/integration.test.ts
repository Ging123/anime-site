import connect from "../../../../utils/typeorm.connection";
import User from "../../../users/models/user.model";
import { AppModule } from "../../../../app.module";
import { INestApplication } from "@nestjs/common";
import { Connection, Repository } from "typeorm";
import { Test } from "@nestjs/testing";
import * as request from "supertest";

const userData = {
  email:"kaccccsao@gmail.com",
  username:"safgawqewq",
  password:"asfvavava",
  adminKey:process.env.ADMIN_KEY
}
var animeName = "narutoo";
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
  await request(app)
    .delete(`/animes/${animeName}`)
    .set("authorization", token);
  await userRepo.delete({ email:userData.email });
  await server.close();
  await db.close();
});

test("Create an anime", async () => {
  const res = await request(app)
    .post("/animes")
    .set("authorization", token)
    .field("name", animeName)
    .field("description", "")
    .attach("file", "src/assets_for_tests/1_BytAjqXDOjUZl7MEs1WHUw.png")
  expect(res.status).toBe(201);
});

test("Test error of send a name that already exists", async () => {
  const nameAlreadyExist = "This anime already exists";
  const res = await request(app)
    .post("/animes")
    .set("authorization", token)
    .field("name", animeName)
    .field("description", "")
    .attach("file", "src/assets_for_tests/1_BytAjqXDOjUZl7MEs1WHUw.png")
  expect(res.status).toBe(400);
  expect(res.body.message).toContain(nameAlreadyExist);
});

test("Test don't send name", async () => {
  const nameIsEmpty = "Name is empty";
  const res = await request(app)
    .post("/animes")
    .set("authorization", token)
    .send({ name:"", description:""});
  expect(res.status).toBe(400);
  expect(res.body.message).toContain(nameIsEmpty);
});

describe("Test image errors", () => {

  test("Don't send image", async () => {
    const imageWasntSent = "Image wasn't sent";
    const res = await request(app)
      .post("/animes")
      .set("authorization", token)
      .send({ name:"narutoo", description:"a ninja anime"})
    expect(res.status).toBe(400);
    expect(res.body.message).toContain(imageWasntSent);
  });

  test("Send a file that is not an image", async () => {
    const invalidImage = "Image invalid";
    const res = await request(app)
      .post("/animes")
      .set("authorization", token)
      .field("name", "kkkkk")
      .field("description", "asokdasodkaso")
      .attach("file", "src/assets_for_tests/test.txt")
    expect(res.status).toBe(400);
    expect(res.body.message).toContain(invalidImage);
  });
});

describe("Test errors of length", () => {
  const errors = [
    "Name must be shorter than 100 characteres",
    "Description must be shorter than 300 characteres"
  ];

  test("Send data with length greater than allowed", async () => {
    const res = await request(app)
      .post("/animes")
      .set("authorization", token)
      .send({
        name:"askdkasokdoskaokdosakdoksaokdosakdoksaokdosakodksaokfopaskfpkaspfpoaskpfokaspfpoakspofkpoaskfpokaspokfpoakspofkaposkfopsakfopkaspofkoapkfa",
        description:"saijfiasjfisajfksaofkoaskfoksaofkoskaofkokoaskfokokofkaoksofdksdsknvknsdkvdsvkjdskjfkjdskfjdsf9d sf9d jf9dj s9fjd9s jf9a9sfjsa 9 fs9af01f jasfklashfashf sajfh safhsjafh jsah fjsah jfhs ajhfjsa hfjhsa jfhsaj hfjsah fjhasfjasfasljdsalkdjsakldj askluwqoie wqi oewqueio wqu 8wqe8 u28ue 82eu 8u ue82u ew e,w aejwia jewa  wka 9dwa d9102dj i12 di do1d io21m doi21md sau dsa98fsa-0fsafs,afnsafsacsaca"
      })
    expect(res.status).toBe(400);
    for(const error of errors) {
      expect(res.body.message).toContain(error);
    } 
  });
})