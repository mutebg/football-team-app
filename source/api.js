var config = require('./config');

class API {

  get(url) {
    return fetch( url )
      .then((response) => response.json())
  }

  post(url, data) {

  }
}

module.exports = new API();
