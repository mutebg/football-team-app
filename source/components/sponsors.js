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

class Sponsors extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch( config.API.sponsors )
      .then((response) => response.json())
      .then((responseData) => {

        var formatedData = [];
        responseData.feed.entry.forEach( item => {
          var row = {
            name: item['gsx$name']['$t'],
            banner: item['gsx$banner']['$t'],
            link: item['gsx$link']['$t'],
          }
          formatedData.push(row);
        });

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows( formatedData ),
          loaded: true,
        });
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
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
