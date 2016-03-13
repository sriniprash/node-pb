"use strict";

let AbstractStore = require('./store');
let fs = require('fs');
let crypto = require('crypto');

class FileStore extends AbstractStore {
  constructor(config) {
    super();
    this.config = config;
  }
  get(pasteID) {
    let that = this;
    return new Promise(function(resolve, reject) {
      fs.readFile(that.config["storeDirectory"] + pasteID, 'utf8', function(err, data) {
        if(err) {
          reject("Paste with ID: " + pasteID + " not found!");
        }
        else {
          resolve(data);
        }
      });
    });
  };

  put(data) {
    let that = this;
    return new Promise(function(resolve, reject) {
      let md5sum = crypto.createHash('md5').update(data).digest("hex");
      
      if (!fs.existsSync(that.config["storeDirectory"])){
        console.log("Making directory: " + that.config["storeDirectory"]);
        fs.mkdirSync(that.config["storeDirectory"]);
      }

      fs.writeFile(that.config["storeDirectory"] + md5sum, data, function(err){
        if(err) {
          reject(err);
        }
        else {
          resolve("Paste Created with ID: " + md5sum);
        }
      });
    });
  };
}

module.exports = FileStore;