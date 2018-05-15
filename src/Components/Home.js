import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      lists: [],
      endpoint: props.endpoint,
    }
  }

  componentDidMount() {
    axios.get(this.state.endpoint)
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