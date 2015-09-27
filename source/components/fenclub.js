var React = require('react-native');
var {
  Image,
  StyleSheet,
  Text,
  View,
  Component,
} = React;

class FenClub extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          FenClub
        </Text>
      </View>
    );
  }
};

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
