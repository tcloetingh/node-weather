const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=7ed6d264b9eb74a0b59ada2021dbb178&query=${longitude},${latitude}`;

  request({ url, json: true }, (error, response) => {
    const { temperature } = response.body.current;
    if (error) {
      callback("unable to connect to service", undefined);
    } else {
      callback(undefined, `${temperature} degrees celcius`);
    }
  });
};

module.exports = forecast;
