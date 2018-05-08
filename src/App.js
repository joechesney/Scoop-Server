import React, { Component } from 'react';
import './App.css';
// import axios from 'axios';
import Container from './Components/Container';
import Navbar from './Components/Navbar';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    }
  }

  render() {
    return (
      <div >
        <Navbar />
        <Container />
      </div>
    );
  }
}

export default App;
