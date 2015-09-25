//https://github.com/Kureev/react-native-side-menu#managing-menu-state

const React = require('react-native');
const Dimensions = require('Dimensions');
const config = require('../config');

const {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
} = React;

const window = Dimensions.get('window');
const uri = 'http://pickaface.net/includes/themes/clean/img/slide2.png';

var Menu = React.createClass({
  getInitialState: function() {
    return {
      menuKey: 'table',
      menuItems: config.navigation,
    }
  },

  handlePress: function(e) {
    this.context.menuActions.close();
    this.setState({menuKey: e.key});
    this.props.changePage(e.key);
  },

  render: function() {
    var nav = this.state.menuItems.map( function(item) {
      var boundClick = this.handlePress.bind(this, item);
      return(
        <View style={styles.item}>
          <TouchableOpacity onPress={boundClick} key={item.key}>
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
        </View>
      )
    }, this);

    return (
      <ScrollView style={styles.menu}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={{ uri, }}/>
        </View>

        { nav }

      </ScrollView>
    );
  }
});

Menu.contextTypes = {
  menuActions: React.PropTypes.object.isRequired
};

var styles = StyleSheet.create({
  menu: {
    flex: 1,
    backgroundColor: '#ccc',
  },
  logoContainer: {
    margin: 20,
  },
  logo: {
    width: 48,
    height: 48,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 25,
    paddingRight: 25,
    borderTopColor: '#fff',
    borderTopWidth: 1,

  },
  itemText: {
    fontSize: 18,
    fontWeight: '300',
  }
});

module.exports = Menu;
