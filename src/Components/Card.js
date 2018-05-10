import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

const ProductCard = props => {
  const dateOfPublication = new Date(props.card.created_at).toLocaleString();
  return (
<a href={props.card._links.web.href}>
  <Card>
    <Image src={props.card.photos[0]._links.small_crop.href} />
    <Card.Content>
      <Card.Header>
        {props.card.make} {props.card.model}
      </Card.Header>
      <Card.Meta>
        <span className='date'>
          {dateOfPublication}
        </span>
      </Card.Meta>
      <Card.Description>
        {props.card.condition}
        {props.card.location.display_location}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <div>This Price: ${props.card.price.amount} + {props.card.shipping.rates[0].rate.display} shipping</div>
      <div>Avg. Price: ${props.card.SCOOP.priceToDisplay.toFixed(2)}</div>

    </Card.Content>
    <Card.Content extra>
      <Icon name='dollar' />
        {
          (props.card.SCOOP)&&(props.card.SCOOP.percentOfMarketPrice < 100)
          ? <span className="scoopPrice">${props.card.SCOOP.percentBelowMarketPrice} % below market price</span>
          : <span className="notScoopPrice">${props.card.SCOOP.percentOfMarketPrice - 100}% above market price</span>
        }
    </Card.Content>
  </Card>
  </a>
)
}

export default ProductCard;