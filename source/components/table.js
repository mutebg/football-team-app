var React = require('react-native');
var {
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var config = require('../config');
var Loading = require('../components/loading');

var Table = React.createClass({
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
    fetch( config.API.standing )
      .then((response) => response.json())
      .then((responseData) => {

        var formatedData = [config.standing_header];
        responseData.feed.entry.forEach( function(item){
          var row = {
            position: item['gsx$position']['$t'],
            team: item['gsx$team']['$t'],
            games: item['gsx$games']['$t'],
            ga: item['gsx$ga']['$t'],
            points: item['gsx$points']['$t'],
          }
          formatedData.push(row);
        });


        this.setState({
          dataSource: this.state.dataSource.cloneWithRows( formatedData ),
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
        renderRow={this.renderTable}
      />
    );
  },

  renderLoadingView: function() {
    return (
      <Loading />
    );
  },

  renderTable: function(row, arg, index) {
    var addedStyle = {};
    if ( index == 0) {
      addedStyle = styles.tableHeader;
    }

    if ( row.team.indexOf( config.team_name ) >= 0 ) {
      addedStyle = styles.tableActive;
    }

    return (
      <View style={[styles.row, addedStyle ]}>
        <Text style={[styles.name, addedStyle]}>{row.position} {row.team}</Text>
        <Text style={[styles.cell, addedStyle]}>{row.games}</Text>
        <Text style={[styles.cell, styles.cell_ga ,addedStyle]}>{row.ga}</Text>
        <Text style={[styles.cell, addedStyle]}>{row.points}</Text>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  row: {
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
  name: {
    flex: 1,
  },
  cell: {
    flex: 0,
    width: 30,
  },
  cell_ga: {
    width: 90,
  },
  tableHeader: {
    borderBottomColor: '#444',
    borderBottomWidth: 2,
    fontWeight: 'bold',
  },
  tableActive: {
    fontWeight: 'bold',
    color: config.color.primary,
  }
});

module.exports = Table;
