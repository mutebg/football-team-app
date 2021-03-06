var alt = require('../alt');
var Actions = require('../actions');
var TableSource = require('../sources/tablesource');

class TableStore {

  constructor(){
    this.state = {
      list: [],
      loading: false,
      error: false,
    };

    this.registerAsync(TableSource);
    this.bindListeners({
      fetchList: Actions.tableFetch,
      setList: Actions.tableFetchSuccess,
      setError: Actions.tableFetchFailed,
    });
  }

  fetchList() {
    this.setState({
      loading: true,
    })
    this.getInstance().getList();
  }

  setList(list){
    this.setState({
      list,
      loading: false
    });
  }

  setError() {
    this.setState({
      error: true,
      loading: false,
    });
  }
}

module.exports = alt.createStore(TableStore);
