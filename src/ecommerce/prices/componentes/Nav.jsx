// src/Nav.js
import React, { useState } from 'react';
import '../assets/Nav.css';
import Precios from './Precios'; // Componente para la pestaña "Lista"
//import Graficas from './Graficas'; // Componente para la pestaña "Historial"
import Historial from './Historial';

import AlertsTab from '../alerts/components/tabs/AlertsTab'

import Promotions from '../promotions/components/tabs/PromotionsTab';



const Nav = () => {
  const [activeTab, setActiveTab] = useState('tab1'); // Estado para la pestaña activa

  // Función que selecciona el componente según la pestaña activa
  const renderContent = () => {
    switch (activeTab) {
      case 'tab1':
        return <Precios />; // Componente para la pestaña "Lista"
      case 'tab2':
        return <Historial/>; // Componente para la pestaña "Historial"
      case 'tab3':

        return  <AlertsTab/>;
        return <h2>Usuarios</h2>; // Otro componente para la pestaña "No se"
      case 'tab4':
        return <Promotions/>; // Componente para la pestaña "Promociones"

      default:
        return null;
        
    }
  };

  return (
    <div>
      <nav className="sectionNav-fondo">
        <div className="sectionNav-contenedor">
          <ul className="sectionNav-navbar">
            <li 
              className={activeTab === 'tab1' ? 'active' : ''} 
              title="Lista"
              onClick={() => setActiveTab('tab1')}
            >
              <a>Lista</a>
            </li>
            <li 
              className={activeTab === 'tab2' ? 'active' : ''} 
              title="Historial"
              onClick={() => setActiveTab('tab2')}
            >
              <a>Historial</a>
            </li>
            <li 
              className={activeTab === 'tab3' ? 'active' : ''} 
              title="Alertas"
              onClick={() => setActiveTab('tab3')}
            >
              <a>Alertas</a>
            </li>
            <li 
              className={activeTab === 'tab4' ? 'active' : ''} 
              title="Promociones"
              onClick={() => setActiveTab('tab4')}
            >
              <a>Promociones</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="sectionNav-content">
        {renderContent()} {/* Renderiza el componente según la pestaña seleccionada */}
      </div>
    </div>
  );
};

export default Nav;
