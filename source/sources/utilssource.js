var Actions = require('../actions');
var config = require('../config');

var UtilsSource = {
  getSponsors: {
    remote(){
      return new Promise((resolve, reject) => {
        fetch( config.API.sponsors )
          .then((response) => response.json())
          .then((responseData) => {
            console.log('response data', responseData);
            resolve( responseData.data );
          }, error => {
            reject(error);
          })
          .done();
      });
    },
    success: Actions.sponsorsFetchSuccess,
    error: Actions.sponsorsFetchFailed,
  },


  getVideos: {
    remote(){
      return new Promise((resolve, reject) => {
        fetch( config.API.videos )
          .then((response) => response.json())
          .then((responseData) => {
            resolve( responseData.data );
          }, error => {
            reject(error);
          })
          .done();
      });
    },
    success: Actions.videosFetchSuccess,
    error: Actions.videosFetchFailed,
  },

}

module.exports = UtilsSource;
