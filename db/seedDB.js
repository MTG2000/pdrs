const sqlQueries = require("./sql-queries");
const bcrypt = require("bcrypt");
const path = require("path");
const Constants = require("../Utils/Constants");
const saltRounds = 10;

const seedOptions = {
  usersTypes: true,
  users: true,
  msgsCategories: true,
  accountRequests: true,
  messages: true,
  doctors: true,
  pharmacies: true,
  patients: true,
  medicins: true,
  classifications: true,
  prescriptions: true,
  medicinsPrescriptions: true
};

let run, get, log;

module.exports = async (_run, _get, _log = false) => {
  try {
    run = _run;
    get = _get;
    log = _log;

    log && console.log("Seeding Started");

    await usersTypes();
    await users();
    await msgsCategories();
    await accountRequests();
    await messages();
    await doctors();
    await pharmacies();
    await patients();
    await medicins();
    await classifications();
    await prescriptions();
    await medicinsPrescriptions();

    log && console.log("Seeding Completed");
  } catch (error) {
    console.log("Error While Seeding: " + error);
  }
};

let seedData = {
  usersTypes: ["Master Admin", "Admin", "Doctor", "Pharmacy"],
  users: [
    { userType: 1, username: "mtg", password: "123" },
    {
      userType: 2,
      username: "ahmad",
      password: "123",
      doctorName: "Ahmad Ghazal",
      contact: "0983663451"
    },
    {
      userType: 2,
      username: "morad",
      password: "123",
      doctorName: "Morad Nabeel",
      contact: "0931163451"
    },
    {
      userType: 3,
      username: "samer",
      password: "123",
      pharmacyName: "Al-Fateh",
      pharmacyLocation: "Aleppo Al-Jamelia",
      contact: "fatehpharm@gmail.com"
    }
  ],
  msgCategories: [
    "Add Medinice",
    "Add Classification",
    "Report a Problem",
    "Suggest a Feature",
    "Something Else"
  ],
  accountRequests: [
    {
      name: "Ahmad Abdullah",
      type: "Mental Doctor",
      phone: "0978647344",
      email: "ahmadabd@gmail.com"
    },
    {
      name: "Alaa Mouraoui",
      type: "Pharmacian",
      phone: "0978643114"
    }
  ],
  messages: [
    {
      userId: 3,
      category: 2,
      content: "Please add the classification 'Phsycology'"
    },
    {
      userId: 4,
      category: 1,
      content: "Please Add 'Warfeen'"
    }
  ],
  patients: [
    { id: "02114432341", name: "Fadi Tahan" },
    { id: "02114443115", name: "Basim Yakhoor" },
    { id: "02116674324", name: "Abd-Alhadi Issa" },
    { id: "02996753455", name: "Shahed Ibraheem" }
  ],
  medicins: [
    { name: "Sitamol" },
    { name: "Panadol" },
    { name: "Profien" },
    { name: "Shfazien-Forte" },
    { name: "Benzamien" },
    { name: "Spizazol-Forte" }
  ],
  classifications: [
    { name: "Heart" },
    { name: "Bones" },
    { name: "Brain" },
    { name: "Eye" },
    { name: "Stomach" },
    { name: "Tooth" },
    { name: "Kidney" },
    { name: "Lungs" },
    { name: "Ear" },
    { name: "Sex" }
  ]
};

const usersTypes = async () => {
  const { usersTypes } = seedData;
  if (!seedOptions.usersTypes) return;
  // Seed UserTypes
  //--------------
  log && console.log("Seeding UsersTypes");
  for (let ut of usersTypes) {
    ut = (await run(sqlQueries.insert_UserType, [ut])).lastID;
  }
};

const users = async () => {
  if (!seedOptions.users) return;

  // Seed Users
  //--------------
  const { users, usersTypes } = seedData;
  log && console.log("Seeding Users");
  for (let i = 0; i < users.length; i++) {
    const u = users[i];
    console.log(usersTypes[u.userType]);
    const userTypeId = (
      await get(sqlQueries.getUserTypeId, [usersTypes[u.userType]])
    ).Id;
    const passwordHash = await bcrypt.hash(u.password, saltRounds);
    u.id = (
      await run(sqlQueries.insert_User, [
        userTypeId,
        u.username,
        passwordHash,
        u.contact
      ])
    ).lastID;
  }
};

const msgsCategories = async () => {
  if (!seedOptions.msgsCategories) return;
  //Seed Msgs Categories
  //--------------
  log && console.log("Seeding Messages Categories");
  const { msgCategories } = seedData;
  for (let i = 0; i < msgCategories.length; i++) {
    const mc = msgCategories[i];
    await run(sqlQueries.insert_MessagesCategories, [mc]);
  }
};

const accountRequests = async () => {
  if (!seedOptions.accountRequests) return;
  //Seed Account Requests
  //--------------
  log && console.log("Seeding Accounts Requsets");
  const { accountRequests } = seedData;
  for (let i = 0; i < accountRequests.length; i++) {
    const { name, type, phone, email } = accountRequests[i];
    await run(sqlQueries.insert_AccountRequest, [name, type, phone, email]);
  }
};

const messages = async () => {
  if (!seedOptions.messages) return;
  //Seed Messages
  //--------------
  log && console.log("Seeding Messages");
  const { messages } = seedData;
  for (let i = 0; i < messages.length; i++) {
    const { userId, category, content } = messages[i];
    await run(sqlQueries.insert_Message, [userId, category, content]);
  }
};

const doctors = async () => {
  if (!seedOptions.doctors) return;
  //Seed Doctors
  //--------------
  log && console.log("Seeding Doctors");
  const { users } = seedData;
  for (let i = 0; i < users.length; i++) {
    const u = users[i];
    if (u.userType == 2) {
      //if he is a doctor
      u.doctorId = (
        await run(sqlQueries.insert_Doctor, [u.doctorName, u.id])
      ).lastID;
    }
  }
};

const patients = async () => {
  if (!seedOptions.patients) return;
  //Seed Patients
  //--------------
  const { patients } = seedData;

  log && console.log("Seeding Patients");
  for (const p of patients) {
    await run(sqlQueries.insert_Patient, [p.id, p.name]);
  }
};

const pharmacies = async () => {
  if (!seedOptions.pharmacies) return;
  //Seed Pharmacies
  //--------------
  const { users } = seedData;

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
};

const medicins = async () => {
  if (!seedOptions.medicins) return;
  //Seed Medicins
  //--------------
  const { medicins } = seedData;
  log && console.log("Seeding Medicins");

  for (const m of medicins) {
    m.id = (await run(sqlQueries.insert_Medicine, [m.name])).lastID;
  }
};

const classifications = async () => {
  if (!seedOptions.classifications) return;
  //Seed Classifications
  //--------------
  const { classifications } = seedData;
  log && console.log("Seeding Classifications");
  for (const c of classifications) {
    c.id = (
      await run(sqlQueries.insert_Classification, [
        c.name,
        path.join(
          Constants.classificationsIconsPath,
          `${c.name.toLowerCase()}.svg`
        )
      ])
    ).lastID;
  }
};

const prescriptions = async () => {
  if (!seedOptions.prescriptions) return;
  //Seed Prescriptions
  //--------------
  const { users, patients, classifications } = seedData;
  log && console.log("Seeding Prescriptions");
  const prescriptionId = (
    await run(sqlQueries.insert_Prescription, [
      users[1].doctorId,
      patients[0].id,
      classifications[0].id,
      "The Patient sufferd from an intense injuery in his right arm"
    ])
  ).lastID;
};

const medicinsPrescriptions = async () => {
  if (!seedOptions.medicinsPrescriptions) return;
  //Seed MedicinePrescription
  //--------------
  const { medicins } = seedData;
  log && console.log("Seeding MedicinePrescription");
  const medsToTake = [0, 1, 4];
  for (const medIndex of medsToTake) {
    await run(sqlQueries.insert_MedicinePrescription, [
      medicins[medIndex].id,
      1,
      medIndex === 4 ? "1" : "0",
      medIndex === 4 ? "1" : "0"
    ]);
  }
};
