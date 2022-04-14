import connect from "../../../../utils/typeorm.connection";
import { AppModule } from "../../../../app.module";
import { INestApplication } from "@nestjs/common";
import { Connection, Repository } from "typeorm";
import User from "../../models/user.model";
import { Test } from "@nestjs/testing";
import * as request from "supertest";

const userData = {
  email:"testasofksao@gmail.com",
  username:"kkfaksfvsdv",
  password:"aokfosakfosaf"
}
var userRepo:Repository<User>;
var db:Connection;
var code:string;
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

  const res = await request(app).post("/users").send(userData);
  code = res.text;
});

afterAll(async () => {
  await userRepo.delete({ email:userData.email });
  await server.close();
  await db.close();
});

test("Login with an account that wasn't confirmed", async () => {
  const res = await request(app)
    .post("/users/login")
    .send({ 
      emailOrUsername:userData.email, 
      password:userData.password 
    });
  const accountWasntConfirmed = "This account wasn't confirmed";
  expect(res.status).toBe(401);
  expect(res.body.message).toBe(accountWasntConfirmed);
});

test("Login an user", async () => {
  await request(app).get(`/email/confirm?code=${code}`);
  const res = await request(app)
    .post("/users/login")
    .send({ 
      emailOrUsername:userData.email, 
      password:userData.password 
    });
  expect(res.status).toBe(201);
  expect(res.body.refresh_token).toBeTruthy();
  expect(res.body.access_token).toBeTruthy();
});

describe("Test empty data error", () => {
  const errors = [
    "Email or username is empty",
    "Passwor is empty",
    "Password must be greater than 6 characteres",
  ];

  test("Send empty data", async () => {
    const res = await request(app)
      .post("/users/login")
      .send({ emailOrUsername: "", password: "" });
      expect(res.status).toBe(400);
    for (const error of errors) {
      expect(res.body.message).toContain(error);
    }
  });
});

describe("Test error of data with length greater than allowed", () => {
  const errors = [
    "Email or username invalid",
    "Password must be shorter than 30 characteres"
  ];

  test("Send data greater than allowed", async () => {
    const data = {
      emailOrUsername:
        "akdoaskdosakdosakdoskaodksaodkasodksaodkaodkoakdoakdokaodkaodkaodkoaaoaooasadsapdksaodksaodksaodksaodkosakdosakdoaskdoksaodksaodksoakdosakdosakdoksaodksaokdosakdoksadsaodkas0ds0akd0sakd0aks0d0sa",
      password:
        "asodsaodkasodkasokdsoakdosakdosakdosakdosakdoskaodkasodkasodkasodksaosaoo"
    }
    const res = await request(app)
      .post("/users/login")
      .send(data);
    expect(res.status).toBe(400);
    for(const error of errors) {
      expect(res.body.message).toContain(error);
    }
  });
})

test("Send user that doesn't exist", async () => {
  const userDoesntExist = "This email or username doesn't exists";
  const res = await request(app)
    .post("/users/login")
    .send({ emailOrUsername:"kkkkkk", password:"123456789" });
  expect(res.status).toBe(400);
  expect(res.body.message).toBe(userDoesntExist);
});

test("Send wrong password", async () => {
  const res = await request(app)
    .post("/users/login")
    .send({ 
      emailOrUsername:userData.email, 
      password:"ksaodkasoda" 
    });
  const wrongPassword = "Wrong password";
  expect(res.status).toBe(400);
  expect(res.body.message).toBe(wrongPassword);
});