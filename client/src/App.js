import React, { Component } from 'react';
import './App.css';
import Container from './Components/Container';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
// import Product from './Components/Product';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import one from './images/one.jpg';
import six from './images/six.jpg';
import three from './images/three.jpg';
import four from './images/four.jpg';
import five from './images/five.jpg';
import Footer from './Components/Footer';
const scoop_server = "https://joechesney-scoop.herokuapp.com/backend/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    }
  }

  render() {
    return (
      <Router>
        <div className="fullBody">
          <Navbar />

          <div >
            <Route exact path="/" render={()=><Home endpoint={`${scoop_server}/scoop/homePage`} picture={one} pageName="Scoop" />} />
            <Route path="/myFeed" render={()=><Container endpoint={`${scoop_server}/scoop/myFeed`} picture={six} pageName="My Feed" />} />
            <Route path="/myWatchlist" render={()=><Container endpoint={`${scoop_server}/scoop/myWatchlist`} picture={three} pageName="My Watchlist" />} />
            <Route path="/reverbDeals" render={()=><Container endpoint={`${scoop_server}/scoop/reverbDeals`} picture={four} pageName="Reverb Deals" />} />
            <Route path="/scoopDeals" render={()=><Container endpoint={`${scoop_server}/scoop/scoopDeals`} picture={five} pageName="Scoop Deals" />} />
            {/* <Route path="/product" render={()=><Product endpoint={`${scoop_server}/scoop/product`} />} /> */}
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
