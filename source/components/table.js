var React = require('react-native');
var {
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  Component,
} = React;

var config = require('../config');
var Loading = require('./loading');

var Actions = require('../actions');
var TableStore = require('../stores/tablestore');


class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loading: true,
    }
    Actions.tableFetch();
  }

  componentDidMount() {
    TableStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    TableStore.unlisten(this.onChange.bind(this));
  }

  onChange(state) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(state.list),
      loading: state.loading,
    });
  }

  render() {
    if (this.state.loading) {
      return this.renderLoadingView();
    }


    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderTable}
      />
    );
  }

  renderLoadingView() {
    return (
      <Loading />
    );
  }

  renderTable(row, arg, index) {
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
  }
}

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
