var Actions = require('../actions');
var config = require('../config');

var TableSource = {
  getList: {
    remote(){
      return new Promise((resolve, reject) => {
        fetch( config.API.standing )
          .then((response) => response.json())
          .then((responseData) => {

            var formatedData = [config.standing_header];
            responseData.data.forEach( item => {
              var row = {
                position: item['position'],
                team: item['team'],
                games: item['games'],
                ga: item['ga'],
                points: item['points'],
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
    success: Actions.tableFetchSuccess,
    error: Actions.tableFetchFailed,
  }
}

module.exports = TableSource;
