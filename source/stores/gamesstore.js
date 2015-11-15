var alt = require('../alt');
var Actions = require('../actions');
var GamesSource = require('../sources/gamessource');

class GamesStore {
  constructor(){
    this.state = {
      list: [],
      item: {},
      itemId: null,
      lastGameIndex: 0,
      loading: false,
      error: false,
    };

    this.registerAsync(GamesSource);
    this.bindListeners({
      fetchList: Actions.gamesFetch,
      setList:   Actions.gamesFetchSuccess,
      setError:   Actions.gamesFetchFailed,

      fetchItem: Actions.gamesItemFetch,
      setItem: Actions.gamesItemFetchSuccess,
    });
  }

  fetchList() {
    this.setState({
      loading: true,
    })
    this.getInstance().getList();
  }

  setList(list){
    var lastGameIndex = 0;
    if ( list.length > 0 ) {
      list.forEach( (item, index) => {
        if ( item.result.length < 2 && lastGameIndex == 0 ) {
          lastGameIndex = index;
        }
      });
    }
    this.setState({
      list,
      lastGameIndex,
      loading: false
    });
  }

  fetchItem(id) {
    this.setState({
      loading: true,
      itemId: id,
    })
    this.getInstance().getItem();
  }

  setItem(item){
    this.setState({
      item,
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

module.exports = alt.createStore(GamesStore);
