const { Client } = require('pg');
const axios = require('axios');

const dbClient = new Client({
  user: process.env.DB_USER ||'mtpan',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'golfcourses',
  password: process.env.DB_PASSWORD || 'password',
  port: 5432,
});

dbClient.connect();

addUser = async (userInfo, cb) => {
  const text = 'INSERT INTO users(username, password) VALUES($1, $2)';
  const values = [userInfo.username, userInfo.password];

  try {
    await dbClient.query(text, values)
    return true;
  } catch(err) {
    console.log('DB insertion error: probable duplicate');
    return false;
  }

}

module.exports.addUser = addUser;