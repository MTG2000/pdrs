const sqlQueries = require("./sql-queries");
const argon = require("argon2");
const path = require("path");
const Constants = require("../Utils/Constants");

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
    { userType: 1, username: "mtg", password: "mtgmtgmtg" },
    {
      userType: 2,
      username: "ahmad",
      password: "123123",
      doctorName: "Ahmad Ghazal",
      contact: "0983663451"
    },
    {
      userType: 2,
      username: "morad",
      password: "123123",
      doctorName: "Morad Niazi",
      contact: "0931163451"
    },
    {
      userType: 3,
      username: "samer",
      password: "123123",
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
      category: 3,
      content: "Hello admin, please Improve the Overall UI"
    },
    {
      userId: 3,
      category: 1,
      content: "Please Add Medicine 'Ativan'"
    },
    {
      userId: 2,
      category: 4,
      content:
        "If you can add a feature to enable us ot see some meds usage statistics"
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
    { name: "Citalopram" },
    { name: "Adderall" },
    { name: "Trazodone" },
    { name: "Metformin" },
    { name: "Hydrochlorothiazide" },
    { name: "Azithromycin" },
    { name: "Ibuprofen" },
    { name: "Cymbalta" },
    { name: "Doxycycline" },
    { name: "Lorazepam" }
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
  ],
  prescriptions: [
    {
      doctorId: 1,
      patientId: "02114432341",
      classification: 1,
      note: "The Patient sufferd from an Intense Heart Attack"
    },
    {
      doctorId: 1,
      patientId: "02114432341",
      classification: 3,
      note: "A car accident that cause a lot of damage to the head"
    },
    {
      doctorId: 2,
      patientId: "02114443115",
      classification: 2,
      note: "An accident that caused an arm break"
    }
  ],
  medsPrescriptions: [
    {
      id: 1,
      meds: [
        {
          id: 2,
          bold: false,
          chronic: false
        },
        {
          id: 4,
          bold: false,
          chronic: false
        },
        {
          id: 5,
          bold: true,
          chronic: true,
          pharmacyId: 1
        },
        {
          id: 7,
          bold: false,
          chronic: false,
          pharmacyId: 1
        }
      ]
    },
    {
      id: 2,
      meds: [
        {
          id: 3,
          bold: false,
          chronic: false,
          pharmacyId: 1
        },
        {
          id: 5,
          bold: false,
          chronic: false,
          pharmacyId: 1
        },
        {
          id: 6,
          bold: false,
          chronic: false,
          pharmacyId: 1
        }
      ]
    },
    {
      id: 3,
      meds: [
        {
          id: 5,
          bold: false,
          chronic: false
        },
        {
          id: 1,
          bold: false,
          chronic: false,
          pharmacyId: 1
        },
        {
          id: 9,
          bold: false,
          chronic: false,
          pharmacyId: 1
        },
        {
          id: 8,
          bold: false,
          chronic: false
        }
      ]
    }
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
    // console.log(usersTypes[u.userType]);
    const userTypeId = (
      await get(sqlQueries.getUserTypeId, [usersTypes[u.userType]])
    ).Id;
    const passwordHash = await argon.hash(u.password);
    u.id = (
      await run(sqlQueries.insert_User, [
        userTypeId,
        u.username,
        passwordHash,
        u.contact
      ])
    ).lastID;
    await run(sqlQueries.createUserTokenRow, [u.id]);
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

  const { prescriptions } = seedData;
  log && console.log("Seeding Prescriptions");

  for (const p of prescriptions) {
    await run(sqlQueries.insert_Prescription, [
      p.doctorId,
      p.patientId,
      p.classification,
      p.note
    ]);
  }
};

const medicinsPrescriptions = async () => {
  if (!seedOptions.medicinsPrescriptions) return;

  //Seed MedicinePrescription
  //--------------
  const { medsPrescriptions } = seedData;
  log && console.log("Seeding Medicins_Prescriptions");

  for (const mp of medsPrescriptions) {
    for (const m of mp.meds) {
      await run(sqlQueries.insert_MedicinePrescription, [
        m.id,
        mp.id,
        m.bold,
        m.chronic,
        m.pharmacyId
      ]);
    }
  }
};
