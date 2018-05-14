import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const pages = [
    {displayName: "My Feed", path:"/myfeed"},
    {displayName: "My Watchlist", path:"/mywatchlist"},
    {displayName: "Reverb Deals", path:"/reverblists"},
    {displayName: "Scoop Deals", path:"/scooplists"},
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
            <li><NavLink
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