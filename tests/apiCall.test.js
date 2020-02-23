
import { getLatitudeInfo } from '../src/client/js/app.js'
import { getForecastInfo } from '../src/client/js/app.js'
import { postData } from '../src/client/js/app.js'
import { updateUI } from '../src/client/js/app.js'
const fetch = require('jest-fetch-mock');


describe('testing api', () => {
    //Resets the tests, and removes all mocked values
    beforeEach(() => {
        fetch.resetMocks()
    })

    
    //EXAMPLE. TWEAK IT OUT LATER!
    it('makes sure the function doesnt throw a null nor undefined', async () => {
        try {
          const response = await postData('http://localhost:8081/getUserEntry', {latitude: 41.297683,
          longitude:  -73.497268,
          country: 'US',
          comingFrom: "Coming from app.post",
          temperatureHigh: 51.27,
          temperatureLow: 36.58,
          city: 'Ridgefield',
          daysBeforeTrip: 5,
          image: 'https://pixabay.com/get/54e8d3414e5ba414f6da8c7dda79367b163cd9e450596c48702779d7924bc450bd_640.jpg'})
          expect.anything(response);
        } catch (e) {
          throw e
        }
      })
    
})
