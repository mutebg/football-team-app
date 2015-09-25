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
  TouchableOpacity,
  Component
} = React;

var config = require('./source/config');
var SideMenu = require('react-native-side-menu');
var Menu = require('./source/components/menu');

//page
var Home = require('./source/components/home');
var News = require('./source/components/news');
var Sponsors = require('./source/components/sponsors');
var Fixtures = require('./source/components/fixtures');
var Table = require('./source/components/table');

var MenuButton = React.createClass({
  handlePress: function(e) {
    this.context.menuActions.toggle();
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  },

  render: function() {
    return (
      <TouchableOpacity onPress={this.handlePress.bind(this)} >
        <Text style={this.props.style}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
});

MenuButton.contextTypes = {
  menuActions: React.PropTypes.object.isRequired
};


var App = React.createClass({
  getInitialState: function() {
    return {
      touchToClose: true,
      pageKey: 'table',
      pageTitle: 'Класиране',
    }
  },

  changePage: function(pageKey){
    var selectedItem = '';
    config.navigation.forEach( function(item){
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

  },

  render: function() {
    var page = '';
    switch( this.state.pageKey ) {
      case 'home': page = <Home />; break;
      case 'news': page = <News />; break;
      case 'table': page = <Table />; break;
      case 'fixtures': page = <Fixtures />; break;
      case 'sponsors': page = <Sponsors />; break;
    }

    return (
      <SideMenu menu={<Menu changePage={this.changePage} />}
        touchToClose={this.state.touchToClose}>
        <View style={styles.main}>
          <View style={styles.header}>
            <MenuButton style={styles.button}></MenuButton>
            <Text style={styles.headerTitle}>{this.state.pageTitle}</Text>
          </View>
          <View style={styles.content}>
            { page }
          </View>
        </View>

      </SideMenu>
    );
  }
});


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
    shadowColor: '#000',
    shadowOffset: {width:10, height:4},
    shadowOpacity: 100,
    alignItems: 'center',
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
  },
  content: {
    flex: 1
  },
  button: {
    backgroundColor: 'white',
    margin: 10,
    height: 40,
    width: 40,
  }
});

AppRegistry.registerComponent('reactnativeproject', () => App);
