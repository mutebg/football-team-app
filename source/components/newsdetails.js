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

class NewsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsData: {},
      loaded: false,
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch( config.API.news )
      .then((response) => response.json())
      .then((responseData) => {

        var newsData = {
          title: responseData.feed.entry[0]['gsx$title']['$t'],
          image: responseData.feed.entry[0]['gsx$image']['$t'],
          date: responseData.feed.entry[0]['gsx$date']['$t'],
          link: responseData.feed.entry[0]['gsx$link']['$t'],
          text: `Децата на „Нефтохимик“, родени през 2007 година победиха отбора на „Звездичка“ с 4:3. Срещата се проведе днес, в спортен комплекс „Изгрев“.

В напрегнатия двубой, „Звездичка“ поведе с 2:0, но най-малките „шейхове“ обърнаха резултата. В самия край на мача резултатът беше равен – 3:3, но в последния момент „Нефтохимик“ вкара победния гол и доказа, че е най-добрият отбор в Бургас.

Георги Апостолов допринесе за победата с два гола, а Денис Тохмак и Теди Стефанов се разписаха по веднъж.

В следващия мач „зелените“ от втория отбор за деца, родени през 2007 г, посрещнаха тима на „Поморие“. Срещата завърши с равен резултат 1:1, като голмайстор за „Нефтохимик“ стана Георги Тодоров!

Браво, деца! Продължавайте да ни радвате с победи!`
        };

        this.setState({
          newsData: newsData,
          loaded: true,
        });
      })
      .done();
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
