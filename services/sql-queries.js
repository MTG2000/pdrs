const createPatientsTable = `   CREATE TABLE IF NOT EXISTS Patients(
    ID  CHAR (25)  PRIMARY KEY     ,
    NAME TEXT NOT NULL        
 );`;

const insertNewPatient = `INSERT INTO Patients (ID,NAME) VALUES (?,?)`;

module.exports = { createPatientsTable, insertNewPatient };
