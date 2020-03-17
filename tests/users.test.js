const request = require("supertest");
const app = require("../server");
const DB = require("../services/db");

// beforeAll(async () => {
//   await DB.initializeDB(true, true, true);
// });

describe("Registering and Creating Users", () => {
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

  let newPharmacyId;
  it("should register a new pharmacy", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .set("Cookie", [`token = ${authToken}`])
      .send({
        username: "momo2",
        password: "123",
        type: "pharmacy",
        pharmacyName: "Pharmacica",
        address: "Damascus city"
      });
    expect(res.statusCode).toEqual(200);
    newPharmacyId = res.body;
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
  await DB.closeDB();
  done();
});
