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
var Loading = require('./loading');

var Actions = require('../actions');
var NewsStore = require('../stores/newsstore');



class NewsDetails extends Component {
  constructor(props) {
    super(props);

    var currentNavigation = this.props.navigator.getCurrentRoutes();
    var slug = currentNavigation[ currentNavigation.length - 1 ].slug;

    this.state = {
      slug: slug,
      data: {},
      loading: true,
    }

    Actions.newsItemFetch(slug);
  }

  componentDidMount() {
    NewsStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    NewsStore.unlisten(this.onChange.bind(this));
  }

  onChange(state) {
    this.setState({
      data: state.item,
      loading: state.loading,
    });
  }

  render() {
    if (this.state.loading) {
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
    var news = this.state.data;
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
        <Text style={styles.date}>{news.datetime}</Text>
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
