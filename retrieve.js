const { Client } = require('pg');
const request = require('request');
const fs = require('fs');

const dbClient = new Client({
  user: 'mtpan',
  host: 'localhost',
  database: 'courses',
  password: 'password',
  port: 5432,
});

dbClient.connect();

const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];
const states1 = ['AL', 'AK', 'AZ', 'AR', 'CA'];

const writeLoop = async (stateObj) => {
  let path = 'courses.txt'
  for (let id in stateObj) {
    let string = (id + ',' + stateObj[id].course_name + ',' + stateObj[id].city + ',' + stateObj[id].state + '\n'); 
    await fs.appendFile(path, string, (err) => { if (err) {throw err} });
  }
}

const stateLoop = () => {
  for (let state of states1) {

    request(`http://jusme.org/getcourseinfo.php?type=meta&state=${state}&output=json`, (err, res, body) => {
      if (err) { console.log('Request Error: ', err); }
  
      let listing = JSON.parse(body);
      writeLoop(listing);
  
    });

  }
}
stateLoop();
dbClient.end();




