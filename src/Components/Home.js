import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      lists: [],
    }
  }

  componentDidMount() {
    axios.get("/scoop/home")
    .then(response=>{
      console.log('SWEET Home DATA',response.data);
      this.setState(prevState=> {
        return {
          lists: response.data
        }
      });
    });
  }

  render() {
    return (
      <div></div>
    )
  }
}

export default Home;