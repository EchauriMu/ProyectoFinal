import React from 'react';
import '../assets/Nav.css';

const Nav = () => {
  return (
    <nav className="nav-fondo">
      <div className="nav-contenedor">
        <div className="nav-logo">
          <img src="https://clubmate.fish/wp-content/uploads/2021/06/eCommerce-Icon-1.png" alt="logo" className="nav-imagen" />
          <span className="nav-titulo">Ecommerce</span>
        </div>

        <div className="nav-pestañas">
          <button className="nav-pestaña">Tab 1</button>
          <button className="nav-pestaña">Tab 2</button>
          <button className="nav-pestaña">Tab 3</button>
        </div>

        <div className="nav-usuario">
          <img src="https://static.vecteezy.com/system/resources/previews/007/033/146/non_2x/profile-icon-login-head-icon-vector.jpg" alt="User Photo" className="nav-foto " />
          <span className="nav-nombre">Eduardo</span>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
