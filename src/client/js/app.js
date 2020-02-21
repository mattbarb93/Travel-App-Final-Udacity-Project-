// Information for Geonames API
let geonamesBaseURL = "http://api.geonames.org/postalCodeSearchJSON?placename=";
let username = "&username=mattbarb93";

//Information and API Key for Dark Sky
let forecastBaseURL = "https://api.darksky.net/forecast/";
let forecastAPI = "8f21f6a879c526bedb3e07e5146399cf";

//CORS Anywhere - Use it to bypass the CORS error
let corsAnywhere = "https://cors-anywhere.herokuapp.com/"

//Pixabay API
let pictureBaseURL = "https://pixabay.com/api/"
let pictureAPI = "15337138-4b8bccea66ade28d93ec8857b"

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */

function performAction(e) {
  let city = document.getElementById('city').value;

  //Get the current date, get the trip date from the user, calculate the difference between dates using the formula

  const currentDate = new Date(),
    tripDate = new Date(document.getElementById('trip-date').value),
    difference = dateDiffInDays(currentDate, tripDate);

  //Using this to add it to the Dark Sky API, and get the API call to check the future temperature
  let tripDateUNIX = Math.round(tripDate.getTime() / 1000);

  console.log(tripDateUNIX)



  console.log("Days until trip: " + difference)


  getLatitudeInfo(geonamesBaseURL, city, username)

    .then(function (data) {
      getForecastInfo(corsAnywhere, forecastBaseURL, forecastAPI, data.lat, data.lng, tripDateUNIX)
        .then(function (weatherData) {
          console.log(weatherData)
          getPictureInfo(pictureBaseURL, pictureAPI, city)
            .then(function (picture) {
              console.log(picture);
              postData('/getUserEntry', {
                temperatureHigh: weatherData.daily.data[0].temperatureHigh,
                temperatureLow: weatherData.daily.data[0].temperatureLow,
                latitude: data.lat,
                longitude: data.lng,
                country: data.countryCode,
                comingFrom: "postDATA",
                city: data.placeName,
                daysBeforeTrip: difference,
                image: picture.hits[0].webformatURL

              })

              updateUI()
            })




        })



    }

    )
}

//GET request to the GeoNames API - Latitude X Longitude info
const getLatitudeInfo = async (geonamesBaseURL, city, username) => {
  const res = await fetch(geonamesBaseURL + city + username)
  try {
    const data = await res.json();
    console.log(data);
    return data.postalCodes[0];
  } catch (error) {
    console.log("error", error);
  }
}

const getForecastInfo = async (corsAnywhere, forecastBaseURL, forecastAPI, lat, lng, tripDateUNIX) => {
  const res = await fetch(corsAnywhere + forecastBaseURL + forecastAPI + "/" + lat + "," + lng + "," + tripDateUNIX)
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

const getPictureInfo = async (pictureBaseURL, pictureAPI, city) => {
  const res = await fetch(pictureBaseURL + "?key=" + pictureAPI + "&q=" + city + "&image_type=photo")
  try {
    const data = await res.json();
    if (data.total === 0) {
      console.log("it's empty. run a query of an airplane");
      const res = await fetch(pictureBaseURL + "?key=" + pictureAPI + "&q=airplane" + "&image_type=photo")
      try {
        const data = await res.json();
        return data;
      } catch (error) {
        console.log("error", error)
      }

    }
    return data;
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
    console.log("this is allData: " + allData)

    /*WORK ON IT LATER: INPUT VALIDATION
    if (allData[allData.length - 1].latitude = undefined) {
      alert("No cities were found! Please try again!")
    }
    else {

    }
    */
    document.getElementById('min-temp').innerHTML = allData[allData.length - 1].temperatureLow;
    document.getElementById('max-temp').innerHTML = allData[allData.length - 1].temperatureHigh;
    document.getElementById('country').innerHTML = allData[allData.length - 1].country;
    document.getElementById('daysBeforeTrip').innerHTML = allData[allData.length - 1].daysBeforeTrip;

    document.getElementById('city-trip').innerHTML = allData[allData.length - 1].city;

    if (allData[allData.length - 1].image === undefined) {
      document.getElementById('picture').src = "https://pixabay.com/get/5ee4d4474e53b108f5d084609629327d1638dfe65b4c704c7d2d79d2924dcd5b_640.jpg";
    }
    else {
      document.getElementById('picture').src = allData[allData.length - 1].image
    }



  } catch (error) {
    console.log("error", error);
  }
}


//CALCULATING DIFFERENCE BETWEEN CURRENT DATE AND TRIP DATE
const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY) + 1;
}


/* Function to GET Project Data */

export { getLatitudeInfo }
export { getForecastInfo }
export { postData }
export { updateUI }