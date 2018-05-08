import React from 'react';
import axios from 'axios';
import ProductCard from './Card';
import { Card } from 'semantic-ui-react'

class Container extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      products: [],
    }
  }

  componentDidMount() {
    axios.get("http://localhost:3333/scoop/myfeed")
    .then(response=>{
      console.log('SWEET MOTHERFUCKIN DATA',response.data);
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
          this.state.products.filter(product=>product.SCOOP !== undefined).map((product)=>{
            return (
              <span key={product.id}>
                <ProductCard
                  card={product}
                  />
              </span>
            )
          })
        }
      </Card.Group>
    )
  }
}

export default Container;