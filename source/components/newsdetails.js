var React = require('react-native');
var {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Component,
} = React;

var config = require('../config');
var Loading = require('../components/loading');
var NewsStore = require('../stores/newsstore');
var NewsActions = require('../actions/newsactions');


class NewsDetails extends Component {
  constructor(props) {
    super(props);

    var currentNavigation = this.props.navigator.getCurrentRoutes();
    console.log( )
    var slug = currentNavigation[ currentNavigation.length - 1 ].slug;

    this.state = {
      slug: slug,
      newsData: {},
      loaded: false,
    }
  }

  componentDidMount() {
    NewsStore.addChangeListener(this._onChange.bind(this));
    NewsActions.loadItem(this.state.slug);
  }

  componentWillUnmount() {
    NewsStore.removeChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    var newsData = NewsStore.getItem(this.state.slug);
    this.setState({
      newsData: newsData,
      loaded: true,
    });
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return this.renderDetails();
  }

  renderLoadingView() {
    return (
      <Loading />
    );
  }

  renderDetails() {
    var news = this.state.newsData;
    var image;
    if ( news.image ) {
      image = <Image source={{uri: news.image}} style={styles.image} />
    } else {
      image = <Image source={{uri: config.app.logo }} style={styles.image} />
    }

    return (
      <ScrollView style={styles.row}>
        {image}
        <Text style={styles.title}>{news.title}</Text>
        <Text style={styles.date}>{news.date}</Text>
        <Text style={styles.text}>{news.text}</Text>

      </ScrollView>
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
    paddingTop: 15,
    fontSize: 10,
  },
  text: {
    paddingTop: 15,
    fontSize: 12,
  }
});

module.exports = NewsDetails;
