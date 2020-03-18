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

  it("it should GET all the patients", async () => {
    const res = await agent.get("/api/users/patients");
    res.should.have.status(200);
    res.body.should.be.a("array");
  });

  it("it should login as admin", async () => {
    const res = await agent.post("/api/users/login").send({
      username: "mtg",
      password: "123"
    });
    res.should.have.status(200);
    res.body.should.be.a("object");
    res.body.should.have.property("token");
    adminToken = res.body.token;
  });

  it("it should register a new Doctor", async () => {
    const res = await agent
      .post("/api/users/register")

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
    const res = await agent
      .post("/api/users/register")

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
    const res = await agent
      .post("/api/users/register")

      .send({
        username: "momo2",
        type: "pharmacy",
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
        type: "pharmacy",
        pharmacyName: "Momo Pharmacian",
        address: "Damascus City"
      });
    res.should.have.status(400);
  });

  it("it should get all users", async () => {
    const res = await agent.get("/api/users");
    res.should.have.status(200);
    res.body.should.be.a("array");
    // console.log(res.body);
  });

  it("it should get all patients", async () => {
    const res = await agent.get("/api/users/patients");
    res.should.have.status(200);
    res.body.should.be.a("array");
    // console.log(res.body);
  });
});
