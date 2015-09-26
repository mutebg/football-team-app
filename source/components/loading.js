var React = require('react-native');
var {
  Image,
  StyleSheet,
  Text,
  View,
} = React;

var config = require('../config');

var Loading = React.createClass({

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Зареждане
        </Text>
        <Image style={styles.logo}
          source={{uri: config.app.logo }}/>
      </View>
    );
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: config.color.primary,
  },
  logo: {
    marginTop: 10,
    width: 150,
    height: 150,
  }
});

module.exports = Loading;
