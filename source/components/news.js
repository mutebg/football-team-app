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
var Loading = require('../components/loading');

class News extends Component {
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
    fetch( config.API.news )
      .then((response) => response.json())
      .then((responseData) => {

        var formatedData = [];
        responseData.feed.entry.forEach( item => {
          var row = {
            title: item['gsx$title']['$t'],
            image: item['gsx$image']['$t'],
            date: item['gsx$date']['$t'],
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
        renderRow={this.renderNews}
      />
    );
  }

  renderLoadingView() {
    return (
      <Loading />
    );
  }

  renderNews(row) {
    var image;
    if ( row.image ) {
      image = <Image source={{uri: row.image}} style={styles.image} />
    } else {
      image = <Image source={{uri: config.app.logo }} style={styles.image} />
    }

    return (
      <View style={styles.row}>
        {image}
        <Text style={styles.title}>{row.title}</Text>
        <Text style={styles.date}>{row.date}</Text>

      </View>
    );
  }
}


// var News = React.createClass({
//   getInitialState: function() {
//     return {
//       dataSource: new ListView.DataSource({
//         rowHasChanged: (row1, row2) => row1 !== row2,
//       }),
//       loaded: false,
//     };
//   },
//
//   componentDidMount: function() {
//     this.fetchData();
//   },
//
//   fetchData: function() {
//     fetch( config.API.news )
//       .then((response) => response.json())
//       .then((responseData) => {
//
//         var formatedData = [];
//         responseData.feed.entry.forEach( function(item){
//           var row = {
//             title: item['gsx$title']['$t'],
//             image: item['gsx$image']['$t'],
//             date: item['gsx$date']['$t'],
//             link: item['gsx$link']['$t'],
//           }
//           formatedData.push(row);
//         });
//
//
//         this.setState({
//           dataSource: this.state.dataSource.cloneWithRows( formatedData ),
//           loaded: true,
//         });
//       })
//       .done();
//   },
//
//   render: function() {
//     if (!this.state.loaded) {
//       return this.renderLoadingView();
//     }
//
//     return (
//       <ListView
//         dataSource={this.state.dataSource}
//         renderRow={this.renderNews}
//       />
//     );
//   },
//
//   renderLoadingView: function() {
//     return (
//       <Loading />
//     );
//   },
//
//   renderNews: function(row) {
//
//     var image;
//     if ( row.image ) {
//       image = <Image source={{uri: row.image}} style={styles.image} />
//     } else {
//       image = <Image source={{uri: config.app.logo }} style={styles.image} />
//     }
//
//     return (
//       <View style={styles.row}>
//         {image}
//         <Text style={styles.title}>{row.title}</Text>
//         <Text style={styles.date}>{row.date}</Text>
//
//       </View>
//     );
//   },
// });


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

module.exports = News;
