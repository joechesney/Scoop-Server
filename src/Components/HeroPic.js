import React from 'react';

const HeroPic = props => {
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

export default HeroPic;