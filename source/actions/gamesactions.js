var AppDispatcher = require('../appdispatcher');
var constants = require('../constants/actionconstants');

class GamesActions  {

  loadList() {
    AppDispatcher.dispatch({
      actionType: constants.GAME_LIST_GET,
    });
  }

  loadItem(id) {
    AppDispatcher.dispatch({
      actionType: constants.GAME_ITEM_GET,
      id: id,
    })
  }

}

module.exports = new GamesActions();
