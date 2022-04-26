const mysql = require('mysql2');

//connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // your MySQL username,
        user: 'root',
        database: 'employeetracker'
    },
    console.log('Connected to the employeetracker database')
);


module.exports = db;
