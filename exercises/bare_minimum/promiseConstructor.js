/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filePath, function(err, data) {
      if (err) {
        reject(err);
      } else {
        var lines = data.toString().split('\n');
        var line = lines[0];
        resolve(line);
      }
    });
  });

};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  return new Promise(function (resolve, reject) {
    request(url, function (error, response, body) {
      if (error) {
        reject(error);
      }
      if (!error && response.statusCode === 200) {
        resolve(response.statusCode); 
      }
    });
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
