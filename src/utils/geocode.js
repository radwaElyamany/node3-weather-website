const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoicmFkd2FlbHlhbWFueSIsImEiOiJja2I5OGpjZGQwYnJkMnlwaTdiN3JqY21tIn0.aMaJw0zPz5bTZvcEoq49JA&limit=1`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to location service');
    } else if (!body.features.length) {
      callback('Unable to find location');
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        long: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
