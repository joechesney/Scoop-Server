import React from 'react'
import { Image } from 'semantic-ui-react'
// import picture from '../images/one.jpg'

const HeroPic = props => {
  return (
    <img className="heroPic" src={props.heroPic} />
  )
}

export default HeroPic;