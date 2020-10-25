const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complite',
    password: 'rp2009'
});

module.exports = pool.promise();