var React = require('react-native');
var {
  Image,
  StyleSheet,
  Text,
  View,
} = React;

var FenClub = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          FenClub
        </Text>
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
    fontSize: 30
  }
});

module.exports = FenClub;
