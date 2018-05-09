import React, { Component } from 'react';
import './App.css';
// import axios from 'axios';
import Container from './Components/Container';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';


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

          <Route path="/myfeed" render={()=><Container endpoint={"http://localhost:3333/scoop/myfeed"}/>} />
          <Route path="/mywatchlist" render={()=><Container endpoint={"http://localhost:3333/scoop/mywatchlist"}/>} />
        </div>
      </Router>
    );
  }
}

export default App;
