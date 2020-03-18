//During the test the env variable is set to test
process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

describe("Testing Users Api", () => {
  it("it should GET all the patients", async () => {
    const res = await chai.request(server).get("/api/users/patients");
    res.should.have.status(200);
    res.body.should.be.a("array");
  });

  let adminToken;
  it("it should login as admin", async () => {
    const res = await chai
      .request(server)
      .post("/api/users/login")
      .send({
        username: "mtg",
        password: "123"
      });
    res.should.have.status(200);
    res.body.should.be.a("object");
    res.body.should.have.property("token");
    adminToken = res.body.token;
  });

  it("it should register a new Doctor", async () => {
    const res = await chai
      .request(server)
      .post("/api/users/register")
      .set("Cookie", [`token= ${adminToken}`])
      .send({
        username: "momo1",
        password: "123",
        type: "doctor",
        doctorName: "Momo "
      });
    res.should.have.status(201);
    res.body.should.be.a("number");
  });

  it("it should register a new Pharmacy", async () => {
    const res = await chai
      .request(server)
      .post("/api/users/register")
      .set("Cookie", [`token= ${adminToken}`])
      .send({
        username: "momo2",
        password: "123",
        type: "pharmacy",
        pharmacyName: "Momo Pharmacian",
        address: "Damascus City"
      });
    res.should.have.status(201);
    res.body.should.be.a("number");
  });

  it("it should not register duplicate username", async () => {
    const res = await chai
      .request(server)
      .post("/api/users/register")
      .set("Cookie", [`token= ${adminToken}`])
      .send({
        username: "momo2",
        type: "pharmacy",
        pharmacyName: "Momo Pharmacian",
        address: "Damascus City"
      });
    res.should.have.status(400);
  });

  it("it should not register without password", async () => {
    const res = await chai
      .request(server)
      .post("/api/users/register")
      .set("Cookie", [`token= ${adminToken}`])
      .send({
        username: "momo3",
        type: "pharmacy",
        pharmacyName: "Momo Pharmacian",
        address: "Damascus City"
      });
    res.should.have.status(400);
  });

  it("it should get all users", async () => {
    const res = await chai
      .request(server)
      .get("/api/users")
      .set("Cookie", [`token= ${adminToken}`]);
    res.should.have.status(200);
    res.body.should.be.a("array");
    // console.log(res.body);
  });

  it("it should get all patients", async () => {
    const res = await chai.request(server).get("/api/users/patients");
    res.should.have.status(200);
    res.body.should.be.a("array");
    // console.log(res.body);
  });
});
