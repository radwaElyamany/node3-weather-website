const request = require('request');

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=9a53308bddf932d5827f35737bb766de&query=${lat},${long}&units=f`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to weather service');
    } else if (body.error) {
      callback('Unable to find location');
    } else {
      const { temperature, feelslike, weather_descriptions } = body.current;
      callback(
        undefined,
        `${
          weather_descriptions[0] ? weather_descriptions[0] + '. ' : ''
        }It is currently ${temperature} degrees. It feels like ${feelslike} degrees out`
      );
    }
  });
};

module.exports = forecast;
