const sqlQueries = require("./sql-queries");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = async (run, get, log = false) => {
  //seed UserTypes
  try {
    //First Empty All Tables
    for (const sql of sqlQueries.emptyAllTablesPatch) {
      await run(sql);
    }

    const usersTypes = ["Master Admin", "Admin", "Doctor", "Pharmacy"];
    // Seed UserTypes
    //--------------
    log && console.log("Seeding UsersTypes");
    for (let ut of usersTypes) {
      ut = (await run(sqlQueries.insert_UserType, [ut])).lastID;
    }
    const users = [
      { userType: 1, username: "mtg", password: "123" },
      {
        userType: 2,
        username: "ahmad",
        password: "123",
        doctorName: "Ahmad Ghazal"
      },
      {
        userType: 2,
        username: "morad",
        password: "123",
        doctorName: "Morad Nabeel"
      },
      {
        userType: 3,
        username: "samer",
        password: "123",
        pharmacyName: "Al-Fateh",
        pharmacyLocation: "Aleppo Al-Jamelia"
      }
    ];

    // Seed Users
    //--------------
    log && console.log("Seeding Users");
    for (let i = 0; i < users.length; i++) {
      const u = users[i];
      const userTypeId = (
        await get(sqlQueries.getUserTypeId, [usersTypes[u.userType]])
      ).Id;
      const passwordHash = await bcrypt.hash(u.password, saltRounds);
      u.id = (
        await run(sqlQueries.insert_User, [
          userTypeId,
          u.username,
          passwordHash
        ])
      ).lastID;
    }

    //Seed Doctors
    //--------------
    log && console.log("Seeding Doctors");
    for (let i = 0; i < users.length; i++) {
      const u = users[i];
      if (u.userType == 2) {
        //if he is a doctor
        u.doctorId = (
          await run(sqlQueries.insert_Doctor, [u.doctorName, u.id])
        ).lastID;
      }
    }
    //Seed Pharmacies
    //--------------
    log && console.log("Seeding Pharmacies");
    for (let i = 0; i < users.length; i++) {
      const u = users[i];
      if (3 === u.userType) {
        //if he is a phramacy
        u.pharmacyId = (
          await run(sqlQueries.insert_Pharmacy, [
            u.pharmacyName,
            u.pharmacyLocation,
            u.id
          ])
        ).lastID;
      }
    }

    //Seed Patients
    //--------------
    const patients = [
      { id: "02114432341", name: "Fadi Tahan" },
      { id: "02114443115", name: "Basim Yakhoor" },
      { id: "02116674324", name: "Abd-Alhadi Issa" },
      { id: "02996753455", name: "Shahed Ibraheem" }
    ];

    log && console.log("Seeding Patients");
    for (const p of patients) {
      await run(sqlQueries.insert_Patient, [p.id, p.name]);
    }

    //Seed Medicins
    //--------------
    const medicins = [
      { name: "Sitamol" },
      { name: "Panadol" },
      { name: "Profien" },
      { name: "Shfazien-Forte" },
      { name: "Benzamien" },
      { name: "Spizazol-Forte" }
    ];
    log && console.log("Seeding Medicins");

    for (const m of medicins) {
      m.id = (await run(sqlQueries.insert_Medicine, [m.name])).lastID;
    }

    //Seed Classifications
    //--------------
    const classifications = [
      { name: "Bones" },
      { name: "Teeth" },
      { name: "Neural" },
      { name: "Skin" },
      { name: "Digestive" },
      { name: "Sight" }
    ];
    log && console.log("Seeding Classifications");
    for (const c of classifications) {
      c.id = (await run(sqlQueries.insert_Classification, [c.name])).lastID;
    }

    //Seed Prescriptions
    //--------------
    log && console.log("Seeding Prescriptions");
    const prescriptionId = (
      await run(sqlQueries.insert_Prescription, [
        users[1].doctorId,
        patients[0].id,
        classifications[0].id,
        "The Patient sufferd from an intense injuery in his right arm"
      ])
    ).lastID;

    //Seed MedicinePrescription
    //--------------
    log && console.log("Seeding MedicinePrescription");
    const medsToTake = [0, 1, 4];
    for (const medIndex of medsToTake) {
      await run(sqlQueries.insert_MedicinePrescription, [
        medicins[medIndex].id,
        prescriptionId,
        medIndex === 4 ? "1" : "0",
        medIndex === 4 ? "1" : "0"
      ]);
    }

    log && console.log("Seeding Completed");
  } catch (error) {
    console.log("Error While Seeding: " + error);
  }
};
