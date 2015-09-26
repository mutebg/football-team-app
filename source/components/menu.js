//https://github.com/Kureev/react-native-side-menu#managing-menu-state

const React = require('react-native');
const Dimensions = require('Dimensions');
const config = require('../config');
var { Icon } = require('react-native-icons');


const {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
} = React;



const window = Dimensions.get('window');

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
      var iconName = 'material|' + item.icon;
      return(
        <TouchableOpacity onPress={boundClick} key={item.key}>
          <View style={styles.item}>
            <Icon
              name={iconName}
              size={24}
              color='#656565'
              style={styles.itemIcon}
            />
            <View style={styles.itemView}>
              <Text style={styles.itemText}>{item.title}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    }, this);

    return (
      <ScrollView style={styles.menu}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo}
            source={{uri: config.app.logo }}/>
          <View style={styles.logoTitle}>
            <Text>Нефтохимик</Text>
            <Text>Бургас</Text>
          </View>
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
    backgroundColor: '#EAEAEA',
  },
  logoContainer: {
    padding: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  logo: {
    width: 60,
    height: 60,
    flex: 0,
  },
  logoTitle: {
    flex: 1,
    justifyContent: 'center',
    height: 40,
    textAlign: 'left',
    paddingLeft: 15,
  },
  item: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 25,
    borderTopColor: '#DBDBDB',
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  itemText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#6E6E6E',
  },
  itemView:{
    flex: 1,
    justifyContent: 'center',
    height: 24,
  },
  itemIcon: {
    width: 24,
    height: 24,
    flex: 0,
    marginRight: 10,
  }
});

module.exports = Menu;
