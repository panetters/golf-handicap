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

app.get('/login', (req, res) => {
  console.log('GET request for login');
  res.sendFile(path.resolve(__dirname + '/../client/views/login.html'));
});

app.post('/login', (req, res) => {
  console.log('Info: ', req.body);
});

app.get('/register', (req, res) => {
  console.log('GET request for register');
  res.sendFile(path.resolve(__dirname + '/../client/views/register.html'));
});

app.post('/register', async (req, res) => {
  console.log('POST request for register');
  let dbResult;
  try {
    dbResult = await database.addUser(req.body);
  } catch(err) {
    console.log('DB ENTRY FAIL');
  }

  if (dbResult) {
    req.session.user = req.body.username;
    res.redirect('/');
  } else {
    res.send('Error');
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Listening on port ' + port);
});
