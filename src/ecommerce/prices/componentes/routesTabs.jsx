// src/componentes/routesTabs.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/routesTabs.css';

const RoutesTabs = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbarRoutes">
      <div className="navbarRoutes-header">
        <button className="navbarRoutes-hamburger" onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
        </button>
        <div className="nav-usuario2">
          <img
            src="https://64.media.tumblr.com/01b9b5b72a804dcb44c31bf8938fca68/c81805076c43c391-78/s540x810/d14e82cb90db3e8e81c84e48cc9bee9538f2e7f9.jpg"
            alt="Foto de perfil"
            className="nav-foto"
          />
          <span className="nav-nombre2">Eduardo</span>
        </div>

      </div>
      
      <div className={`navbarRoutes-links ${isOpen ? 'open' : ''}`}>
      <div className="nav-logo">
          <img
            src="https://clubmate.fish/wp-content/uploads/2021/06/eCommerce-Icon-1.png"
            alt="logo"
            className="nav-imagen"
          />
          <span className="nav-titulo">Logo</span>
        </div>
    
        <NavLink to="/home" className="navbarRoutes-item" activeClassName="active">
        <i class="fa-solid fa-boxes-stacked"></i> Inventories
        </NavLink>
        <NavLink to="/orders" className="navbarRoutes-item" activeClassName="active">
          <i className="fas fa-box"></i> Orders
        </NavLink>
        <NavLink to="/payments" className="navbarRoutes-item" activeClassName="active">
          <i className="fas fa-credit-card"></i> Payments
        </NavLink>
        <NavLink to="/prices" className="navbarRoutes-item" activeClassName="active">
        <i class="fa-solid fa-tags"></i> Prices
        </NavLink>
        <NavLink to="/products" className="navbarRoutes-item" activeClassName="active">
        <i class="fa-solid fa-table-list"></i> Products
        </NavLink>
        <NavLink to="/shippings" className="navbarRoutes-item" activeClassName="active">
          <i className="fas fa-shipping-fast"></i> Shippings
        </NavLink>

        <div className="nav-usuario">
          <img
            src="https://64.media.tumblr.com/01b9b5b72a804dcb44c31bf8938fca68/c81805076c43c391-78/s540x810/d14e82cb90db3e8e81c84e48cc9bee9538f2e7f9.jpg"
            alt="Foto de perfil"
            className="nav-foto"
          />
          <span className="nav-nombre">Eduardo</span>
        </div>


      </div>
    </nav>
  );
};

export default RoutesTabs;