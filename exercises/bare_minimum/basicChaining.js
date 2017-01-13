/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */
var promisification = require('./promisification');
var fs = require('fs');
var promiseConstructor = require('./promiseConstructor');
var Promise = require('bluebird');

var writeToFile = function (profile) {
  var x = this;
  x = (x.split('\''));
  x = x[0];

  profile = JSON.stringify(profile);
  //profile = "'" + profile + "'";
  console.log(JSON.parse(profile).id);
  fs.open(x, 'w', (err, fd) => {
    if (err) {
      console.log('ERROR creating file for site');
    }
    fs.appendFile(x, profile, (err) => {
      if (err) {
        console.log('Failed to write content to file!');
      }
    });
    fs.close(fd);
  });
};

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  const writeFile = Promise.promisify(fs.writeFile);
  return new Promise( (resolve, reject) => {
    // var x = writeToFile.bind(writeFilePath);
    resolve(promiseConstructor.pluckFirstLineFromFileAsync(readFilePath)
      .then(promisification.getGitHubProfileAsync)
      // .then(writeToFile)
      .then((profile) => {
        // console.log(profile, 'profile');
        // console.log(JSON.stringify(profile), 'stringify');
        return writeFile(writeFilePath, JSON.stringify(profile));
      }));
  });
};


// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};


/*
var firstMethod = function() {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('first method completed');
         resolve({data: '123'});
      }, 2000);
   });
   return promise;
};
 
 
var secondMethod = function(someStuff) {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('second method completed');
         resolve({newData: someStuff.data + ' some more data'});
      }, 2000);
   });
   return promise;
};
 
var thirdMethod = function(someStuff) {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('third method completed');
         resolve({result: someStuff.newData});
      }, 3000);
   });
   return promise;
};
 
firstMethod()
   .then(secondMethod)
   .then(thirdMethod);
 */











