var React = require('react-native');
var {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Component,
} = React;

var config = require('../config');
var Loading = require('../components/loading');

var Actions = require('../actions');
var GamesStore = require('../stores/gamesstore');

class GamesDetails extends Component {
  constructor(props) {
    super(props);

    var currentNavigation = this.props.navigator.getCurrentRoutes();
    var slug = currentNavigation[ currentNavigation.length - 1 ].slug;

    this.state = {
      slug: slug,
      data: {},
      loading: true,
    }

    Actions.gamesItemFetch(slug);

  }

  componentDidMount() {
    GamesStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    GamesStore.unlisten(this.onChange.bind(this));
  }

  onChange(state) {
    this.setState({
      data: state.item,
      loading: state.loading,
    });
  }


  render() {
    if (this.state.loading) {
      return this.renderLoadingView();
    }

    return this.renderGame();
  }

  renderLoadingView() {
    return (<Loading />)
  }


  renderGame() {
    var game = this.state.data;

    return (
      <View style={styles.fixtureRow}>
          <Text>{game.teamA}</Text>
          <Text>{game.teamB}</Text>
          <Text>{game.date}</Text>
      </View>
    );
  }
}


var styles = StyleSheet.create({

});

module.exports = GamesDetails;
