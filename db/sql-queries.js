const transactionBegin = `BEGIN TRANSACTION;`;
const transactionCommit = `COMMIT;`;
const transactionRollback = `ROLLBACK;`;

const createTable_UserTypes = `
CREATE TABLE IF NOT EXISTS UsersTypes ( 
    Id   INTEGER PRIMARY KEY, 
    Type   VARCHAR(30) NOT NULL UNIQUE
);`;

const createTable_Users = `
CREATE TABLE IF NOT EXISTS Users 
( 
Id INTEGER PRIMARY KEY, 
UserType_Id   INTEGER , 
Username  VARCHAR(25) NOT NULL UNIQUE, 
Password  VARCHAR(50) NOT NULL ,
FOREIGN KEY (UserType_Id) REFERENCES USERSTYPES(ID)
)`;

const createTable_Pharmacies = `
CREATE TABLE IF NOT EXISTS Pharmacies 
( 
  Id     INTEGER PRIMARY KEY, 
  Name    VARCHAR(20) NOT NULL, 
  Location   VARCHAR(100) NOT NULL ,
  User_Id  INTEGER ,
  FOREIGN KEY (User_Id) REFERENCES USERS(ID)

);`;

const createTable_Doctors = `
CREATE TABLE IF NOT EXISTS Doctors  
( 
  Id   INTEGER PRIMARY KEY, 
  Name  VARCHAR(30) NOT NULL, 
  User_Id  INTEGER,
  FOREIGN KEY (User_Id) REFERENCES USERS(ID)

);`;

const createTable_Patients = `
CREATE TABLE IF NOT EXISTS Patients  
( 
  Id  varchar(20) PRIMARY KEY NOT NULL, 
  Name  VARCHAR(50) NOT NULL 
)
`;

const createTable_Medicins = `
CREATE TABLE IF NOT EXISTS Medicins 
( 
  Id  INTEGER PRIMARY KEY, 
  Name  VARCHAR(100) NOT NULL UNIQUE
);
`;

const createTable_Classifications = `
CREATE TABLE IF NOT EXISTS Classifications  
( 
  Id  INTEGER PRIMARY KEY, 
  Name VARCHAR(25) NOT NULL UNIQUE
); `;

const createTable_Prescriptions = `
CREATE TABLE IF NOT EXISTS Prescriptions 
( 
  Id  INTEGER PRIMARY KEY, 
  Doctor_Id   INTEGER , 
  Patient_Id  varchar(20) , 
  Classification_Id  INTEGER , 
  Pre_Date  TIMESTAMP, 
  Description  VARCHAR(200) ,
  FOREIGN KEY (Doctor_Id) REFERENCES DOCTORS(ID),
  FOREIGN KEY (Patient_Id) REFERENCES PATIENTS(ID),
  FOREIGN KEY (Classification_Id) REFERENCES CLASSIFICATIONS (ID)
); `;

const createTable_MedicinePrescription = `
CREATE TABLE IF NOT EXISTS Medicine_Prescription  
( 
  Medicine_Id  INTEGER , 
  Prescription_Id  INTEGER , 
  IsBold CHAR(1) NOT NULL, 
  IsChronic CHAR(1) NOT NULL, 
  Pharmacy_Id   INTEGER , 
  PRIMARY KEY  ( Medicine_ID, Prescription_ID),
  FOREIGN KEY (Medicine_Id) REFERENCES MEDICINS (ID),
  FOREIGN KEY (Prescription_Id)  REFERENCES PRESCRIPTIONS (ID),
  FOREIGN KEY (Pharmacy_Id) REFERENCES Pharmacies(ID)

);`;

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

const getUserTypeId = `
select * from UsersTypes where lower(type) == lower(?)
`;

const getUserTypeById = `
select * from UsersTypes where id == ?
`;

const getPatientsById = `
select * from Patients where lower(id) like lower(?)
`;

const getDoctorIdByUsername = `
SELECT d.id 
from doctors d , users u
where d.USER_ID = u.ID and lower(u.username) = lower(?)`;

const getPharmacyIdByUsername = `
SELECT p.id 
from Pharmacies p , users u
where p.USER_ID = u.ID and lower(u.username) = lower(?)
`;

const getMedicinsByName = `
Select * from Medicins where lower(Name) Like lower( ? )
`;

const medicineExist = `
Select * from Medicins where lower(Name) = lower( ? )
`;

const getUser = `
select * from Users where username=? 
`;

const getPatientPrescriptions = `
  select * from prescriptions 
  where patient_id = ? 
`;

const getPatientPrescriptionsByClassification = `
  select * from prescriptions 
  where patient_id = ? and classification_Id = ?
`;

const getPrescriptionMedicins = `
  select * from Medicine_Prescription where prescription_ID = ?
`;

const getClassificationsAll = `
select * from Classifications ;
`;

const dispenseMedicine = `
update Medicine_Prescription 
set Pharmacy_Id = ?
where medicine_Id = ? and prescription_Id = ?
`;

const stopChronincMedicine = `
update Medicine_Prescription 
set isChronic = '0'
where medicine_Id = ? and prescription_Id = ?
`;

const createMedicinsIndex = `CREATE INDEX IF NOT EXISTS medicine_name_idx ON Medicins(Name);`;

const createIndicesPatch = [createMedicinsIndex];

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
  "Drop Table IF EXISTS Doctors",
  "Drop Table IF EXISTS Pharmacies",
  "Drop Table IF EXISTS UsersTypes",
  "Drop Table IF EXISTS Users",
  "Drop Table IF EXISTS Patients",
  "Drop Table IF EXISTS Medicins",
  "Drop Table IF EXISTS Classifications",
  "Drop Table IF EXISTS Prescriptions",
  "Drop Table IF EXISTS Medicine_Prescription"
];

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
  createIndicesPatch,
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
  insert_MedicinePrescription,
  getMedicinsByName,
  medicineExist,
  getUserTypeId,
  getUserTypeById,
  getPatientsById,
  getDoctorIdByUsername,
  getUser,
  getPatientPrescriptions,
  getPatientPrescriptionsByClassification,
  getPrescriptionMedicins,
  getClassificationsAll,
  getPharmacyIdByUsername,
  dispenseMedicine,
  stopChronincMedicine
};
