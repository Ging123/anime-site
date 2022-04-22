import createTestApi from "../../../../utils/create.test.api";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

const user = {
  email:"kkkk@outlook.com",
  username:"kkkk",
  password:"123456789",
  adminKey:process.env.ADMIN_KEY,
  emailOrUsername:"kkkk"
}
var app: any;
var server: INestApplication;
var token:string;

beforeAll(async () => {
  server = await createTestApi();
  app = server.getHttpServer();
});

afterAll(async () => {
  await request(app).delete("/users").set("authorization", token);
  await server.close();
});

test("Create an user", async () => {
  let res = await request(app).post("/users").send(user);
  expect(res.status).toBe(201);
  res = await request(app).post("/users/login").send(user);
  token = res.body.access_token;
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