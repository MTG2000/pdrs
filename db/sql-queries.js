const transactionBegin = `BEGIN TRANSACTION;`;
const transactionCommit = `COMMIT;`;
const transactionRollback = `ROLLBACK;`;

const createTable_UserTypes = `
CREATE TABLE IF NOT EXISTS UsersTypes ( 
    ID   INTEGER PRIMARY KEY, 
    TYPE   VARCHAR(30) NOT NULL UNIQUE
);`;

const createTable_Users = `
CREATE TABLE IF NOT EXISTS Users 
( 
ID  INTEGER PRIMARY KEY, 
UserType_ID   INTEGER REFERENCES USERSTYPES(ID), 
USERNAME  VARCHAR(25) NOT NULL UNIQUE, 
PASSWORD  VARCHAR(50) NOT NULL 
)`;

const createTable_Pharmacies = `
CREATE TABLE IF NOT EXISTS Pharmacies 
( 
  ID     INTEGER PRIMARY KEY, 
  NAME    VARCHAR(20) NOT NULL, 
  LOCATION   VARCHAR(100) NOT NULL ,
  USER_ID  INTEGER REFERENCES USERS(ID) 
);`;

const createTable_Doctors = `
CREATE TABLE IF NOT EXISTS Doctors  
( 
  ID   INTEGER PRIMARY KEY, 
  Name  VARCHAR(30) NOT NULL, 
  USER_ID  INTEGER REFERENCES USERS(ID)
);`;

const createTable_Patients = `
CREATE TABLE IF NOT EXISTS Patients  
( 
  ID  varchar(20) PRIMARY KEY NOT NULL, 
  NAME  VARCHAR(50) NOT NULL 
)
`;

const createTable_Medicins = `
CREATE TABLE IF NOT EXISTS Medicins 
( 
  ID  INTEGER PRIMARY KEY, 
  NAME  VARCHAR(100) NOT NULL UNIQUE
);
CREATE INDEX medicine_name ON Medicins(Name);
`;

const createTable_Classifications = `
CREATE TABLE IF NOT EXISTS Classifications  
( 
  ID  INTEGER PRIMARY KEY, 
  NAME VARCHAR(25) NOT NULL UNIQUE
); `;

const createTable_Prescriptions = `
CREATE TABLE IF NOT EXISTS Prescriptions 
( 
  ID  INTEGER PRIMARY KEY, 
  Doctor_ID   INTEGER REFERENCES DOCTORS(ID), 
  PATIENT_ID  varchar(20) REFERENCES PATIENTS (ID) ON UPDATE CASCADE ON DELETE CASCADE, 
  CLASSIFICATION_ID  INTEGER REFERENCES CLASSIFICATIONS (ID), 
  PRE_DATE  TIMESTAMP, 
  DESCRIPTION  VARCHAR(200) 
); `;

const createTable_MedicinePrescription = `
CREATE TABLE IF NOT EXISTS Medicine_Prescription  
( 
  Medicine_ID  INTEGER REFERENCES MEDICINEs (ID), 
  Prescription_ID  INTEGER REFERENCES PRESCRIPTIONs (ID) ON UPDATE CASCADE ON DELETE CASCADE, 
  isBold CHAR(1) NOT NULL, 
  isChronic CHAR(1) NOT NULL, 
  Pharmacy_ID   INTEGER REFERENCES Pharmacies(ID), 
  PRIMARY KEY  ( Medicine_ID, Prescription_ID)
);`;

const emptyAllTablesPatch = [
  "Delete from UsersTypes",
  "Delete from Users",
  "Delete from Pharmacies",
  "Delete from Doctors",
  "Delete from Patients",
  "Delete from Medicins",
  "Delete from Classifications",
  "Delete from Prescriptions",
  "Delete from Medicine_Prescription"
];

const dropAllTablesPatch = [
  "Drop Table UsersTypes",
  "Drop Table Users",
  "Drop Table Pharmacies",
  "Drop Table Doctors",
  "Drop Table Patients",
  "Drop Table Medicins",
  "Drop Table Classifications",
  "Drop Table Prescriptions",
  "Drop Table Medicine_Prescription"
];

const insert_UserType = `
INSERT INTO UsersTypes (type) VALUES (?);
`;

const insert_User = `
INSERT INTO USERS (UserType_Id,username,password) VALUES (?,?,?) ;
`;

const insert_Doctor = `
INSERT INTO Doctors (Name,User_Id) VALUES (?,?);
`;

const insert_Pharmacy = `
INSERT INTO Pharmacies (Name,Location,User_Id) VALUES (?,?,?);
`;

const insert_Patient = `
INSERT INTO Patients (ID,Name) VALUES (?,?);
`;

const insert_Medicine = `
INSERT INTO Medicins (Name) VALUES (?);
`;

const insert_Classification = `
INSERT INTO Classifications (Name) VALUES (?);
`;

const insert_Prescription = `
INSERT INTO Prescriptions (Doctor_Id,Patient_Id,Classification_Id,Pre_Date,Description) VALUES (?,?,?,datetime('now'),?);
`;

const insert_MedicinePrescription = `
INSERT INTO Medicine_Prescription (Medicine_ID,Prescription_ID,isBold,isChronic) VALUES (?,?,?,?);
`;

const createTablesPatch = [
  createTable_Users,
  createTable_UserTypes,
  createTable_Pharmacies,
  createTable_Doctors,
  createTable_Patients,
  createTable_Medicins,
  createTable_Classifications,
  createTable_Prescriptions,
  createTable_MedicinePrescription
];

module.exports = {
  createTablesPatch,
  emptyAllTablesPatch,
  dropAllTablesPatch,
  transactionBegin,
  transactionCommit,
  transactionRollback,
  insert_UserType,
  insert_User,
  insert_Doctor,
  insert_Pharmacy,
  insert_Patient,
  insert_Medicine,
  insert_Classification,
  insert_Prescription,
  insert_MedicinePrescription
};
