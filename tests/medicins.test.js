//During the test the env variable is set to test
process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

describe("Testing Medicins api", () => {
  it("it should GET all the classificatinos", async () => {
    const res = await chai.request(server).get("/api/medicins/classifications");
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

  it("it should add new medicine", async () => {
    const res = await chai
      .request(server)
      .post("/api/medicins/new")
      .set("Cookie", [`token= ${adminToken}`])
      .send({ name: "Hydra-Vita 400" });
    res.should.have.status(201);
    res.body.should.be.a("number");
  });

  it("it should not add duplicate medicine", async () => {
    const res = await chai
      .request(server)
      .post("/api/medicins/new")
      .set("Cookie", [`token= ${adminToken}`])
      .send({ name: "Hydra-Vita 400" });
    res.should.have.status(400);
  });

  it("it should not add medicine with no name", async () => {
    const res = await chai
      .request(server)
      .post("/api/medicins/new")
      .set("Cookie", [`token= ${adminToken}`])
      .send({});
    res.should.have.status(400);
  });

  it("it should not add medicine with wrong authorization", async () => {
    const res = await chai
      .request(server)
      .post("/api/users/login")
      .send({
        username: "ahmad",
        password: "123"
      });
    res.should.have.status(200);
    res.body.should.be.a("object");
    res.body.should.have.property("token");
    const docToken = res.body.token;

    const res2 = await chai
      .request(server)
      .post("/api/medicins/new")
      .set("Cookie", [`token= ${docToken}`])
      .send({ name: "Hydra-Vita 4001" });
    res2.should.have.status(403);
  });

  it("it should get medicine", async () => {
    const res = await chai
      .request(server)
      .get("/api/medicins")
      .query({ name: "hydra" });
    res.should.have.status(200);
    res.body[0].should.have.property("Name");
    res.body[0].Name.should.be.equal("Hydra-Vita 400");
  });
});
