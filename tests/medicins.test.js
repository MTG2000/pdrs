const request = require("supertest");
const app = require("../server");
const DB = require("../services/db");

// beforeAll(async () => {
//   await DB.initializeDB(true, true, true);
// });

describe("Testing medicins api", () => {
  it("should get all classification", async () => {
    const res = await request(app).get("/api/medicins/classifications");

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  let authToken;
  it("should login as admin", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({
        username: "mtg",
        password: "123"
      });
    expect(res.statusCode).toEqual(200);
    authToken = res.body.token;
  });

  it("should add new Medicine", async () => {
    const res = await request(app)
      .post("/api/medicins/new")
      .set("Cookie", [`token = ${authToken}`])
      .send({
        name: "Hydra-Vita"
      });
    expect(res.statusCode).toEqual(201);
  });
});

afterAll(async done => {
  // Closing the DB connection allows Jest to exit successfully.
  await DB.closeDB();
  done();
});
