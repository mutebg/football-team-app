var React = require('react-native');
var {
  ListView,
  Component,
} = React;

var config = require('../config');
var Loading = require('./loading');
var NewsRow = require('./newsrow');
var NewsStore = require('../stores/newsstore');
var NewsActions = require('../actions/newsactions');


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
    NewsStore.addChangeListener(this._onChange.bind(this));
    NewsActions.loadList();
  }

  componentWillUnmount() {
    NewsStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    var news = NewsStore.getList();
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows( news ),
      loaded: true,
    });
  }

  // fetchData() {
  //   fetch( config.API.news )
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //
  //       var formatedData = [];
  //       responseData.feed.entry.forEach( item => {
  //         var row = {
  //           title: item['gsx$title']['$t'],
  //           image: item['gsx$image']['$t'],
  //           date: item['gsx$date']['$t'],
  //           link: item['gsx$link']['$t'],
  //           onPress: () => {
  //             this.props.navigator.push({
  //                 title: 'Новини',
  //                 slug: '1',
  //                 name: 'news-details',
  //             });
  //           }
  //         }
  //         formatedData.push(row);
  //       });
  //
  //       this.setState({
  //         dataSource: this.state.dataSource.cloneWithRows( formatedData ),
  //         loaded: true,
  //       });
  //     })
  //     .done();
  // }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderNews.bind(this)}
      />
    );
  }

  renderLoadingView() {
    return (
      <Loading />
    );
  }

  renderNews(row) {
    var navigator = this.props.navigator;
    row.onPress = () => {
      navigator.push({
         title: 'Новини',
         slug: row.id,
         name: 'news-details',
       });
    };

    return (
      <NewsRow news={row} />
    );
  }
}

module.exports = News;
