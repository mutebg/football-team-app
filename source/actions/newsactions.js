var AppDispatcher = require('../appdispatcher');
var constants = require('../constants/actionconstants');

class NewsActions  {

  loadList() {
    AppDispatcher.dispatch({
      actionType: constants.NEWS_LIST_GET,
    });
  }

  loadItem(id) {
    AppDispatcher.dispatch({
      actionType: constants.NEWS_ITEM_GET,
      id: id,
    })
  }

}

module.exports = new NewsActions();
