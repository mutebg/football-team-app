var React = require('react-native');
var {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Component,
} = React;

var config = require('../config');


class GameRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var row = this.props.game;

    return (
      <TouchableOpacity onPress={row.onPress}>
        <View style={styles.fixtureRow}>
          <View style={styles.leftSide}>
            <View style={styles.team}>
              <Image
                source={{uri: row.logoA}}
                style={styles.teamLogo}
              />
              <View style={styles.teamName}>
                <Text>{row.teamA}</Text>
              </View>
              <View style={styles.teamRes}>
                <Text>{ row.resultA }</Text>
              </View>
            </View>
            <View style={styles.team}>
              <Image
                source={{uri: row.logoB}}
                style={styles.teamLogo}
              />
              <View style={styles.teamName}>
                <Text>{row.teamB}</Text>
              </View>
              <View style={styles.teamRes}>
                <Text>{row.resultB}</Text>
              </View>
            </View>
          </View>
          <View style={styles.rightSide}>
            <View>
              <Text>{row.date}</Text>
            </View>
            <View>
              <Text>{row.hour}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

var teamRowHeight = 30;

var styles = StyleSheet.create({
  fixtureRow: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    borderBottomColor: config.color.border,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftSide: {
    flex: 1,
    flexDirection: 'column',
    paddingRight: 20,
  },
  rightSide: {
    flexDirection: 'column',
    borderLeftWidth: 1,
    borderLeftColor: config.color.border,
    paddingLeft: 20,
    textAlign: 'center',
    flex: 0,
    width: 96,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  team: {
    flexDirection: 'row',
    paddingTop: 3,
    paddingBottom: 3,
  },
  teamLogo: {
    flex: 0,
    width: teamRowHeight,
    height: teamRowHeight,
  },
  teamName: {
    flex: 10,
    paddingLeft: 10,
    justifyContent: 'center',
    height: teamRowHeight,
    textAlign: 'left',
  },
  teamRes: {
    flex: 0,
    height: teamRowHeight,
    justifyContent: 'center',
    textAlign: 'right',
  }
});

module.exports = GameRow;
