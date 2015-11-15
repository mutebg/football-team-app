var Actions = require('../actions');
var config = require('../config');
var helpers = require('../helpers');

var HomeSource = {
  getData: {
    remote(){
      return new Promise((resolve, reject) => {
        fetch( config.API.home )
          .then((response) => response.json())
          .then((responseData) => {
            var data = responseData.data;
            data.news.datetime = helpers.formatNewsDate( data.news.datetime );

            resolve( data );

          }, error => {
            reject(error);

          })
          .done();
      });
    },
    success: Actions.homeFetchSuccess,
    error: Actions.homeFetchFailed,
  }
}

module.exports = HomeSource;
