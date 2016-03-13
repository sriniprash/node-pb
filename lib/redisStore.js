"use strict";

let AbstractStore = require('./store');
let redis = require('redis');

class RedisStore extends AbstractStore {
  constructor(config) {
    super();
    this.config = config;
    this.redisPrefix = this.config["redisPrefix"] || "paste_";
    this.redisClient = redis.createClient(config);
  }

  get(pasteID) {
    let that = this;
    return new Promise(function(resolve, reject) {
      that.redisClient.get(that.redisPrefix + pasteID, function(err, response) {
        if(err) {
          reject(err);
        }
        else {
          resolve(response);
        }
      });
    });
  };

  put(data) {
    let that = this;
    let md5sum = that.md5hash(data);

    return new Promise(function(resolve, reject) {
      that.redisClient.set(that.redisPrefix + md5sum, data, function(err, response) {
        if(err) {
          reject(err);
        }
        else {
          resolve(md5sum);
        }
      });
    });
    
  };
}

module.exports = RedisStore;