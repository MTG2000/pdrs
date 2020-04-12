//During the test the env variable is set to test
process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

describe("Testing Medicins api", () => {
  const agent = chai.request.agent(server);

  it("it should GET all the classificatinos", async () => {
    const res = await agent.get("/api/medicins/classifications");
    res.should.have.status(200);
    res.body.data.should.be.a("array");
  });

  it("it should deep equal", async () => {
    const arrOfObj = [
      { name: "mohammed" },
      { name: "ahmad" },
      { name: "fadi" }
    ];
    const objToLookFor = { name: "mohammed" };
    arrOfObj.should.deep.include(objToLookFor);
  });

  it("it should login as admin", async () => {
    const res = await agent.post("/api/users/login").send({
      username: "mtg",
      password: "mtgmtgmtg"
    });
    res.should.have.status(200);
    res.body.data.should.be.a("object");
    res.body.data.should.have.property("accessToken");
    adminToken = res.body.accessToken;
  });

  it("it should add new medicine", async () => {
    const res = await agent
      .post("/api/medicins/new")
      .send({ name: "Hydra-Vita 400" });
    res.should.have.status(201);
  });

  it("it should not add duplicate medicine", async () => {
    const res = await agent
      .post("/api/medicins/new")
      .send({ name: "Hydra-Vita 400" });
    res.should.have.status(400);
  });

  it("it should not add medicine with no name", async () => {
    const res = await agent.post("/api/medicins/new").send({});
    res.should.have.status(400);
  });

  it("it should not add medicine with wrong authorization", async () => {
    const res = await agent.post("/api/users/login").send({
      username: "ahmad",
      password: "123123"
    });
    res.should.have.status(200);
    res.body.data.should.be.a("object");

    const res2 = await agent
      .post("/api/medicins/new")
      .send({ name: "Hydra-Vita 4001" });
    res2.should.have.status(403);
  });

  it("it should get medicine", async () => {
    const res = await agent.get("/api/medicins").query({ name: "hydra" });
    res.should.have.status(200);
    res.body.data[0].should.have.property("Name");
    res.body.data[0].Name.should.be.equal("Hydra-Vita 400");
  });
});
