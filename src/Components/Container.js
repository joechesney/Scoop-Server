import React from 'react';
import axios from 'axios';
import ProductCard from './Card';
import { Card } from 'semantic-ui-react'

class Container extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      products: [],
      endpoint: props.endpoint
    }
  }

  componentDidMount() {
    axios.get(this.state.endpoint)
    .then(response=>{
      console.log('SWEET SWEET DATA',response.data);
      this.setState(prevState=> {
        return {
          products: response.data
        }
      });
    });
  }
  render() {
    return (
      <Card.Group>
        {
          this.state.products.filter(product=>product.SCOOP !== undefined).map((product)=>(
              <span key={product.id}>
                <ProductCard
                  card={product}
                  />
              </span>
            )
          )
        }
      </Card.Group>
    )
  }
}

export default Container;