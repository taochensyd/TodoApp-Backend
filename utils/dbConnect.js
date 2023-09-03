const mysql = require('mysql2');
const util = require('util');
const sleep = util.promisify(setTimeout);

let connection;
let inMemoryData = [];

const connectToDB = () => {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  connection.connect((err) => {
    if (err) {
      console.error('Failed to connect to database:', err);
      console.log('Retrying in 5 seconds...');
      // Store data in memory if needed
      // inMemoryData.push(...);
      setTimeout(connectToDB, 5000);
    } else {
      console.log('Connected to database.');
      // Process in-memory data if needed
      // ...
    }
  });
};

const query = util.promisify(connection.query).bind(connection);

module.exports = { connectToDB, query, inMemoryData };
