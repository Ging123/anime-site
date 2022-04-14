import connect from "../../../../utils/typeorm.connection";
import { AppModule } from "../../../../app.module";
import { INestApplication } from "@nestjs/common";
import { Connection, Repository } from "typeorm";
import User from "../../models/user.model";
import { Test } from "@nestjs/testing";
import * as request from "supertest";

const user = {
  email:"kkkk@outlook.com",
  username:"kkkk",
  password:"123456789"
}
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
});

afterAll(async () => {
  await userRepo.delete({ email:user.email });
  await server.close();
  await db.close();
});

test("Create an user", async () => {
  const res = await request(app).post("/users").send(user);
  expect(res.status).toBe(201);
});

describe("Test empty data errors", () => {
  const errors = [
    "Email is empty",
    "email must be an email",
    "Username is empty",
    "Passwor is empty",
    "Password must be greater than 6 characteres",
  ];

  test("Send empty data", async () => {
    const data = { email: "", username: "", password: "" };
    const res = await request(app).post("/users").send(data);
    for (const error of errors) {
      expect(res.body.message).toContain(error);
    }
  });
});

describe("Test errors of send data with length greater than allowed", () => {
  const errors = [
    "Email must be shorter than 100 characteres",
    "Username must be shorter than 30 characteres",
    "Password must be shorter than 30 characteres",
  ];

  test("Send data with length greater than allowed", async () => {
    const data = {
      email:
        "asoaskfoksafoaksfosakfosakfosakfoaskfoaskfsafkafkasofkaokfoakfoakfpoakfakkapkaspofkasokfasokfposakfsaofkasofksapofkpoaskfsakfposakfpksaopfkaspfkopaskfpoaskfpaskfpoaskfpokaspofkaspofkaspofkpoaskfpoaskfoaskfpokaspofksapofkaposkfpoakfpoakpofka",
      username:
        "akdoaskdosakdosakdoskaodksaodkasodksaodkaodkoakdoakdokaodkaodkaodkoaaoaooa",
      password:
        "asodsaodkasodkasokdsoakdosakdosakdosakdosakdoskaodkasodkasodkasodksaosaoo"
    };
    const res = await request(app).post("/users").send(data);
    for (const error of errors) {
      expect(res.body.message).toContain(error);
    }
  });
});

describe("Test duplicaded email and username error", () => {

  test("Send duplicated email", async () => {
    const emailAlreadyBeingUsed = "This email is already being used";
    const res = await request(app).post("/users").send(user);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe(emailAlreadyBeingUsed);
  });


  test("Send duplicated username", async () => {
    const usernameAlreadyBeingUsed = "This username is already being used";
    const data = {
      email:"kk@outlook.com", 
      username:user.username, 
      password:"12345679"
    }
    const res = await request(app).post("/users").send(data);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe(usernameAlreadyBeingUsed);
  });
});