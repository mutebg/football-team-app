var React = require('react-native');
var {
  Image,
  StyleSheet,
  Text,
  View,
  Component,
  TouchableOpacity
} = React;

var config = require('../config');

class NewsRow extends Component {

  constructor(props) {
    super(props);
  }

  onPress() {
    console.log(this.props.news);
    this.props.openNews(this.props.news.id);
  }

  render() {
    var row = this.props.news;
    var image;
    if ( row.image ) {
      image = <Image source={{uri: row.image}} style={styles.image} />
    } else {
      image = <Image source={{uri: config.app.logo }} style={styles.image} />
    }


    return (
      <TouchableOpacity onPress={row.onPress}>
        <View style={styles.row}>
          {image}
          <Text style={styles.title}>{row.title}</Text>
          <Text style={styles.date}>{row.date}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'column',
    borderBottomColor: config.color.border,
    borderBottomWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
  },
  image: {
    height: 150,
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
  },
  date: {
    paddingTop: 5,
    fontSize: 10,
  }
});

module.exports = NewsRow;
