const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complite','root','rp2009', {
    dialect: 'mysql', 
    host: 'localhost'
});

module.exports = sequelize;
//const mysql = require('mysql2');

//const pool = mysql.createPool({
//    host: 'localhost',
//    user: 'root',
//   database: 'node-complite',
//    password: 'rp2009'
//});

//module.exports = pool.promise();