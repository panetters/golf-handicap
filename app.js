const { Pool, Client } = require('pg');
const request = require('request');

const dbClient = new Client({
  user: 'mtpan',
  host: 'localhost',
  database: 'courses',
  password: 'password',
  port: 5432,
});

dbClient.connect();

const states = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];
const states1 = ['AK'];
for (let state of states1) {

  request(`http://jusme.org/getcourseinfo.php?type=meta&state=${state}&output=json`, (err, res, body) => {
    if (err) { console.log('Request Error: ', err); }

    let listing = JSON.parse(body);

    for (let id in listing) {
      console.log('ID: ', id);
      dbClient.query(`INSERT INTO courses (id, name, city, state) VALUES ('${id}', '${listing[id].course_name}', '${listing[id].city}', '${listing[id].state}')`, (err, res) => {
        if (err) { console.log('Query Error: ', err,'Query Response: ', res); }
        dbClient.end();
      })

    }

  });

};



