import React, { Component } from 'react';
import './App.css';
// import axios from 'axios';
import Container from './Components/Container';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Product from './Components/Product';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import one from './images/one.jpg'
import six from './images/six.jpg'
import three from './images/three.jpg'
import four from './images/four.jpg'
import five from './images/five.jpg'

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
            <Route exact path="/" render={()=><Home endpoint={"http://localhost:3333/scoop/homePage"} heroPic={one} />} />
            <Route path="/myFeed" render={()=><Container endpoint={"http://localhost:3333/scoop/myFeed"} heroPic={six} />} />
            <Route path="/myWatchlist" render={()=><Container endpoint={"http://localhost:3333/scoop/myWatchlist"} heroPic={three} />} />
            <Route path="/reverbDeals" render={()=><Container endpoint={"http://localhost:3333/scoop/reverbDeals"} heroPic={four} />} />
            <Route path="/scoopDeals" render={()=><Container endpoint={"http://localhost:3333/scoop/scoopDeals"} heroPic={five} />} />
            <Route path="/product" render={()=><Product endpoint={"http://localhost:3333/scoop/product"} />} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
