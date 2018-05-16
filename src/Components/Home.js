import React from 'react';
import HomeCard from './HomeCard'
import axios from 'axios';
import HeroPic from './HeroPic'
import Mission from './Mission';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pics: {},
      endpoint: props.endpoint,
      heroPic: props.heroPic,
    }
  }

  componentDidMount() {
    console.log('endpoint:',this.state.endpoint);
    axios.get(this.state.endpoint)
    .then(response => {
      console.log('SWEET Home DATA', response.data);
      this.setState(prevState => {
        console.log('prevState',prevState);
        return {
          pics: response.data,
        }
      });
    });
  }

  render() {
    return (
      <div>
        <HeroPic heroPic={this.state.heroPic} />
        <Mission />
        <div className="homePageContainer">
          <HomeCard picture={this.state.pics.myFeedPic} header="My Feed" destination="/myFeed" />
          <HomeCard picture={this.state.pics.myWatchlistPic} header="My Watchlist" destination="/myWatchlist" />
          <HomeCard picture={this.state.pics.reverbDealsPic} header="Reverb Deals" destination="/reverbDeals" />
          <HomeCard picture={this.state.pics.scoopDealsPic} header="Scoop Deals" destination="/scoopDeals" />
        </div>
      </div>
    )
  }
}

export default Home;