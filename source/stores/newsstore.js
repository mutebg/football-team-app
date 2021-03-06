var alt = require('../alt');
var Actions = require('../actions');
var NewsSource = require('../sources/newssource');

class NewsStore {

  constructor(){
    this.state = {
      list: [],
      item: {},
      itemId: null,
      loading: false,
      error: false,
    };

    this.registerAsync(NewsSource);
    this.bindListeners({
      fetchList: Actions.newsFetch,
      setList: Actions.newsFetchSuccess,
      setError: Actions.newsFetchFailed,

      fetchItem: Actions.newsItemFetch,
      setItem: Actions.newsItemFetchSuccess,
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

module.exports = alt.createStore(NewsStore);
