var React = require('react-native');
var {
  Image,
  StyleSheet,
  Text,
  View,
  ListView,
  Component,
} = React;

var config = require('../config');
var Loading = require('./loading');

var Actions = require('../actions');
var UtilsStore = require('../stores/utilsstore');


class Sponsors extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    }
    Actions.sponsorsFetch();
  }

  componentDidMount() {
    UtilsStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    UtilsStore.unlisten(this.onChange.bind(this));
  }

  onChange(state) {
    console.log('-------------', state);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(state.sponsors),
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
        renderRow={this.renderSponsors}
      />
    );
  }

  renderLoadingView() {
    return (
      <Loading />
    );
  }

  renderSponsors(row) {
    return (
      <View style={styles.row}>
        <Text style={styles.name}>{row.name}</Text>
        <Image
          source={{uri: row.banner}}
          style={styles.banner}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  row: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: config.color.border,
    borderBottomWidth: 1,
  },
  banner: {
    width: 150,
    height: 40,
    marginTop: 5,
  }
});

module.exports = Sponsors;
