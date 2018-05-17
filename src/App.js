import React, { Component } from 'react';
import './App.css';
import Container from './Components/Container';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Product from './Components/Product';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import one from './images/one.jpg';
import six from './images/six.jpg';
import three from './images/three.jpg';
import four from './images/four.jpg';
import five from './images/five.jpg';
import Footer from './Components/Footer';

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
            <Route exact path="/" render={()=><Home endpoint={"http://localhost:3333/scoop/homePage"} heroPic={one} pageName="Scoop" />} />
            <Route path="/myFeed" render={()=><Container endpoint={"http://localhost:3333/scoop/myFeed"} heroPic={six} pageName="My Feed" />} />
            <Route path="/myWatchlist" render={()=><Container endpoint={"http://localhost:3333/scoop/myWatchlist"} heroPic={three} pageName="My Watchlist" />} />
            <Route path="/reverbDeals" render={()=><Container endpoint={"http://localhost:3333/scoop/reverbDeals"} heroPic={four} pageName="Reverb Deals" />} />
            <Route path="/scoopDeals" render={()=><Container endpoint={"http://localhost:3333/scoop/scoopDeals"} heroPic={five} pageName="Scoop Deals" />} />
            <Route path="/product" render={()=><Product endpoint={"http://localhost:3333/scoop/product"} />} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
