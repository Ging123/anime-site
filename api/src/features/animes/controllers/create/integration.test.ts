import createTestApi from "../../../../utils/create.test.api";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

const testCode = process.env.TEST_CODE;
const tagName = "action";
var animeName = "narutoo";
var app: any;
var server: INestApplication;

beforeAll(async () => {
  server = await createTestApi();
  app = server.getHttpServer();

  await request(app)
    .post("/tags")
    .send({ name:tagName })
    .set("test", testCode);
});

afterAll(async () => {
  await request(app).delete(`/animes/${animeName}`).set("test", testCode);
  await request(app).delete(`/tags/${tagName}`).set("test", testCode);
  await server.close();
});

test("Create an anime", async () => {
  const res = await request(app)
    .post("/animes")
    .set("test", testCode)
    .field("name", animeName)
    .field("description", "")
    .field("tags[0]", tagName)
    .attach("file", "src/assets_for_tests/1_BytAjqXDOjUZl7MEs1WHUw.png")
  expect(res.status).toBe(201);
});

test("Test error of send a name that already exists", async () => {
  const nameAlreadyExist = "This anime already exists";
  const res = await request(app)
    .post("/animes")
    .set("test", testCode)
    .field("name", animeName)
    .field("description", "")
    .field("tags[0]", tagName)
    .attach("file", "src/assets_for_tests/1_BytAjqXDOjUZl7MEs1WHUw.png")
  expect(res.status).toBe(400);
  expect(res.body.message).toContain(nameAlreadyExist);
});

test("Test don't send name", async () => {
  const nameIsEmpty = "Name is empty";
  const res = await request(app)
    .post("/animes")
    .set("test", testCode)
    .send({ name:"", description:""});
  expect(res.status).toBe(400);
  expect(res.body.message).toContain(nameIsEmpty);
});

describe("Test tag errors", () => {
  
  test("Test don't send tags", async () => {
    const tagsIsEmpty = "Tags is empty";
    const res = await request(app)
      .post("/animes")
      .set("test", testCode)
      .send({ name:"a", description:""});
    expect(res.status).toBe(400);
    expect(res.body.message).toContain(tagsIsEmpty)
  });

  test("Test send more tags than allowed", async () => {
    const tags = ["a", "b", "c", "d", "e", "f", "s"];
    const quantityOfTagsGreaterThanAllowed = "An anime can just have 5 tags";
    const res = await request(app)
      .post("/animes")
      .set("test", testCode)
      .send({ name:"a", description:"", tags:tags});
    expect(res.status).toBe(400);
    expect(res.body.message).toContain(quantityOfTagsGreaterThanAllowed)
  });
});

describe("Test image errors", () => {

  test("Don't send image", async () => {
    const imageWasntSent = "Image wasn't sent";
    const res = await request(app)
      .post("/animes")
      .set("test", testCode)
      .send({ name:"narutoo", description:"a ninja anime", tags:[ tagName ]})
    expect(res.status).toBe(400);
    expect(res.body.message).toContain(imageWasntSent);
  });

  test("Send a file that is not an image", async () => {
    const invalidImage = "Image invalid";
    const res = await request(app)
      .post("/animes")
      .set("test", testCode)
      .field("name", "kkkkk")
      .field("description", "asokdasodkaso")
      .attach("file", "src/assets_for_tests/test.txt")
      .field("tags[0]", tagName)
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
      .set("test", testCode)
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