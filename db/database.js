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

getCourses = async (search) => {
  const text = `SELECT courses.id, courses.name, cities.city, cities.state FROM courses INNER JOIN cities
    ON courses.city_id = cities.id WHERE courses.name ~* $1 OR cities.city ~* $1 LIMIT 10`;
  const values = ['.*' + search.query + '.*'];

  let courses = await dbClient.query(text, values);
  return courses;
}

addScore = async (scoreInfo) => {
  const userText = 'SELECT id FROM users WHERE username = $1';
  const userValues = [scoreInfo.user];

  let userId = await dbClient.query(userText, userValues);
  let today =  new Date(Date.now()).toDateString();

  const text = `INSERT INTO scores(user_id, course, gross_score, diff, date) VALUES($1, $2, $3, $4, $5)`;
  const values = [userId.rows[0].id, scoreInfo.course, parseInt(scoreInfo.score), scoreInfo.diff, today];
  
  await dbClient.query(text, values);
  return true;
}

module.exports.addUser = addUser;
module.exports.verifyUser = verifyUser;
module.exports.getScores = getScores;
module.exports.getCourses = getCourses;
module.exports.addScore = addScore;