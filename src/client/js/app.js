// Information for Geonames API
let geonamesBaseURL = "http://api.geonames.org/postalCodeSearchJSON?placename=";
let username = "&username=mattbarb93";

//Information and API Key for Dark Sky
let forecastBaseURL = "https://api.darksky.net/forecast/";
let forecastAPI = "8f21f6a879c526bedb3e07e5146399cf";


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */

function performAction(e) {
  let city = document.getElementById('city').value;
  getLatitudeInfo(geonamesBaseURL, city, username)

    .then(function (data) {
      postData('/getUserEntry', { latitude: data.lat, longitude: data.lng, country: data.countryCode, comingFrom: "postDATA" })

      updateUI()
    }

    )
}

//GET request to the GeoNames API - Latitude X Longitude info
const getLatitudeInfo = async (geonamesBaseURL, city, username) => {
  const res = await fetch(geonamesBaseURL + city + username)
  try {
    const data = await res.json();
    console.log(data.postalCodes[0]);
    return data.postalCodes[0];
  } catch (error) {
    console.log("error", error);
  }
}


// Function to POST data 
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    // Body data type must match "Content-Type" header        
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
}

const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();

    if (document.getElementById('latitude').innerHTML === undefined) {
      alert("No cities were found! Please try again!")
    }
    else {
      document.getElementById('latitude').innerHTML = allData[allData.length - 1].latitude;
      document.getElementById('longitude').innerHTML = allData[allData.length - 1].longitude;
      document.getElementById('country').innerHTML = allData[allData.length - 1].country;
    }


  } catch (error) {
    console.log("error", error);
  }
}
/* Function to GET Project Data */

export { getLatitudeInfo }
export { postData }
export { updateUI }