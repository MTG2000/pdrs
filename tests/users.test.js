//During the test the env variable is set to test
process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

describe("Testing Users Api", () => {
  //we use it like this so that it keeps the cookies between requests
  const agent = chai.request.agent(server);

  it("it should GET  patient", async () => {
    const res = await agent
      .get("/api/users/patient")
      .query({ id: "02227779988" });
    res.should.have.status(200);
  });

  it("it should login as admin", async () => {
    const res = await agent.post("/api/users/login").send({
      username: "mtg",
      password: "mtgmtgmtg"
    });
    res.should.have.status(200);
    res.body.data.should.be.a("object");
    res.body.data.should.have.property("accessToken");
    adminToken = res.body.data.accessToken;
  });

  it("it should register a new Doctor", async () => {
    const res = await agent
      .post("/api/users/register")

      .send({
        username: "momo1",
        password: "123123",
        type: "Doctor",
        doctorName: "Momo",
        contact: "098347238"
      });
    res.should.have.status(201);
  });

  it("it should register a new Pharmacy", async () => {
    const res = await agent
      .post("/api/users/register")

      .send({
        username: "momo2",
        password: "123123",
        type: "Pharmacy",
        pharmacyName: "Momo Pharmacian",
        address: "Damascus City",
        contact: "098311238"
      });
    res.should.have.status(201);
  });

  it("it should not register duplicate username", async () => {
    const res = await agent
      .post("/api/users/register")

      .send({
        username: "momo2",
        type: "Pharmacy",
        pharmacyName: "Momo Pharmacian",
        address: "Damascus City"
      });
    res.should.have.status(400);
  });

  it("it should not register without password", async () => {
    const res = await agent
      .post("/api/users/register")

      .send({
        username: "momo3",
        type: "Pharmacy",
        pharmacyName: "Momo Pharmacian",
        address: "Damascus City"
      });
    res.should.have.status(400);
  });

  it("it should get all users", async () => {
    const res = await agent.get("/api/users");
    res.should.have.status(200);
    res.body.data.should.be.a("array");
    // console.log(res.body.data);
  });
});
