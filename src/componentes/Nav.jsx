// Nav.js
import React from 'react';
import '../assets/Nav.css';

const Nav = ({ setActiveTab }) => {
//solo animaciones
  let links = document.querySelectorAll("li");
links.forEach((link, Nav) => {
  link.addEventListener("click", () => {
    links.forEach((item) => item.classList.remove("active"));

    link.classList.add("active");

  });
});

  return (
    <nav className="nav-fondo">
      <div className="nav-contenedor">
        <div className="nav-logo">
          <img src="https://clubmate.fish/wp-content/uploads/2021/06/eCommerce-Icon-1.png" alt="logo" className="nav-imagen" />
          <span className="nav-titulo">Ecommerce</span>
        </div>

        <div class="navbar">
  
        <li class="active">
          <a  onClick={() => setActiveTab('tab1')}> <i class="fas fa-home"></i></a>
        </li>
        <li>
          <a  onClick={() => setActiveTab('tab2')}> <i class="fa-solid fa-user"></i></a>
        </li>
        <li>
          <a  onClick={() => setActiveTab('tab3')}> <i class="fa-solid fa-gear"></i></a>
        </li>
        <li>
          <a  onClick={() => setActiveTab('tab4')}> <i class="fa-solid fa-right-from-bracket"></i></a>
        </li>

    
    </div>

        <div className="nav-usuario">
          <img src="https://scontent.ftpq2-1.fna.fbcdn.net/v/t39.30808-1/455476687_2814693292027069_8664129958700040026_n.jpg?stp=dst-jpg_s200x200&_nc_cat=107&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeFwP2IsYRMgREGX1kH4ADLTyEAMyeQVZhrIQAzJ5BVmGuhhxH9B16tkFqclA9Cf7rntyrb-wDGw6r6_A1GHgnHU&_nc_ohc=fDxckDbJE9QQ7kNvgGxToP2&_nc_ht=scontent.ftpq2-1.fna&oh=00_AYDKGitjljD4FYnUEWx5BZIwYcjT8Z27IqMP67v9EpCoig&oe=67025A37" alt="Foto de perfil" className="nav-foto" />
          <span className="nav-nombre">Eduardo</span>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
