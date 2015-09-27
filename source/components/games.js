var React = require('react-native');
var {
  ListView,
  Component,
} = React;

var config = require('../config');
var Loading = require('../components/loading');
var GameRow = require('./gamerow');


class Games extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      listOffset: 0,
      loaded: false,
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch( config.API.fixtures )
      .then((response) => response.json())
      .then((responseData) => {

        var offset = 0;
        var formatedData = [];
        responseData.feed.entry.forEach( (item, index )=> {
          var row = {
            round: item['gsx$round']['$t'],
            team: item['gsx$team']['$t'],
            date: item['gsx$date']['$t'].split('-')[0],
            hour: item['gsx$date']['$t'].split('-')[1],
            result: item['gsx$result']['$t'],
            home: item['gsx$home']['$t'],
            logo: item['gsx$logo']['$t'],
          }
          formatedData.push(row);

          //calculate offset
          if ( row.result.length < 2 && offset == 0 ) {
            offset = index * 86; //height of gamerow
          }
        });

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(formatedData),
          loaded: true,
          listOffset: offset,
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
        contentOffset={{ x: 0, y: this.state.listOffset }}
        scrollRenderAheadDistance={100}
        dataSource={this.state.dataSource}
        renderRow={this.renderGames}
        initialListSize={50}
      />
    );
  }

  renderLoadingView() {
    return (<Loading />)
  }

  renderGames(row) {

    if ( row.home ) {
      row.teamA = config.team_name;
      row.teamB = row.team
      row.logoA = config.team_logo;
      row.logoB = row.logo
    } else {
      row.teamA = row.team
      row.teamB = config.team_name;
      row.logoA = row.logo;
      row.logoB = config.team_logo;
    }

    if ( row.result.length > 2 ) {
      row.resultA = parseInt( row.result.split(':')[0] );
      row.resultB = parseInt( row.result.split(':')[1] );
    } else {
      row.resultA = '';
      row.resultB = '';
    }

    return (
      <GameRow game={row} />
    );
  }
}

module.exports = Games;
