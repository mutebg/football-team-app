
var AppDispatcher = require('../appdispatcher');
var constants = require('../constants/actionconstants');

class TableActions {

  load() {
    AppDispatcher.dispatch({
      actionType: constants.TABLE_GET
    });
  }

}

module.exports = new TableActions();
