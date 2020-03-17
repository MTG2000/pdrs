const request = require("supertest");
const app = require("../server");
const DB = require("../services/db");

beforeAll(async () => {
  await DB.initializeDB(true, true);
});

describe("register and login users", () => {
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

  let newDoctorId;
  it("should register a new doctor", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .set("Cookie", [`token = ${authToken}`])
      .send({
        username: "momo",
        password: "123",
        type: "doctor",
        doctorName: "Momo Mami"
      });
    expect(res.statusCode).toEqual(200);
    newDoctorId = res.body;
  });

  it("get Patients by name", async () => {
    const res = await request(app).get("/api/users/patients");

    expect(res.statusCode).toEqual(200);
    expect(res.body[0].Name).toEqual("Fadi Tahan");
  });
});

afterAll(async done => {
  // Closing the DB connection allows Jest to exit successfully.
  // dbConnection.close();
  done();
});
