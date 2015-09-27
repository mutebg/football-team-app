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
var GameRow = require('./gamerow');
var NewsRow = require('./newsrow');

class Home extends Component {
  render() {
    var nextGame = {
      logoA: config.team_logo,
      logoB: 'http://img2.sportal.bg/uploads/statistics/team_logo_png/00000396.png',
      teamA: config.team_name,
      teamB: 'Дунав Руси  ',
      date: '20.10.2015',
      hour: '20:00',
    }

    var lastNews = {
      title: '„Нефтохимик“ победи „Звездичка“',
      date: '27.09.2015',
      image: 'http://neftochimic.com/wp-content/uploads/2015/09/IMG_2872-300x200.jpg',
    }


    return (
      <ScrollView style={styles.container}>
        <GameRow game={nextGame} />
        <Text style={styles.title}>Новини</Text>
        <NewsRow news={lastNews} />
        <Text style={styles.title}>Видео</Text>
        <GameRow game={nextGame} />
      </ScrollView>
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
