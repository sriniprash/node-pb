"use strict";

let express = require('express');
let morgan = require('morgan');
let store = require('./lib/fileStore');
let app = express();
const appConfig = require('./config');
let storeObject = new store(appConfig);

// Middleware for logging requests
app.use(morgan('combined'));

// Middleware to store reqest body to req.text
app.use(function(req, res, next){
  if (req.is('text/*')) {
    req.text = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk){ req.text += chunk });
    req.on('end', next);
  } else {
    next();
  }
});

app.get('/:id', function (req, res) {
  let pasteID = req.params.id;
  let promise = storeObject.get(pasteID);

  promise.then(
    function(result) {
      res.append("Content-Type", "text/plain");
      res.send(result); 
    }, 
    function(error) {
      res.status(500).send(error);
    }
  );
});

app.post('/', function (req, res) {
  let paste = req.text;
  let promise = storeObject.put(paste);

  promise.then(
    function(result) {
      res.send(result);
    },
    function(error) {
      res.status(500).send(error);
    }
  );
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});