var AppDispatcher = require('../appdispatcher');
var constants = require('../constants/actionconstants');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var config = require('../config');
var API = require('../api');
var CHANGE_EVENT = 'change';

var _news = [];

var findIndexById = (id) => {
  var index = false;
  if ( _news ) {
    _news.forEach( (news, i) =>{
      if ( news.id === id ) {
        index = i;
      }
    });
  }
  return index;
}

var NewsStore = _.assign({}, EventEmitter.prototype, {

  getList: function() {
    return _news;
  },

  getItem: function(id) {
    var index = findIndexById(id);
    if ( index !== false ) {
      return _news[index];
    }
    return {};
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
    case constants.NEWS_LIST_GET:
      API.get( config.API.news ).then((responseData) => {
        var formatedData = [];
        responseData.feed.entry.forEach( (item,i) => {
          var row = {
            id: i,
            title: item['gsx$title']['$t'],
            image: item['gsx$image']['$t'],
            date: item['gsx$date']['$t'],
            link: item['gsx$link']['$t'],
          }
          formatedData.push(row);
        });

        _news = formatedData;
        NewsStore.emitChange();
      })
      .done();
    break;

    case constants.NEWS_ITEM_GET:
      var index = findIndexById(action.id);
      if ( index !== false ) {
        _news[index].text = `В напрегнатия двубой, „Звездичка“ поведе с 2:0, но най-малките „шейхове“ обърнаха резултата. В самия край на мача резултатът беше равен – 3:3, но в последния момент „Нефтохимик“ вкара победния гол и доказа, че е най-добрият отбор в Бургас.
         Георги Апостолов допринесе за победата с два гола, а Денис Тохмак и Теди Стефанов се разписаха по веднъж.
         В следващия мач „зелените“ от втория отбор за деца, родени през 2007 г, посрещнаха тима на „Поморие“. Срещата завърши с равен резултат 1:1, като голмайстор за „Нефтохимик“ стана Георги Тодоров!
         Браво, деца! Продължавайте да ни радвате с победи!`;
         NewsStore.emitChange();
      }
    break;

    default:
      // no op
  }
});

module.exports = NewsStore;
