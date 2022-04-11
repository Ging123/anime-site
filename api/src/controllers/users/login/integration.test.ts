import { INestApplication } from "@nestjs/common";
import { AppModule } from "../../../app.module";
import { Test } from "@nestjs/testing";
import * as request from "supertest";

var app: any;
var server: INestApplication;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  server = moduleRef.createNestApplication();
  await server.init();
  app = server.getHttpServer();
});

afterAll(async () => {
  await server.close();
});

/*test("Login an user", async () => {

})*/

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

/*test("Send wrong password", async () => {

})*/

/*test("Login with an accout that wasn't confirmed", async () => {

});*/