var AppDispatcher = require('../appdispatcher');
var constants = require('../constants/actionconstants');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var config = require('../config');
var API = require('../api');
var CHANGE_EVENT = 'change';

var _table = [];

var TableStore = _.assign({}, EventEmitter.prototype, {

  get: function() {
    return _table;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case constants.TABLE_GET:
      API.get( config.API.standing ).then((responseData) => {
        var formatedData = [config.standing_header];
        responseData.feed.entry.forEach( item => {
          var row = {
            position: item['gsx$position']['$t'],
            team: item['gsx$team']['$t'],
            games: item['gsx$games']['$t'],
            ga: item['gsx$ga']['$t'],
            points: item['gsx$points']['$t'],
          }
          formatedData.push(row);
        });

        _table = formatedData;
        TableStore.emitChange();
      })
      .done();
    break;

    default:
      // no op
  }
});

module.exports = TableStore;
