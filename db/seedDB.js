const sqlQueries = require("./sql-queries");
const argon = require("argon2");
const path = require("path");
const Constants = require("../helpers/Constants");
const date = require("date-and-time");

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
  medicinsPrescriptions: true,
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
    generateRandomPrescriptions();
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
      contact: "0983663451",
    },
    {
      userType: 2,
      username: "morad",
      password: "123123",
      doctorName: "Morad Niazi",
      contact: "0931163451",
    },
    {
      userType: 3,
      username: "samer",
      password: "123123",
      pharmacyName: "Al-Fateh",
      pharmacyLocation: "Aleppo Al-Jamelia",
      contact: "fatehpharm@gmail.com",
    },
    {
      userType: 2,
      username: "abdo",
      password: "123123",
      doctorName: "Abdulfattah Mohammed Asper",
      contact: "0987221231",
    },
    {
      userType: 2,
      username: "khalid",
      password: "123123",
      doctorName: "Khalid Al-Saleh",
      contact: "0983663451",
    },
    {
      userType: 2,
      username: "majd",
      password: "123123",
      doctorName: "Majd-Aldeen Al-Rez",
      contact: "0983663451",
    },
  ],
  msgCategories: [
    "Add Medinice",
    "Add Classification",
    "Report a Problem",
    "Suggest a Feature",
    "Something Else",
  ],
  accountRequests: [
    {
      name: "Ahmad Abdullah",
      type: "Mental Doctor",
      phone: "0978647344",
      email: "ahmadabd@gmail.com",
    },
    {
      name: "Alaa Mouraoui",
      type: "Pharmacian",
      phone: "0978643114",
    },
  ],
  messages: [
    {
      userId: 3,
      category: 2,
      content: "Please add the classification 'Phsycology'",
    },
    {
      userId: 4,
      category: 3,
      content: "Hello admin, please Improve the Overall UI",
    },
    {
      userId: 3,
      category: 1,
      content: "Please Add Medicine 'Ativan'",
    },
    {
      userId: 2,
      category: 4,
      content:
        "If you can add a feature to enable us ot see some meds usage statistics",
    },
  ],
  patients: [
    { id: "02114432341", name: "Fadi Tahan" },
    { id: "02114443115", name: "Basim Yakhoor" },
    { id: "02116674324", name: "Abd-Alhadi Issa" },
    { id: "02996753455", name: "Shahed Ibraheem" },
    { id: "11223311334", name: "Osama Hamdan" },
    { id: "02144455190", name: "Reem Shahba" },
    { id: "09576577557", name: "Yara Sleem" },
    { id: "16367891342", name: "Feras Ashhab" },
    { id: "75645613497", name: "Abd-allah Tahan" },
    { id: "64734566635", name: "Nour Safi" },
    { id: "77356555662", name: "Riham Mouna" },
    { id: "13334144445", name: "Rana Saeed" },
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
    { name: "Lorazepam" },
  ],
  classifications: [
    {
      name: "Heart",
      conditions: [
        { name: "Abnormal heart rhythms" },
        { name: "Aorta disease" },
        { name: "Congenital heart disease" },
        { name: "Coronary artery disease " },
      ],
    },
    {
      name: "Bones",
      conditions: [
        { name: "Bone cancer" },
        { name: "Curvature of the spine" },
        { name: "Broken Arm" },
        { name: "Broken Leg" },
        { name: "Broken Skull" },
        { name: "arthritis" },
      ],
    },
    {
      name: "Brain",
      conditions: [
        { name: "Alzheimer's Disease" },
        { name: "Dementias" },
        { name: "Brain Cancer" },
        { name: "Mental Disorders" },
        { name: "Parkinson's and Other Movement Disorders" },
        { name: "Epilepsy and Other Seizure Disorders" },
        { name: "Stroke and Transient Ischemic Attack" },
      ],
    },
    {
      name: "Eye",
      conditions: [
        { name: "Eyestrain" },
        { name: "Red Eyes" },
        { name: "Night Blindness" },
      ],
    },
    {
      name: "Stomach",
      conditions: [
        { name: "Gastroesophageal Reflux Disease" },
        { name: "Celiac Disease" },
        { name: "Crohn's Disease" },
        { name: "Ulcerative Colitis" },
        { name: "Irritable Bowel Syndrome" },
      ],
    },
    {
      name: "Tooth",
      conditions: [
        { name: "Cavities" },
        { name: "Periodontitis" },
        { name: "Cracked or broken teeth" },
        { name: "Sensitive teeth" },
        { name: "Oral cancer" },
      ],
    },
    {
      name: "Kidney",
      conditions: [
        { name: "Chronic kidney disease" },
        { name: "Kidney stones" },
        { name: "Glomerulonephritis" },
        { name: "Polycystic kidney disease" },
        { name: "Urinary tract infections" },
      ],
    },
    {
      name: "Lungs",
      conditions: [
        { name: "Asthma" },
        { name: "Lung cancer" },
        { name: "Covid-19" },
        { name: "Lung infection (pneumonia)" },
      ],
    },
    {
      name: "Ear",
      conditions: [
        { name: "Otosclerosis" },
        { name: "Menieres Disease" },
        { name: "Ear Infections" },
        { name: "Swimmer's ear (otitis externa)" },
      ],
    },
    {
      name: "Sex",
      conditions: [
        { name: "Desire disorders" },
        { name: "Arousal disorders" },
        { name: "Orgasm disorders" },
        { name: "Pain disorders" },
      ],
    },
  ],
  prescriptions: [],
  medsPrescriptions: [],
};

function generateRandomPrescriptions() {
  // Generate Prescription
  const numOfDoctors = seedData.users.filter((u) => u.userType === 2).length;
  const numOfPharmacies = seedData.users.filter((u) => u.userType === 3).length;

  let startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);
  let endDate = new Date();

  for (const patient of seedData.patients) {
    const numOfPrescriptions = getRndInteger(4, 15);
    for (let i = 0; i < numOfPrescriptions; i++) {
      const doctorId = getRndInteger(0, numOfDoctors) + 1;
      // Select a random classification then a random condition
      const randomClassification = getRndInteger(
        0,
        seedData.classifications.length
      );
      const randomCondition = getRndInteger(
        0,
        seedData.classifications[randomClassification].conditions.length
      );

      const classificationId =
        seedData.classifications[randomClassification].id;
      const conditionId =
        seedData.classifications[randomClassification].conditions[
          randomCondition
        ].id;

      const note = Math.random() > 0.75 ? "This is a side note" : null;

      const newPrescription = {
        doctorId,
        patientId: patient.id,
        date: date.format(randomDate(startDate, endDate), "YYYY-MM-DD"),
        condition: conditionId,
        note,
      };

      seedData.prescriptions.push(newPrescription);
    }
  }
  // Generate Meds for prescriptions
  for (let i = 0; i < seedData.prescriptions.length; i++) {
    // generate a number between 3 and 6
    const numberOfMedsToGenerate = getRndInteger(3, 7);
    const medsObject = {};
    const pharmacy = getRndInteger(0, numOfPharmacies) + 1;

    for (let i = 0; i < numberOfMedsToGenerate; i++) {
      const medId = getRndInteger(1, seedData.medicins.length + 1);
      const bold = Math.random() > 0.8;
      const chronic = Math.random() > 0.93;
      let pharmacyId = null;
      if (Math.random() > 0.33) pharmacyId = pharmacy;
      medsObject[medId] = { bold, chronic, pharmacyId };
    }
    seedData.medsPrescriptions.push({
      id: i + 1,
      meds: Object.entries(medsObject).map(([medId, props]) => ({
        id: medId,
        ...props,
      })),
    });
  }
}

//min Included, max excluded
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomDate(start, end) {
  var date = new Date(+start + Math.random() * (end - start));
  return date;
}

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
        u.contact,
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
          u.id,
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
        ),
      ])
    ).lastID;

    for (const condition of c.conditions)
      condition.id = (
        await run(sqlQueries.insert_Condition, [condition.name, c.id])
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
      p.condition,
      p.date.toString(),
      p.note,
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
        m.pharmacyId,
      ]);
    }
  }
};
