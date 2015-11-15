var React = require('react-native');
var {
  ListView,
  Component,
} = React;

var config = require('../config');
var Loading = require('./loading');
var NewsRow = require('./newsrow');

var Actions = require('../actions');
var NewsStore = require('../stores/newsstore');

class News extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loading: true,
    }
    Actions.newsFetch();
  }

  componentDidMount() {
    NewsStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    NewsStore.unlisten(this.onChange.bind(this));
  }

  onChange(state) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(state.list),
      loading: state.loading,
    });
  }

  render() {
    if (this.state.loading) {
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
