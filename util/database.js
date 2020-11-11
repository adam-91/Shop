const mongodb = require('mongodb');

// const MongoClient = mongodb.MongoClient;

// let _db;

// const mongoConnect = (callback) => {
//     MongoClient.connect(
//         'mongodb+srv://mongoUser:ToJeStTeSt@cluster0.4gi4k.mongodb.net/<dbname>?retryWrites=true&w=majority',
//         {useUnifiedTopology: true}
//     )
//     .then(client => {
//         _db = client.db();
//         console.log('connected!');
//         callback();
//     })
//     .catch(err => {
//         console.log(err);
//     });
// };

// const getDb = () => {
//     if (_db) {
//         return _db;
//     }
//     throw "No db found!"
// };

//  exports.mongoConnect = mongoConnect;
//  exports.getDb = getDb;

// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('node-complite','root','rp2009', {
//     dialect: 'mysql', 
//     host: 'localhost'
// });

// module.exports = sequelize;
//const mysql = require('mysql2');

//const pool = mysql.createPool({
//    host: 'localhost',
//    user: 'root',
//   database: 'node-complite',
//    password: 'rp2009'
//});

//module.exports = pool.promise();