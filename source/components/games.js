var React = require('react-native');
var {
  ListView,
  Component,
} = React;

var helpers = require('../helpers');
var Loading = require('./loading');
var GameRow = require('./gamerow');

var Actions = require('../actions');
var GamesStore = require('../stores/gamesstore');


class Games extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      listOffset: 0,
      loading: true,
    }
    Actions.gamesFetch();
  }

  componentDidMount() {
    GamesStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    GamesStore.unlisten(this.onChange.bind(this));
  }

  onChange(state) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(state.list),
      loading: state.loading,
      listOffset: ( state.lastGameIndex * 86 ), // height of game row
    });
  }

  render() {
    if (this.state.loading) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        contentOffset={{ x: 0, y: this.state.listOffset }}
        scrollRenderAheadDistance={100}
        dataSource={this.state.dataSource}
        renderRow={this.renderGames.bind(this)}
        initialListSize={50}
      />
    );
  }

  renderLoadingView() {
    return (<Loading />)
  }

  renderGames(row) {
    var navigator = this.props.navigator;
    row.onPress = () => {
      navigator.push({
         title: 'Програма',
         slug: row.round,
         name: 'game-details',
       });
    };

    var row = helpers.formatGame(row);

    return (
      <GameRow game={row} />
    );
  }
}

module.exports = Games;
