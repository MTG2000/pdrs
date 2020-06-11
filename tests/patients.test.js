//During the test the env variable is set to test
process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

describe("Testing Patients Api", () => {
  const agent = chai.request.agent(server);

  it("it should login as Doctor", async () => {
    const res = await agent.post("/api/users/login").send({
      username: "ahmad",
      password: "123123",
    });
    res.should.have.status(200);
    res.body.data.should.be.a("object");
    res.body.data.should.have.property("accessToken");
  });

  it("it should add a new prescriptions", async () => {
    const res = await agent.post("/api/patients/new-prescription").send({
      patientId: "02227779988",
      patientName: "Fouad Shekho",
      conditionId: 1,
      note: "A break in the knee",
      medicins: [
        {
          value: 1,
          isBold: false,
          isChronic: false,
        },
        {
          value: 3,
          isBold: true,
          isChronic: false,
        },
        {
          value: 4,
          isBold: false,
          isChronic: true,
        },
      ],
    });
    res.should.have.status(201);
  });

  it("it should not add invalid prescriptions (invalid med id)", async () => {
    const res = await agent.post("/api/patients/new-prescription").send({
      patientId: "02227779988",
      patientName: "Fouad Shekho",
      classificationId: 1,
      note: "A break in the knee",
      medicins: [
        {
          value: 133,
          isBold: false,
          isChronic: false,
        },
        {
          value: 3,
          isBold: true,
          isChronic: false,
        },
        {
          value: 4,
          isBold: false,
          isChronic: true,
        },
      ],
    });
    res.should.have.status(400);
  });

  it("it should not add invalid prescriptions (invalid classification)", async () => {
    const res = await agent.post("/api/patients/new-prescription").send({
      patientId: "02227779988",
      patientName: "Fouad Shekho",
      classificationId: 1111,
      note: "A break in the knee",
      medicins: [
        {
          value: 1,
          isBold: false,
          isChronic: false,
        },
        {
          value: 3,
          isBold: true,
          isChronic: false,
        },
        {
          value: 4,
          isBold: false,
          isChronic: true,
        },
      ],
    });
    res.should.have.status(400);
  });
});
