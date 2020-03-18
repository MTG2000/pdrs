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

  it("it should get medicine", async () => {
    const res = await chai.request(server).get("/api/medicins?name=hy");
    res.should.have.status(200);
    res.body[0].should.have.property("Name");
    res.body[0].Name.should.be.equal("Hydra-Vita 400");
  });
});
