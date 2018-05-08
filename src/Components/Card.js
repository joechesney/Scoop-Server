import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

const ProductCard = props => (
<a href={props.card._links.web.href}>
  <Card>
    <Image src={props.card.photos[0]._links.small_crop.href} />
    <Card.Content>
      <Card.Header>
        {props.card.make} {props.card.model}
      </Card.Header>
      <Card.Meta>
        <span className='date'>
          {props.card.published_at.toLocaleString()}
        </span>
      </Card.Meta>
      <Card.Description>
        Matthew is a musician living in Nashville.
      </Card.Description>
    </Card.Content>
    <Card.Content extra>

        <Icon name='user' />

        {
          (props.card.SCOOP)&&(props.card.SCOOP.percentOfMarketPrice < 100)
          ? `${props.card.SCOOP.percentBelowMarketPrice} % below market price`
          : `0% below market price`
          }


    </Card.Content>
  </Card>
  </a>
)

export default ProductCard;