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


class GamesDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameData: {},
      loaded: false,
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch( config.API.fixtures )
      .then((response) => response.json())
      .then((responseData) => {

        var gameData = {
          teamA: ' Нефтохимик',
          teamB: 'Левски',
          date: '25.07.2015 - 18:30',
        }

        this.setState({
          gameData: gameData,
          loaded: true,
        });
      })
      .done();
  }


  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return this.renderGame();
  }

  renderLoadingView() {
    return (<Loading />)
  }


  renderGame() {
    var game = this.state.gameData;

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
