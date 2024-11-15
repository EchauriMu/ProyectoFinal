// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RoutesTabs from './ecommerce/prices/componentes/routesTabs';
import Home from "./ecommerce/home/pages/Home";
import Products from "./ecommerce/products/pages/Products";

import Orders from "./ecommerce/orders/pages/Orders";
import Payments from "./ecommerce/payments/pages/Payments";
import Shippings from "./ecommerce/shippings/pages/Shippings";
import Nav from  "./ecommerce/prices/componentes/Nav";

const App = () => {
  return (
    <Router>
      <RoutesTabs /> {/* Barra de navegación principal */}
      <div className="App">
      
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/prices" element={<Nav />} />
          <Route path="/products" element={<Products />} />
          <Route path="/shippings" element={<Shippings />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
