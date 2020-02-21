// Setup empty JS object to act as endpoint for all routes
/*
projectData = {};
// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Dependencies //
const bodyParser = require('body-parser')
//Middleware//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const port = 8080;
const server = app.listen(port, listening);
function listening() {
  console.log(`running on localhost: ${port}`);
};
// Callback to debug

*/

const projectData = {};
const path = require('path')
const express = require('express')
const request = require('request');
const dotenv = require('dotenv');
const cors = require("cors");
var bodyParser = require('body-parser')
dotenv.config();



const app = express()

//Middleware//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

/*
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  request(
    { url: 'https://api.darksky.net/forecast/' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error.message });
      }

      res.json(JSON.parse(body));
    }
  )
});
*/

app.use(express.static('dist'))
app.listen(8081, function () {
  console.log('Example app listening on port 8081!')
})


// Initialize all route with a callback function
app.get('/', callBack)


// Callback function to complete GET
function callBack(req, res) {
  res.send(projectData)
}

// Post Route

const userData = []

app.get('/all', getData)

function getData(req, res){
  res.send(userData)
}

app.post('/getUserEntry', function (req, res) {
  let data = req.body;
  newEntry = {
    latitude: data.latitude,
    longitude: data.longitude,
    country: data.country,
    comingFrom: "Coming from app.post",
    temperatureHigh: data.temperatureHigh,
    temperatureLow: data.temperatureLow,
    city: data.city,
    daysBeforeTrip: data.daysBeforeTrip,
    image: data.image
  }

  console.log(newEntry)
  
  userData.push(newEntry)
  res.send(userData)
  /*
  projectData["zip"] = data.zip;
  projectData["date"] = data.date;
  projectData["feelings"] = data.feelings;
  console.log(projectData)
  */

})

app.post('/getTemperature', function (req, res) {
  let data = req.body;
  newEntry = {
    temperatureHigh: data.temperatureHigh,
    temperatureLow: data.temperatureLow
  }

  console.log(newEntry)
  
  userData.push(newEntry)
  res.send(userData)
  /*
  projectData["zip"] = data.zip;
  projectData["date"] = data.date;
  projectData["feelings"] = data.feelings;
  console.log(projectData)
  */

})
