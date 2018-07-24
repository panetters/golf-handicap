const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const axios = require('axios');

require('dotenv').config();
const database = require('../db/database.js');

let app = express();

app.use(bodyParser.json());
app.use(session({
  cookieName: 'session',
  secret: 'mashed_potatoes',
  resave: false,
  saveUninitialized: true,
}));

app.use('/handycap', express.static(__dirname + '/../client/dist'));

app.get('/handycap/', (req, res) => {
  console.log('GET request for home by: ', req.session.user)
  if (!req.session.user) {
    res.redirect('/handycap/login');
  } else {
    res.sendFile(path.resolve(__dirname + '/../client/views/index.html'));
  }
});

app.get('/handycap/user', async (req, res) => {
  console.log('GET request for user');
  res.send(req.session.user);
});

app.get('/handycap/userScores', async (req, res) => {
  console.log('GET request for user scores');
  let scores = await database.getScores(req.session.user);
  res.send(scores.rows);
});

app.post('/handycap/search', async (req, res) => {
  console.log('POST request for search');
  let courseResults = await database.getCourses(req.body);
  res.send(courseResults);
});

app.get('/handycap/courseInfo/*', async (req, res) => {
  let courseId = req.url.slice(req.url.lastIndexOf('/handycap/') + 1);
  console.log('GET request for course: ', courseId);
  let url = `http://jusme.org/getcourseinfo.php?type=details&CourseID=${courseId}&output=json`
  let ratings = await axios.get(url);
  res.send(ratings.data.M);
});

app.post('/handycap/addScore', async (req, res) => {
  console.log('POST request for adding score');
  let wait = database.addScore(req.body);
  res.send('Success');
});

app.post('/handycap/logout', (req, res) => {
  req.session.user = '';
});

app.get('/handycap/login', (req, res) => {
  console.log('GET request for login');
  res.sendFile(path.resolve(__dirname + '/../client/views/login.html'));
});

app.post('/handycap/login', async (req, res) => {
  console.log('POST request for login');

  let dbResult = await database.verifyUser(req.body);

  if (dbResult) {
    req.session.user = req.body.username;
    res.send({redirect: '/handycap/'});
  } else {
    res.send('Error');
  }
});

app.get('/handycap/register', (req, res) => {
  console.log('GET request for register');
  res.sendFile(path.resolve(__dirname + '/../client/views/register.html'));
});

app.post('/handycap/register', async (req, res) => {
  console.log('POST request for register');

  let dbResult = await database.addUser(req.body);

  if (dbResult) {
    req.session.user = req.body.username;
    res.send({redirect: '/handycap/'});
  } else {
    res.send('Error');
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Listening on port ' + port);
});
