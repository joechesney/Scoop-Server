import React from 'react';
import axios from 'axios';
import ProductCard from './Card';
import { Card, Icon } from 'semantic-ui-react'
import HeroPic from './HeroPic'
class Container extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      products: [],
      endpoint: props.endpoint,
      heroPic: props.heroPic,
      loading: true,
      pageName: this.props.pageName,
    }
  }

  componentDidMount() {
    axios.get(this.state.endpoint)
    .then(response=>{
      console.log('SWEET SWEET DATA',response.data);
      this.setState(prevState=> {
        return {
          products: response.data,
          loading: false,

        }
      });
    });
  }


  render() {
    return (
      <div>
        <HeroPic heroPic={this.state.heroPic} />
        <div className="page-container">
          {this.state.loading ? <div className="loading centered"> <h1>Loading {this.state.pageName} <Icon loading name='spinner' /> </h1> </div> :
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
          }
        </div>
      </div>
    )
  }
}

export default Container;