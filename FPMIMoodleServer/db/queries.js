const mysql = require('mysql');


const moodleConnection = mysql.createConnection({
  host: 'your-moodle-database-host',
  user: 'your-moodle-database-username',
  password: 'your-moodle-database-password',
  database: 'your-moodle-database-name'
});
const localConnection = mysql.createConnection({
  host: 'your-local-database-host',
  user: 'your-local-database-username',
  password: 'your-local-database-password',
  database: 'your-local-database-name'
});


moodleConnection.connect();


localConnection.connect();


const query = 'SELECT * FROM your_moodle_table';
moodleConnection.query(query, (error, results, fields) => {
  if (error) throw error;


  results.forEach(result => {
    const insertQuery = 'INSERT INTO your_local_table (column1, column2, ...) VALUES (?, ?, ...)';
    const values = [result.column1, result.column2, ...];

    localConnection.query(insertQuery, values, (insertError, insertResults, insertFields) => {
      if (insertError) throw insertError;

      console.log('Data inserted successfully:', insertResults);
    });
  });

  
  moodleConnection.end();
  localConnection.end();
});end();
