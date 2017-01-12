/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.log ('ENOENT');
      callback(err, content);
    }
    var lines = content.toString().split('\n');
    var line = lines[0];
    callback(err, line);
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  request(url, function (error, response, body) {
    if (error) {
      callback(error);
    }
    if (!error && response.statusCode === 200) {
      callback(error, response.statusCode); 
    }
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};