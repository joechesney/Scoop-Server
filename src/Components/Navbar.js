import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const pages = [
    {displayName: "My Feed", path:"/myFeed"},
    {displayName: "My Watchlist", path:"/myWatchlist"},
    {displayName: "Reverb Deals", path:"/reverbDeals"},
    {displayName: "Scoop Deals", path:"/scoopDeals"},
  ];

  return (
    <div className="navbar-container">
      <ul className="navbar">
        <li><NavLink
          activeClassName="selected"
          key="Home"
          exact to="/">
          Home
        </NavLink></li>
        {
          pages.map(page=>(
            <li key={page.displayName}><NavLink
              activeClassName="selected"
              key={page.displayName}
              to={page.path}>
              {page.displayName}
            </NavLink></li>)
          )
        }

      </ul>
    </div>
  )
}

export default Navbar;