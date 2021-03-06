class SqlQueries {
  transactionBegin = `BEGIN TRANSACTION;`;
  transactionCommit = `COMMIT;`;
  transactionRollback = `ROLLBACK;`;

  //UserTypes
  //---------
  createTable_UserTypes = `
  CREATE TABLE IF NOT EXISTS UsersTypes ( 
      Id   INTEGER PRIMARY KEY, 
      Type   VARCHAR(30) NOT NULL UNIQUE
  );`;

  insert_UserType = `
  INSERT INTO UsersTypes (type) VALUES (?);
  `;

  getUserTypeId = `
  select Id from UsersTypes where lower(type) == lower(?)
  `;

  getUserTypeById = `
  select * from UsersTypes where id == ?
  `;

  //Users
  //---------
  createTable_Users = `
CREATE TABLE IF NOT EXISTS Users 
( 
Id INTEGER PRIMARY KEY, 
UserType_Id   INTEGER , 
Username  VARCHAR(25) NOT NULL UNIQUE, 
Password  VARCHAR(50) NOT NULL ,
IsActive CHAR(1) ,
Contact VARCHAR(50),
FOREIGN KEY (UserType_Id) REFERENCES USERSTYPES(ID)
)`;

  createTable_UsersTokens = `
CREATE TABLE IF NOT EXISTS UsersTokens (
  Id INTEGER PRIMARY KEY  ON CONFLICT REPLACE, 
  Token VARCHAR(50) ,
  FOREIGN KEY (Id) REFERENCES USERS(ID) ON DELETE CASCADE
)
`;

  insert_User = `
INSERT INTO USERS (UserType_Id,username,password,IsActive,Contact) VALUES (?,?,?,'1',?) ;
`;

  getUser = `
  select u.Id , u.Username , u.Password,u.IsActive,u.UserType_Id,u.Contact,ut.Type
 from Users u , UsersTypes ut
  where u.username=? and u.UserType_Id = ut.Id
`;

  getUserById = `
select * from Users where Id=? 
`;

  getAllUsers = `
select * from Users  
`;

  toggleUserActive = `
update users 
set IsActive = '1'
where id = ? and IsActive is  Null
`;

  toggleUserInActive = `
update users 
set IsActive = null
where id = ? and IsActive is not Null
`;

  setUserToken = `
  insert or replace into UsersTokens
  (Id,Token) VALUES (?,?)
`;

  getUserToken = `
  SELECT t.Token
  from users u left join UsersTokens t 
  on u.id = t.Id
  where u.Username = ?
  
`;

  //Pharmacies
  //---------
  createTable_Pharmacies = `
CREATE TABLE IF NOT EXISTS Pharmacies 
( 
  Id     INTEGER PRIMARY KEY, 
  Name    VARCHAR(20) NOT NULL, 
  Location   VARCHAR(100) NOT NULL ,
  User_Id  INTEGER ,
  FOREIGN KEY (User_Id) REFERENCES USERS(ID)

);`;

  insert_Pharmacy = `
INSERT INTO Pharmacies (Name,Location,User_Id) VALUES (?,?,?);
`;

  getPharmacyById = `
SELECT * 
from Pharmacies 
where User_Id = ?`;

  getPharmacyIdByUsername = `
SELECT p.id 
from Pharmacies p , users u
where p.USER_ID = u.ID and lower(u.username) = lower(?)
`;

  //Doctors
  //---------

  createTable_Doctors = `
  CREATE TABLE IF NOT EXISTS Doctors  
  ( 
    Id   INTEGER PRIMARY KEY, 
    Name  VARCHAR(30) NOT NULL, 
    User_Id  INTEGER,
    FOREIGN KEY (User_Id) REFERENCES USERS(ID)
  
  );`;

  insert_Doctor = `
  INSERT INTO Doctors (Name,User_Id) VALUES (?,?);
  `;

  getDoctorIdByUsername = `
  SELECT d.id 
  from doctors d , users u
  where d.USER_ID = u.ID and lower(u.username) = lower(?)`;

  getDoctorById = `
  SELECT * 
  from doctors 
  where User_Id = ?`;

  //Patients
  //---------

  createTable_Patients = `
CREATE TABLE IF NOT EXISTS Patients  
( 
  Id  varchar(20) PRIMARY KEY NOT NULL, 
  Name  VARCHAR(50) NOT NULL 
)
`;

  insert_Patient = `
INSERT INTO Patients (ID,Name) VALUES (?,?);
`;
  getPatientById = `
select * from Patients where lower(id) = lower(?)
`;

  //Medicins
  //---------
  createTable_Medicins = `
  CREATE TABLE IF NOT EXISTS Medicins 
  ( 
    Id  INTEGER PRIMARY KEY, 
    Name  VARCHAR(100) NOT NULL UNIQUE
  );`;

  insert_Medicine = `
  INSERT INTO Medicins (Name) VALUES (?);
  `;

  getAllMedicins = `
    SELECT * FROM MEDICINS;
  `;

  getMedicinsByName = `
Select * from Medicins where lower(Name) Like lower( ? )
`;

  medicineExist = `
Select * from Medicins where lower(Name) = lower( ? )
`;

  getPrescriptionMedicins = `
select m.name , mp.isBold,mp.IsChronic,mp.Pharmacy_Id
from Medicine_Prescription mp , Medicins m
where prescription_ID = ? and mp.Medicine_Id = m.Id
`;

  getPrescriptionMedicinsToDispense = `
select m.Id, m.name , mp.isBold,mp.IsChronic,mp.Pharmacy_Id
from Medicine_Prescription mp , Medicins m
where prescription_ID = ? and mp.Medicine_Id = m.Id and mp.Pharmacy_Id is NULL
`;

  dispenseMedicins = `
  update Medicine_Prescription 
  set Pharmacy_Id = ?
  where prescription_Id = ? and medicine_Id in 
`;

  stopChronincMedicine = `
update Medicine_Prescription 
set isChronic = '0'
where medicine_Id = ? and prescription_Id = ?
`;

  //Classifications
  //--------------
  createTable_Classifications = `
CREATE TABLE IF NOT EXISTS Classifications  
( 
  Id  INTEGER PRIMARY KEY, 
  Name VARCHAR(25) NOT NULL UNIQUE,
  ImageUrl VARCHAR(100)
); `;

  insert_Classification = `
INSERT INTO Classifications (Name,ImageUrl) VALUES (?,?);
`;

  getClassificationsAll = `
select * from Classifications ;
`;

  //Conditions
  //-----------
  createTable_Conditions = `
CREATE TABLE IF NOT EXISTS Conditions  
( 
  Id  INTEGER PRIMARY KEY, 
  Name VARCHAR(25) NOT NULL UNIQUE,
  Classification_Id  INTEGER NOT NULL , 
  FOREIGN KEY (Classification_Id) REFERENCES CLASSIFICATIONS (ID)
); `;

  insert_Condition = `
  INSERT INTO Conditions (Name,Classification_Id) VALUES (?,?);
`;

  getConditionsByClassification = `
SELECT * from Conditions 
where Classification_Id = ?
`;

  //Prescriptions
  //------------

  createTable_Prescriptions = `
CREATE TABLE IF NOT EXISTS Prescriptions 
( 
  Id  INTEGER PRIMARY KEY, 
  Doctor_Id   INTEGER NOT NULL, 
  Patient_Id  varchar(20) NOT NULL, 
  Condition_Id INTEGER NOT NULL,
  Pre_Date  TIMESTAMP, 
  Description  VARCHAR(200) ,
  IsDispensed CHAR(1), 
  FOREIGN KEY (Doctor_Id) REFERENCES DOCTORS(ID),
  FOREIGN KEY (Patient_Id) REFERENCES PATIENTS(ID),
  FOREIGN KEY (Condition_Id) REFERENCES Conditions (ID)
); `;

  createTable_MedicinePrescription = `
CREATE TABLE IF NOT EXISTS Medicine_Prescription  
( 
  Medicine_Id  INTEGER NOT NULL, 
  Prescription_Id  INTEGER NOT NULL, 
  IsBold CHAR(1) NOT NULL, 
  IsChronic CHAR(1) NOT NULL, 
  Pharmacy_Id   INTEGER , 
  PRIMARY KEY  ( Medicine_ID, Prescription_ID),
  FOREIGN KEY (Medicine_Id) REFERENCES MEDICINS (ID) ON DELETE CASCADE ,
  FOREIGN KEY (Prescription_Id)  REFERENCES PRESCRIPTIONS (ID) ON DELETE CASCADE ,
  FOREIGN KEY (Pharmacy_Id) REFERENCES Pharmacies(ID)

);`;

  insert_Prescription = `
INSERT INTO Prescriptions (Doctor_Id,Patient_Id,Condition_Id,Pre_Date,Description)
 VALUES (?,?,?,?,?);
`;

  insert_MedicinePrescription = `
INSERT INTO Medicine_Prescription (Medicine_ID,Prescription_ID,isBold,isChronic,Pharmacy_Id) VALUES (?,?,?,?,?);
`;

  getPatientPrescriptions = `
  SELECT
 p.Id , p.Doctor_Id , p.Description as Note,
 p.Pre_Date as Prescription_Date ,
 c.Id as Classification_Id ,
 c.Name as Classification_Name ,
 conditions.Name as Condition,
 c.ImageUrl as ClassificationIconUrl 
  FROM prescriptions p ,
  Classifications c ,
  Conditions conditions
  where patient_id = ? and
   c.id = Conditions.Classification_Id and
   conditions.id = p.Condition_Id
`;

  getPatientPrescriptionsToDispense = `
  SELECT 
  p.Id , p.Doctor_Id , p.Description as Note,
  p.Pre_Date as Prescription_Date , 
  c.ImageUrl as ClassificationIconUrl ,
  Conditions.Name as Condition
  from prescriptions p ,
   Classifications c ,
   Conditions conditions
   where p.IsDispensed is NuLL and
   patient_id = ? and
   conditions.id = p.Condition_Id and
   c.id = Conditions.Classification_Id 
  `;

  getPatientPrescriptionsByClassification = `
  SELECT
  p.Id , p.Doctor_Id , p.Description as Note,
  p.Pre_Date as Prescription_Date ,
  c.Id as Classification_Id ,
  c.Name as Classification_Name ,
  conditions.Name as Condition,
  c.ImageUrl as ClassificationIconUrl 
   FROM prescriptions p ,
   Classifications c ,
   Conditions conditions
   where patient_id = ? and
    c.id = ? and
    c.id = Conditions.Classification_Id and
    conditions.id = p.Condition_Id
 `;

  setPrescriptionDispensed = `
  update Prescriptions
  set IsDispensed = '1'
  where ID = ?
`;

  getPrescriptionsAfterDate = `
SELECT strftime("%Y-%m", Pre_Date) as Date,
count(*) as Count from Prescriptions
where Pre_Date > ?
group by strftime("%m-%Y", Pre_Date)
ORDER by Date DESC 
`;

  getPrescriptionsPerClassificationCount = `
  SELECT count(p.Id) as Count , c.Name 
  from Classifications c 
  left outer join Prescriptions p ,Conditions conditions 
  on c.Id = Conditions.Classification_Id 
  where p.Condition_Id = Conditions.id
  and p.Pre_Date> ? and p.Pre_Date < ?
  group by Classification_Id
`;

  getMedicinsUsage = `
SELECT   mp.Medicine_Id , m.Name , count(mp.Medicine_Id) as Count 
FROM Prescriptions p , Medicine_Prescription mp , Medicins m
where p.id = mp.Prescription_Id
and m.id = mp.Medicine_Id 
and Pre_Date > ? 
and Pre_Date < ?
GROUP by mp.Medicine_Id
ORDER by Count DESC
limit ?
`;

  //AccountRequests
  //---------------

  createTable_AccountRequests = `
CREATE TABLE IF NOT EXISTS AccountRequests  
( 
  Id  INTEGER PRIMARY KEY, 
  Name VARCHAR(25) NOT NULL ,
  Type VARCHAR(25) NOT NULL ,
  Phone VARCHAR(25) NOT NULL ,
  Email VARCHAR(25)  ,
  IsRead CHAR(1)
);`;

  insert_AccountRequest = `
INSERT INTO AccountRequests ( Name, Type, Phone, Email ) VALUES (?,?,?,?);
`;

  getNewAccountRequests = `
Select Id, Name , Type,Phone,Email from AccountRequests 
where IsRead is NULL
`;

  markAccountRequestRead = `
update AccountRequests 
set IsRead = '1'
where Id = ?
`;

  //MessagesCategories
  //-----------------
  createTable_MessageCategories = `
CREATE TABLE IF NOT EXISTS MessagesCategories  
( 
  Id  INTEGER PRIMARY KEY, 
  Name VARCHAR(25) NOT NULL UNIQUE
);`;

  insert_MessagesCategories = `
INSERT INTO MessagesCategories (Name) VALUES (?);
`;

  get_MessagesCategories = `
  Select * from MessagesCategories
`;

  //Messages
  //--------

  createTable_Messages = `
CREATE TABLE IF NOT EXISTS Messages  
( 
  Id  INTEGER PRIMARY KEY, 
  User_Id INTEGER,
  Category_Id Integer,
  Content VARCHAR(50) NOT NULL,
  IsRead CHAR(1) ,
  FOREIGN KEY (User_Id) REFERENCES USERS (ID) ON DELETE CASCADE ,
  FOREIGN KEY (Category_Id) REFERENCES MessagesCategories (ID) ON DELETE CASCADE 
);`;

  insert_Message = `
INSERT INTO Messages (User_Id,Category_Id,Content) VALUES (?,?,?);
`;

  getNewMessages = `
Select m.Id, m.User_Id , m.Content , c.Name as Category, u.UserType_Id
from Messages m, MessagesCategories c , Users u
where IsRead is NULL and m.Category_Id = c.id and u.Id = m.User_Id
`;

  markMessageRead = `
update Messages 
set IsRead = '1'
where Id = ?
`;

  createMedicinsIndex = `CREATE INDEX IF NOT EXISTS medicine_name_idx ON Medicins(Name);`;
  createIndicesPatch = [this.createMedicinsIndex];

  emptyAllTablesPatch = [
    "Delete from UsersTypes",
    "Delete from Users",
    "Delete from Pharmacies",
    "Delete from Doctors",
    "Delete from Patients",
    "Delete from Medicins",
    "Delete from Classifications",
    "Delete from Prescriptions",
    "Delete from Medicine_Prescription",
  ];

  dropAllTabels = `
  select 'drop table ' || name || ';' as query
  from sqlite_master
  where type = 'table';`;

  createTablesPatch = [
    this.createTable_Users,
    this.createTable_UsersTokens,
    this.createTable_UserTypes,
    this.createTable_Pharmacies,
    this.createTable_Doctors,
    this.createTable_Patients,
    this.createTable_Medicins,
    this.createTable_Classifications,
    this.createTable_Prescriptions,
    this.createTable_MedicinePrescription,
    this.createTable_MessageCategories,
    this.createTable_Messages,
    this.createTable_AccountRequests,
    this.createTable_Conditions,
  ];
}

module.exports = new SqlQueries();
