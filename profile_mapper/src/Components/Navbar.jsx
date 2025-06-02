import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// import './Navbar.css'; // optional, see styles below

function Navbar() {
  const location = useLocation();

  return (
    <nav className='navbar'>
      <div className='navbar-brand'>Profile App</div>
      <ul className='navbar-links'>
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === '/adminPanel' ? 'active' : ''}>
          <Link to="/adminPanel">Admin Panel</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
