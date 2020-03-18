//During the test the env variable is set to test
process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

describe("Testing Patients Api", () => {
  let doctorToken;
  it("it should login as Doctor", async () => {
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
    doctorToken = res.body.token;
  });

  it("it should add a new prescriptions", async () => {
    const res = await chai
      .request(server)
      .post("/api/patients/new-prescription")
      .set("Cookie", [`token= ${doctorToken}`])
      .send({
        patientId: "02227779988",
        patientName: "Fouad Shekho",
        classificationId: 1,
        note: "A break in the knee",
        medicins: [
          {
            id: 1,
            isBold: false,
            isChronic: false
          },
          {
            id: 3,
            isBold: true,
            isChronic: false
          },
          {
            id: 4,
            isBold: false,
            isChronic: true
          }
        ]
      });
    res.should.have.status(201);
    res.body.should.be.a("object");
    res.body.should.have.property("success");
  });

  it("it should not add invalid prescriptions (invalid med id)", async () => {
    const res = await chai
      .request(server)
      .post("/api/patients/new-prescription")
      .set("Cookie", [`token= ${doctorToken}`])
      .send({
        patientId: "02227779988",
        patientName: "Fouad Shekho",
        classificationId: 1,
        note: "A break in the knee",
        medicins: [
          {
            id: 133,
            isBold: false,
            isChronic: false
          },
          {
            id: 3,
            isBold: true,
            isChronic: false
          },
          {
            id: 4,
            isBold: false,
            isChronic: true
          }
        ]
      });
    res.should.have.status(400);
  });

  it("it should not add invalid prescriptions (invalid classification)", async () => {
    const res = await chai
      .request(server)
      .post("/api/patients/new-prescription")
      .set("Cookie", [`token= ${doctorToken}`])
      .send({
        patientId: "02227779988",
        patientName: "Fouad Shekho",
        classificationId: 1111,
        note: "A break in the knee",
        medicins: [
          {
            id: 1,
            isBold: false,
            isChronic: false
          },
          {
            id: 3,
            isBold: true,
            isChronic: false
          },
          {
            id: 4,
            isBold: false,
            isChronic: true
          }
        ]
      });
    res.should.have.status(400);
  });
});
