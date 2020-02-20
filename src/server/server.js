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
const dotenv = require('dotenv');
const cors = require("cors");
var bodyParser = require('body-parser')
dotenv.config();



const app = express()

//Middleware//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
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
    comingFrom: "Coming from app.post"
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
