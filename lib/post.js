'use strict';
var fs = require('fs');
var folderCheck = require('./folderCheck');

function POST(basePath, response, uniquePath, request, requestType) {
  console.log('Request handler "POST" was called');

  var input = '';

  request.on('data', function(data) {
    input += data.toString('utf-8');
    console.log('input: ' + input);
  });

  request.on('end', function() {

    //check for 'data' folder, creates if does not exist
    var basePath2 = basePath.substring(1, basePath.length);
    folderCheck.ensureExists(basePath2 + '/data', '0777', function(err) {
      if (err) throw err;
      else console.log("Directory checked");
    });

    var sentData = JSON.parse(input);
    console.dir('sentData: ' + sentData);
    var fileName = '.' + basePath + '/data/' + sentData[Object.keys(sentData)[0]] + '.json';
    console.log(fileName);

    var msg = JSON.stringify({msg: "File already exists!"});
    
    fs.exists(fileName, function(exists) {
      console.log(exists);
      console.log('exists filename: ' + fileName);
      if(exists === true) {
        console.log("already exists"); 
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.write(msg);
        response.end();
      }
      else if(exists === false) {
       console.log("File created!"),
       fs.writeFile(fileName, input, function(err) {
        if(err) return console.log(err)
        msg = JSON.stringify({msg: "File created!"}),
        response.writeHead(200, {'Content-Type': 'application/json'}),
        response.write(msg),
        response.end();
       })
      }
    });
  });
}

exports.POST = POST;
