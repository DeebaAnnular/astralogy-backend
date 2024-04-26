const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'astralogy.cjum8q0m8h5v.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'astralogy',
    database: 'astralogy_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Ping database to check for common exception errors
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
    }
    if (connection) {
        connection.release();
        console.log('Connected to MySQL database');
    }
    return;
});

module.exports = pool.promise();
