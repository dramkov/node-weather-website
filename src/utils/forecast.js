const request = require('request');

const forecast = (latitude, longitude, callback) => {
  //   const url =
  //     'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' +
  //     latitude +
  //     ',' +
  //     longitude;

  const options = {
    method: 'GET',
    url: 'https://community-open-weather-map.p.rapidapi.com/weather',
    qs: {
      lat: latitude,
      lon: longitude,
      units: 'metric',
    },
    headers: {
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
      'x-rapidapi-key': '90651aa0a1msh12227fdb3c06beep125067jsn17bab13f7f02',
    },
  };

  request(options, (error, response, body) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (response.body.error) {
      callback('Unable to find location', undefined);
    } else {
      const data = JSON.parse(body);
      callback(
        undefined,
        `On the sky you can see a ${data.weather[0].main} now .The temperature is ${data.main.temp}°С. Wind speed is ${data.wind.speed}km/h.`
      );
    }
  });
};

module.exports = forecast;
