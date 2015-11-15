var Actions = require('../actions');
var config = require('../config');

var GamesSource = {

  getList: {
    remote(){
      return new Promise((resolve, reject) => {
        fetch( config.API.fixtures )
          .then((response) => response.json())
          .then((responseData) => {

            var formatedData = [];
            responseData.data.forEach( (item, i) => {
              var row = {
                round: item['_id'],
                team: item['team'],
                datetime: item['datetime'],
                result: item['result'],
                home: item['home'],
                logo: item['logo'],
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
    success: Actions.gamesFetchSuccess,
    error: Actions.gamesFetchFailed,
  },


  getItem: {
    remote(state){
      return new Promise((resolve, reject) => {
        console.log('----- game ID ', state.itemId);
        fetch( config.API.fixtures )
          .then((response) => response.json())
          .then((responseData) => {
            resolve(state);
          }, error => {
            reject(error);
          })
          .done();
      });
    },
    success: Actions.gamesItemFetchSuccess,
    error: Actions.gamesFetchFailed,
  },
};

module.exports = GamesSource;
