"use strict";

class AbstractStore {
  constructor() {
    if (new.target === AbstractStore) {
      throw new TypeError("Cannot construct AbstractStore instances directly");
    }
    if (typeof this.put !== "function" || typeof this.get !== "function") {
      throw new TypeError("Must override methods: put and get");
    }
  }
}

module.exports = AbstractStore;