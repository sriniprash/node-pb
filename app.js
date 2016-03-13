var express = require('express');
var morgan = require('morgan');
var crypto = require('crypto');
var fs = require('fs');
var app = express();

var storeDirectory = "./store/";

app.use(morgan('combined'));

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
  var pasteID = req.params.id;
  fs.readFile(storeDirectory + pasteID, 'utf8', function(err, data) {
    if(err) {
      res.status(500).send("Paste with ID: " + pasteID + " not found!");
    }
    else {
      res.append("Content-Type", "text/plain");
      res.send(data); 
    }
  });
});

app.post('/', function (req, res) {
  var paste = req.text;
  var md5sum = crypto.createHash('md5').update(paste).digest("hex");
  
  if (!fs.existsSync(storeDirectory)){
    console.log("Making directory: " + storeDirectory);
    fs.mkdirSync(storeDirectory);
  }

  fs.writeFile(storeDirectory + md5sum, paste, function(err){
    if(err) {
      res.status(500).send(err);
    }
    else {
      res.send("Paste Created with ID: " + md5sum);
    }
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});