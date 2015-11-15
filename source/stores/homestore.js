var alt = require('../alt');
var Actions = require('../actions');
var HomeSource = require('../sources/homesource');

class HomeStore {

  constructor(){
    this.state = {
      data: [],
      loading: false,
      error: false,
    };

    this.registerAsync(HomeSource);
    this.bindListeners({
      fetchData: Actions.homeFetch,
      setData: Actions.homeFetchSuccess,
      setError: Actions.homeFetchFailed,
    });
  }

  fetchData() {
    this.setState({
      loading: true,
    })
    this.getInstance().getData();
  }

  setData(data){
    this.setState({
      data,
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

module.exports = alt.createStore(HomeStore);
