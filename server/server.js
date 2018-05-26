const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const database = require('../db/database.js');

let app = express();

app.use(bodyParser.json());
app.use(session({
  cookieName: 'session',
  secret: 'mashed_potatoes',
  resave: false,
  saveUninitialized: true,
}));

app.use(express.static(__dirname + '/../client/dist'));

app.get('/', (req, res) => {
  console.log('GET request for home by: ', req.session.user)
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    res.sendFile(path.resolve(__dirname + '/../client/views/index.html'));
  }
});

app.get('/user', async (req, res) => {
  console.log('GET request for user');
  res.send(req.session.user);
});

app.get('/userscores', async (req, res) => {
  console.log('GET request for user scores');
  let scores = await database.getScores(req.session.user);
  res.send(scores.rows);
});

app.post('/logout', (req, res) => {
  req.session.user = '';
});

app.get('/login', (req, res) => {
  console.log('GET request for login');
  res.sendFile(path.resolve(__dirname + '/../client/views/login.html'));
});

app.post('/login', async (req, res) => {
  console.log('POST request for login');

  let dbResult = await database.verifyUser(req.body);

  if (dbResult) {
    req.session.user = req.body.username;
    res.send({redirect: '/'});
  } else {
    res.send('Error');
  }
});

app.get('/register', (req, res) => {
  console.log('GET request for register');
  res.sendFile(path.resolve(__dirname + '/../client/views/register.html'));
});

app.post('/register', async (req, res) => {
  console.log('POST request for register');

  let dbResult = await database.addUser(req.body);

  if (dbResult) {
    req.session.user = req.body.username;
    res.send({redirect: '/'});
  } else {
    res.send('Error');
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Listening on port ' + port);
});
