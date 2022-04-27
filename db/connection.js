const mysql = require('mysql2');

//connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // your MySQL username,
        user: 'root',
        database: 'employeetracker'
    },
    
        console.log('Database is connected successfully!')
    );


module.exports = db;
