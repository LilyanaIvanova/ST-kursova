const Pool = require('pg').Pool

const pool = new Pool({
  user: 'admin',
  host: 'localhost', 
  database: 'student_data',
  password: 'admin',
  port: 5432,
})
const XLSX = require('xlsx');
const pgp = require('pg-promise')();

const dbConfig = {
  host: 'localhost',
  port: '5432',
  database: 'uni_info',
  user: 'postgres',
  password: 'g@lin123', 
};


const db = pgp(dbConfig);


const workbook = XLSX.readFileSync('C:/Users/User/Downloads/RawStudentData.xlsx');
const sheetName = 'Simple';
const worksheet = workbook.Sheets[sheetName];


const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }).filter(row => row.some(cell => cell !== null));


const tableName = 'student_info';
const columns = ['mail', 'oks', 'course', 'fac', 'fac_num', 'grp', 'full_name', 'spec', 'status'];
const insertQuery = pgp.helpers.insert(data, columns, { table: tableName });



console.log(insertQuery);
db.none(insertQuery)
  .then(() => {
    console.log('Data inserted successfully!');
    pgp.end();
  })
  .catch(error => {
    console.error('Error inserting data:', error);
  });
