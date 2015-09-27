var React = require('react-native');
var {
  ListView,
  Component,
} = React;

var config = require('../config');
var Loading = require('./loading');
var NewsRow = require('./newsrow');

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch( config.API.news )
      .then((response) => response.json())
      .then((responseData) => {

        var formatedData = [];
        responseData.feed.entry.forEach( item => {
          var row = {
            title: item['gsx$title']['$t'],
            image: item['gsx$image']['$t'],
            date: item['gsx$date']['$t'],
            link: item['gsx$link']['$t'],
          }
          formatedData.push(row);
        });

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows( formatedData ),
          loaded: true,
        });
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderNews}
      />
    );
  }

  renderLoadingView() {
    return (
      <Loading />
    );
  }

  renderNews(row) {
    return (
      <NewsRow news={row} />
    );
  }
}

module.exports = News;
