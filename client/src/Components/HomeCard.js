import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';


const HomeCard = props => {
  const wholeCard =
    (
      <Card>
        <Image src={props.picture} />
        <Card.Content>
          <Card.Header>
            {props.header}
          </Card.Header>
        </Card.Content>
      </Card>
    );

  return (
    <NavLink to={props.destination}>
      {wholeCard}
    </NavLink>
  )
}

export default HomeCard;