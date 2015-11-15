var alt = require('../alt');

class Actions {
  constructor(){
    this.generateActions(
      //home Data
      'homeFetch',
      'homeFetchSuccess',
      'homeFetchFailed',

      //list of news
      'newsFetch',
      'newsFetchSuccess',
      'newsFetchFailed',

      //single news
      'newsItemFetch',
      'newsItemFetchSuccess',

      //list of games
      'gamesFetch',
      'gamesFetchSuccess',
      'gamesFetchFailed',

      //single game
      'gamesItemFetch',
      'gamesItemFetchSuccess',

      //table
      'tableFetch',
      'tableFetchSuccess',
      'tableFetchFailed',

      //fetch sponsors
      'sponsorsFetch',
      'sponsorsFetchSuccess',
      'sponsorsFetchFailed',

      //fetch videos
      'videosFetch',
      'videosFetchSuccess',
      'videosFetchFailed',
    );
  }
}

module.exports = alt.createActions(Actions);
