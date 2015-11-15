var React = require('react-native');
var {
  ListView,
  Component,
} = React;

var config = require('../config');
var Loading = require('./loading');
var VideoRow = require('./videorow');

var Actions = require('../actions');
var UtilsStore = require('../stores/utilsstore');

class Videos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loading: true,
    }
    Actions.videosFetch();
  }

  componentDidMount() {
    UtilsStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    UtilsStore.unlisten(this.onChange.bind(this));
  }

  onChange(state) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(state.videos),
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
        renderRow={this.renderVideo.bind(this)}
      />
    );
  }

  renderLoadingView() {
    return (
      <Loading />
    );
  }

  renderVideo(row) {
    return (
      <VideoRow video={row} />
    );
  }
}

module.exports = Videos;
