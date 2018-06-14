import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

const ProductCard = props => {
  const dateOfPublication = new Date(props.card.created_at).toLocaleString();
  const shipping = props.card.shipping.rates[0] ? props.card.shipping.rates[0].rate.display + " shipping" : "Local Pickup Only"
  const wholeCard = props.card.SCOOP.hasPriceGuide === true
    ? (
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
          <div>{props.card.condition}</div>
            {props.card.location.display_location}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div>
            This Price: ${props.card.price.amount} + {shipping}
          </div>
          <div>Avg. Price: ${props.card.SCOOP.avgMarketPrice.toFixed(2)}</div>
        </Card.Content>
        <Card.Content extra>
          <Icon name='dollar' />
            {
              (props.card.SCOOP)&&(props.card.SCOOP.percentOfMarketPrice < 100)
              ? <span className="scoopPrice">{props.card.SCOOP.percentBelowMarketPrice} % below market price</span>
              : <span className="notScoopPrice">{ (props.card.SCOOP.percentOfMarketPrice - 100).toFixed(0)}% above market price</span>
            }
        </Card.Content>
      </Card>
    )
    :
    (
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
            <div>
              This Price: ${props.card.price.amount} + {shipping}
            </div>
            <div>Lowest Available Price: ${props.card.SCOOP.lowestAvailable}</div>
          </Card.Content>
          <Card.Content extra>
            <Icon name='dollar' />
              {
                (props.card.SCOOP)&&(props.card.SCOOP.isLowestAvailable)
                ? <span className="scoopPrice">This is the lowest price available</span>
                : <span className="notScoopPrice">{ (props.card.SCOOP.percentAboveLowestAvailable)}% above lowest available price</span>
              }
          </Card.Content>
        </Card>


    );

  return (
    <a href={props.card._links.web.href}>
      {wholeCard}
    </a>
  )
}

export default ProductCard;