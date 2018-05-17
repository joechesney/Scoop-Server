import React from 'react'


const Footer = props => {
  return (
    <div className="footer">
      <br />
      <div className="footerContainer">
        <p className="centered footerSection">Made by Joe Chesney<br /><span>With help from Reverb.com</span></p>
        <p className="centered footerSection">&copy; Scoop LLC, 2018</p>
        <p className="centered footerSection"><a href="github.com/joechesney/scoop">github.com/joechesney/scoop</a></p>
      </div>
    </div>
  )
}

export default Footer;