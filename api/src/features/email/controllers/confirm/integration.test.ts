import connect from "../../../../utils/typeorm.connection";
import User from "../../../users/models/user.model";
import { AppModule } from "../../../../app.module";
import { INestApplication } from "@nestjs/common";
import { Connection, Repository } from "typeorm";
import { Test } from "@nestjs/testing";
import * as request from "supertest";

const userData = {
  email:"asofjas9212okd@outlook.com",
  username:"kaosfajgoa",
  password:"okfasokfoaskf"
}
var userRepo:Repository<User>;
var db:Connection;
var app: any;
var server: INestApplication;
var code:string;

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
  await server.close();
  await db.close();
});

test("Test confirm an user", async () => {
  const res = await request(app).get(`/email/confirm?code=${code}`);
  expect(res.status).toBe(200);
});

describe("Test errors of token syntax", () => {
  const tokensSent = [
    "",
    "k",
    `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    eyJlbWFpbCI6ImF5bGFuQGJvc2Nhcmluby5
    jb20iLCJwYXNzd29yZCI6InlhMGdzcWh5NHd6dnV2YjQifQ.yN_8-
    Mge9mFgsnYHnPEh_ZzNP7YKvSbQ3Alug9HMCsM`
  ];

  test("Send token with invalid syntax", async () => {
    const invalidToken = "Code invalid";
    for(const token of tokensSent) {
      const res = await request(app).get(`/email/confirm?code=${token}`);
      expect(res.status).toBe(400);
      expect(res.body.message).toBe(invalidToken);
    }
  });
});

test("Send token of an user that is already confirmed", async () => {
  const res = await request(app).get(`/email/confirm?code=${code}`);
  const userAlreadyConfirmed = "User already confirmed";
  expect(res.status).toBe(403);
  expect(res.body.message).toBe(userAlreadyConfirmed);
});

test("Send token of an user that was deleted", async () => {
  await userRepo.delete({ email:userData.email });
  const res = await request(app).get(`/email/confirm?code=${code}`);
  const userDoesntExist = "User doesn't exists";
  expect(res.status).toBe(400);
  expect(res.body.message).toBe(userDoesntExist);
});