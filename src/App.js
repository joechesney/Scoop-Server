import React, { Component } from 'react';
import './App.css';
// import axios from 'axios';
import Container from './Components/Container';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import List from './Components/List';
import Product from './Components/Product';
import { BrowserRouter as Router, Route} from 'react-router-dom';


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
        <div>
          <Navbar />
          <div className="page-container">
            <Route exact path="/" render={()=><Home endpoint={"http://localhost:3333/scoop/home"}/>} />
            <Route path="/myfeed" render={()=><Container endpoint={"http://localhost:3333/scoop/myfeed"}/>} />
            <Route path="/mywatchlist" render={()=><Container endpoint={"http://localhost:3333/scoop/mywatchlist"}/>} />
            <Route path="/reverblists" render={()=><List endpoint={"http://localhost:3333/scoop/reverblists"}/>} />
            <Route path="/scooplists" render={()=><List endpoint={"http://localhost:3333/scoop/scooplists"}/>} />
            <Route path="/product" render={()=><Product endpoint={"http://localhost:3333/scoop/product"}/>} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
