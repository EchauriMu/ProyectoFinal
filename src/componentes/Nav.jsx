// Nav.js
import React, { useEffect } from 'react';
import '../assets/Nav.css';

const Nav = ({ setActiveTab }) => {
  useEffect(() => {
    const links = document.querySelectorAll(".navbar li");

    const handleClick = (event) => {
      links.forEach((item) => item.classList.remove("active"));
      event.currentTarget.classList.add("active");
    };

    links.forEach((link) => {
      link.addEventListener("click", handleClick);
    });

    // Cleanup
    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleClick);
      });
    };
  }, []);
  return (
    <nav className="nav-fondo">
      <div className="nav-contenedor">
        <div className="nav-logo">
          <img
            src="https://clubmate.fish/wp-content/uploads/2021/06/eCommerce-Icon-1.png"
            alt="logo"
            className="nav-imagen"
          />
          <span className="nav-titulo">Ecommerce</span>
        </div>
        <div class="nav-usuario2"><img src="https://i.pinimg.com/736x/f5/df/b4/f5dfb46f188e6b30f7bf6c81798c7c44.jpg" alt="Foto de perfil" class="nav-foto"/><span class="nav-nombre">Eduardo</span></div>

        <div className="navbar">
          <li className="active" title="Inicio">
            <a onClick={() => setActiveTab('tab1')}>
              <i className="fas fa-home"></i>
            </a>
          </li>
          <li>
            <a onClick={() => setActiveTab('tab2')}>
              <i className="fa-solid fa-user"></i>
            </a>
          </li>
          <li>
            <a onClick={() => setActiveTab('tab3')}>
              <i className="fa-solid fa-gear"></i>
            </a>
          </li>
          <li>
            <a onClick={() => setActiveTab('tab4')}>
              <i className="fa-solid fa-right-from-bracket"></i>
            </a>
          </li>
        </div>

        <div className="nav-usuario">
          <img
            src="https://i.pinimg.com/736x/f5/df/b4/f5dfb46f188e6b30f7bf6c81798c7c44.jpg"
            alt="Foto de perfil"
            className="nav-foto"
          />
          <span className="nav-nombre">Eduardo</span>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
