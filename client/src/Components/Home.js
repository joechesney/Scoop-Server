import React from 'react';
import HomeCard from './HomeCard';
import axios from 'axios';
import HeroPic from './HeroPic';
import Mission from './Mission';
import { Icon } from 'semantic-ui-react';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pics: {},
      endpoint: props.endpoint,
      picture: props.picture,
      pageName: this.props.pageName,
    }
  }

  componentDidMount() {
    axios.get(this.state.endpoint)
    .then(response => {
      this.setState(prevState => {
        return {
          pics: response.data,
        }
      });
    });
  }

  render() {
    return (
      <div>
        <HeroPic picture={this.state.picture} header={this.state.pageName}/>
        <Mission />
        {this.state.loading ?
          <div className="homePageContainer">
            <div className="loading centered"> <h1>Loading {this.state.pageName} <Icon loading name='spinner' /> </h1> </div>
          </div>
          :
          <div className="homeCards homePageContainer">
            <HomeCard picture={this.state.pics.myFeedPic} header="My Feed" destination="/myFeed" />
            <HomeCard picture={this.state.pics.myWatchlistPic} header="My Watchlist" destination="/myWatchlist" />
            <HomeCard picture={this.state.pics.reverbDealsPic} header="Reverb Deals" destination="/reverbDeals" />
            <HomeCard picture={this.state.pics.scoopDealsPic} header="Scoop Deals" destination="/scoopDeals" />
          </div>
          }

      </div>
    )
  }
}

export default Home;