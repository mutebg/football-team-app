/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Component,
} = React;

var config = require('./source/config');
var SideMenu = require('react-native-side-menu');
var Menu = require('./source/components/menu');
var MenuButton = require('./source/components/menubutton');
var { Icon } = require('react-native-icons');


//page
var Home = require('./source/components/home');
var News = require('./source/components/news');
var Sponsors = require('./source/components/sponsors');
var Games = require('./source/components/games');
var Table = require('./source/components/table');
var FenClub = require('./source/components/fenclub');
var Settings = require('./source/components/settings');

var NewsDetails = require('./source/components/newsdetails');
var GameDetails = require('./source/components/gamedetails');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      touchToClose: true,
      pageKey: config.navigation[0].key,
      pageTitle: config.navigation[0].title,
    }
  }

  changePage(pageKey) {
    var selectedItem = '';
    config.navigation.forEach( item => {
      if ( item.key == pageKey ) {
        selectedItem = item;
      }
    });

    if ( selectedItem ) {
      this.setState({
        pageKey: selectedItem.key,
        pageTitle: selectedItem.title,
        pageComponent: selectedItem.component,
      });
    }
  }

  render() {
    var page = '';
    switch( this.state.pageKey ) {
      case 'home': page = <Home />; break;
      case 'news': page = <News />; break;
      case 'table': page = <Table />; break;
      case 'games': page = <Games />; break;
      case 'sponsors': page = <Sponsors />; break;
      case 'fenclub': page = <FenClub />; break;
      case 'settings': page = <Settings />; break;
    }

    return (
      <SideMenu menu={<Menu changePage={this.changePage.bind(this)} />}
        touchToClose={this.state.touchToClose}>
        <View style={styles.main}>
          <View style={styles.header}>
            <MenuButton style={styles.menuButton}></MenuButton>
            <Text style={styles.headerTitle}>{this.state.pageTitle}</Text>
          </View>
          <View style={styles.content}>
            { page }
          </View>
        </View>
      </SideMenu>
    );
  }
}


var styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  header: {
    flex: 0,
    height: 80,
    backgroundColor: config.color.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
  },
  content: {
    flex: 1,
  },
});

AppRegistry.registerComponent('reactnativeproject', () => App);
