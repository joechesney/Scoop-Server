import React from 'react'


const HeroPic = props => {

  const heroPicStyle = {
    backgroundImage: `url(${props.picture})`
  };

  const heroPicElement = (
    <div className="parentdiv" >
      <div className="bgdiv" {...props} style={heroPicStyle} alt="Totally sweet picture of a guitar" >
      </div>
      <h1 className="mainHeader centered">{props.header}</h1>
      <h1 className="slogan centered ">We find the scoops, just for you.</h1>
    </div>
  )
  return (
    <div>
      {heroPicElement}
    </div>
  )
}

export default HeroPic;