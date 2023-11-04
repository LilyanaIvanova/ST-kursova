const Pool = require('pg').Pool

const pool = new Pool({
  user: 'admin',
  host: 'localhost', // FIXME: Temp
  database: 'student_data',
  password: 'admin',
  port: 5432,
})