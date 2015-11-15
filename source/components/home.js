var React = require('react-native');
var {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Component,
} = React;

var config = require('../config')
var helpers = require('../helpers');
var Loading = require('./loading');
var GameRow = require('./gamerow');
var NewsRow = require('./newsrow');

var Actions = require('../actions');
var HomeStore = require('../stores/homestore');



class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading: true,
    }
    Actions.homeFetch();
  }

  componentDidMount() {
    HomeStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange.bind(this));
  }

  onChange(state) {
    console.log('----------------', state);
    this.setState({
      data: state.data,
      loading: state.loading,
    });
  }

  render() {

    if (this.state.loading) {
      return this.renderLoadingView();
    }

    //next game
    var nextGame = helpers.formatGame(this.state.data.next_game);
    nextGame.onPress = () => {
      navigator.push({
         title: 'Програма',
         slug: nextGame._id,
         name: 'game-details',
       });
    };

    //news
    var news = this.state.data.news;
    var navigator = this.props.navigator;
    news.onPress = () => {
      navigator.push({
         title: 'Новини',
         slug: news._id,
         name: 'news-details',
       });
    };



    return (
      <ScrollView style={styles.container}>
        <GameRow game={nextGame} />
        <Text style={styles.title}>Новини</Text>
        <NewsRow news={this.state.data.news} />
        <Text style={styles.title}>Видео</Text>
        <GameRow game={nextGame} />
      </ScrollView>
    );
  }

  renderLoadingView() {
    return (
      <Loading />
    );
  }
};

var styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  title: {
    fontSize: 16,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: config.color.primary,
    color: '#fff',
  }
});

module.exports = Home;
