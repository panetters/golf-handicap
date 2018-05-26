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

addUser = async (userInfo) => {
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

verifyUser = async (userInfo) => {
  const text = 'SELECT password FROM users WHERE username = $1';
  const values = [userInfo.username];

  let pword = await dbClient.query(text, values)

  if (pword.rows[0].password === userInfo.password) {
    return true;
  } else {
    console.log('Invalid user login');
    return false;
  }
}

getScores = async (userInfo) => {
  const userText = 'SELECT id FROM users WHERE username = $1';
  const userValues = [userInfo];
  let userId = await dbClient.query(userText, userValues);
  
  const scoresText = 'SELECT * FROM scores WHERE user_id = $1 ORDER BY date DESC LIMIT 20';
  const scoresValues = [userId.rows[0].id];
  let scores = await dbClient.query(scoresText, scoresValues);

  return scores;
}

module.exports.addUser = addUser;
module.exports.verifyUser = verifyUser;
module.exports.getScores = getScores;