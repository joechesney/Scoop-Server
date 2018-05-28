import React from 'react';
import axios from 'axios';
import ProductCard from './Card';
import ShowMoreButton from './ShowMore';
import { Card, Icon } from 'semantic-ui-react'
import HeroPic from './HeroPic'
class Container extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      products: [],
      endpoint: props.endpoint,
      picture: props.picture,
      loading: true,
      pageName: this.props.pageName,
      pageQuery: "",
      nextPage: "",
    }
    this.handleShowMore = this.handleShowMore.bind(this);
  }

  componentDidMount() {
    axios.get(this.state.endpoint)
    .then(response=>{
      console.log('response from api',response);
      this.setState(prevState=> {
        return {
          products: response.data.products,
          loading: false,
          nextPage: response.data.nextPage,
        }
      });
    });
  }

  handleShowMore() {
    console.log('this state',this.state);
    axios.post(this.state.endpoint, {nextPage: this.state.nextPage})
    .then(response=>{
      console.log('response from api2',response);
      this.setState(prevState=> {
        return {
          ...prevState,
          products: prevState.products.concat(response.data.products),
          loading: false,
          nextPage: response.data.nextPage,
        }
      });
    });
  }


  render() {
    return (
      <div>
        <HeroPic picture={this.state.picture} header={this.state.pageName}/>
        <div className="page-container">
          {this.state.loading ? <div className="loading centered"> <h1>Loading {this.state.pageName} <Icon loading name='spinner' /> </h1> </div> :
          <Card.Group>
            {
              this.state.products.filter(product=>product.SCOOP !== undefined).map((product)=>(
                  <span key={product.id}>
                    <ProductCard
                      card={product}
                      key={product.id}
                      />
                  </span>
                )
              )
            }
          </Card.Group>
          }
          <ShowMoreButton showMoreProducts={this.handleShowMore} />
        </div>
      </div>
    )
  }
}

export default Container;