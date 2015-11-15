var alt = require('../alt');
var Actions = require('../actions');
var UtilsSource = require('../sources/utilssource');

class UtilsStore {

  constructor(){
    this.state = {
      sponsors: [],
      videos: [],
      loading: false,
      error: false,
    };

    this.registerAsync(UtilsSource);
    this.bindListeners({
      fetchSponsors: Actions.sponsorsFetch,
      setSponsors: Actions.sponsorsFetchSuccess,
      setError: Actions.sponsorsFetchFailed,

      fetchVideos: Actions.videosFetch,
      setVideos: Actions.videosFetchSuccess,
    });
  }

  fetchSponsors() {
    this.setState({
      loading: true,
    })
    this.getInstance().getSponsors();
  }

  setSponsors(sponsors){
    this.setState({
      sponsors,
      loading: false
    });
  }

  fetchVideos() {
    this.setState({
      loading: true,
    })
    this.getInstance().getVideos();
  }

  setVideos(videos){
    this.setState({
      videos,
      loading: false
    });
  }

  setError() {
    this.setState({
      error: true,
      loading: false,
    });
  }
}

module.exports = alt.createStore(UtilsStore);
