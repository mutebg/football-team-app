var Actions = require('../actions');
var config = require('../config');
var helpers = require('../helpers');

var NewsSource = {
  getList: {
    remote(){
      return new Promise((resolve, reject) => {
        fetch( config.API.news )
          .then((response) => response.json())
          .then((responseData) => {

            var formatedData = [];
            responseData.data.forEach( (item, i) => {
              var row = {
                id: item['_id'],
                title: item['title'],
                image: item['image'],
                datetime: helpers.formatNewsDate( item['datetime'] ),
              }
              formatedData.push(row);
            });

            resolve( formatedData );

          }, error => {
            reject(error);
          })
          .done();
      });
    },
    success: Actions.newsFetchSuccess,
    error: Actions.newsFetchFailed,
  },


  getItem: {
    remote(state){
      return new Promise((resolve, reject) => {
        console.log('URL---', config.API.news + '/' + state.itemId  );
        fetch( config.API.news + '/' + state.itemId )
          .then((response) => response.json())
          .then((responseData) => {
            responseData.data.datetime = helpers.formatNewsDate( responseData.data.datetime ),
            resolve(responseData.data);
          }, error => {
            reject(error);
          })
          .done();
      });
    },
    success: Actions.newsItemFetchSuccess,
    error: Actions.newsFetchFailed,
  },
}

module.exports = NewsSource;
