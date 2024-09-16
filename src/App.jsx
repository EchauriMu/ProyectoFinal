import React from 'react';
import Precios from './componentes/Precios';
import Nav from './componentes/Nav'; // Nota el cambio de 'nav' a 'Nav'

const App = () => {
  return (
    <div>
      <Nav />
      <Precios />
    </div>
  );
};

export default App;
