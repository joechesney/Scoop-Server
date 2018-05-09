import React from 'react';
import { Link, BrowserRouter as Browser, Route } from 'react-router-dom';

const Navbar = () => {
  return (
    <ul>
      <li><Link to="/" >Home</Link></li>
      <li><Link to="/myfeed" >My Feed</Link></li>
      <li><Link to="/mywatchlist" >My Watchlist</Link></li>
    </ul>
  )
}

export default Navbar;