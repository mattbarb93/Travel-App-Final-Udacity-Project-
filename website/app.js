// Personal API Key for OpenWeatherMap API
let baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
let apiKey = "&appid=6a177dd25f1d23a27bcc69db35ffaaf0";

const feelings = document.getElementById('feelings').value;

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */

function performAction(e) {
  let zip = document.getElementById('zip').value;
  let feelings = document.getElementById('feelings').value;
  let date = new Date();
  //getUserData(zip, feelings, date)
  getWeatherInfo(baseURL, zip, apiKey)
  
    .then(function (data) {
      postData('/getUserEntry', { temperature: data.main.temp, date: date, feelings: feelings, comingFrom: "postDATA" })
      updateUI()
    }

    )

}

//GET request to the Open Weather API
const getWeatherInfo = async (baseURL, zip, apiKey) => {
  const res = await fetch(baseURL + zip + apiKey)
  try {
    const data = await res.json();
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
    //console.log(allData)
    document.getElementById('date').innerHTML = allData[0].date;
    document.getElementById('temp').innerHTML = allData[0].temperature;
    document.getElementById('content').innerHTML = allData[0].feelings;

  } catch (error) {
    console.log("error", error);
  }
}
/* Function to GET Project Data */
