import React from 'react';
import axios from 'axios';
import ProductCard from './Card';
import { Card } from 'semantic-ui-react'
import HeroPic from './HeroPic'
class Container extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      products: [],
      endpoint: props.endpoint,
      heroPic: props.heroPic,
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
      <div>
        <HeroPic heroPic={this.state.heroPic} />
        <div className="page-container">
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
        </div>
      </div>
    )
  }
}

export default Container;