var React = require('react-native');
var {
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  Component
} = React;

var config = require('../config');
var Loading = require('../components/loading');

var Fixtures = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch( config.API.fixtures )
      .then((response) => response.json())
      .then((responseData) => {

        var formatedData = [];
        responseData.feed.entry.forEach( function(item){
          var row = {
            round: item['gsx$round']['$t'],
            team: item['gsx$team']['$t'],
            date: item['gsx$date']['$t'].split('-')[0],
            hour: item['gsx$date']['$t'].split('-')[1],
            result: item['gsx$result']['$t'],
            home: item['gsx$home']['$t'],
          }
          formatedData.push(row);
        });


        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(formatedData),
          loaded: true,
        });
      })
      .done();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderFixtures}
      />
    );
  },

  renderLoadingView: function() {
    return (
      <Loading />
    );
  },

  renderFixtures: function(row) {

    if ( row.home ) {
      teamA = config.team_name;
      teamB = row.team
      logoA = config.team_logo;
      logoB = row.logo
    } else {
      teamA = row.team
      teamB = config.team_name;
      logoA = row.logo;
      logoB = config.team_logo;
    }

    var resultA = resultB = '';
    if ( row.result.length > 2 ) {
      resultA = parseInt( row.result.split(':')[0] );
      resultB = parseInt( row.result.split(':')[1] );
    }


    return (
      <View style={styles.fixtureRow}>
        <View style={styles.leftSide}>
          <View style={styles.team}>
            <Image
              source={{uri: logoA}}
              style={styles.teamLogo}
            />
            <View style={styles.teamName}>
              <Text>{teamA}</Text>
            </View>
            <View style={styles.teamRes}>
              <Text>{ resultA }</Text>
            </View>
          </View>
          <View style={styles.team}>
            <Image
              source={{uri: logoB}}
              style={styles.teamLogo}
            />
            <View style={styles.teamName}>
              <Text>{teamB}</Text>
            </View>
            <View style={styles.teamRes}>
              <Text>{ resultB }</Text>
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
    );
  },
});

var teamRowHeight = 30;

var styles = StyleSheet.create({
  fixtureRow: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
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
    borderLeftColor: '#ccc',
    paddingLeft: 20,
    textAlign: 'center',
    flex: 0,
    width: 100,
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

module.exports = Fixtures;
