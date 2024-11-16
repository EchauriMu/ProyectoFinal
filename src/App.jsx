import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import RoutesTabs from './ecommerce/prices/componentes/routesTabs';
import Home from "./ecommerce/home/pages/Home";
import Products from "./ecommerce/products/pages/Products";
import Orders from "./ecommerce/orders/pages/Orders";
import Payments from "./ecommerce/payments/pages/Payments";
import Shippings from "./ecommerce/shippings/pages/Shippings";
import Nav from "./ecommerce/prices/componentes/Nav";
import Login from './ecommerce/login/pages/Login';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = sessionStorage.getItem('usuario');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  // Función para manejar el login
  const handleLogin = (username) => {
    sessionStorage.setItem('usuario', username);
    setIsAuthenticated(true);
  };

  return (
    <Provider store={store}>
      <Router basename="/Ecommerce-ByteMasters">
        {isAuthenticated && <RoutesTabs />}
        <div className="App">
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} />
            <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
            <Route path="/orders" element={isAuthenticated ? <Orders /> : <Navigate to="/" />} />
            <Route path="/payments" element={isAuthenticated ? <Payments /> : <Navigate to="/" />} />
            <Route path="/prices" element={isAuthenticated ? <Nav /> : <Navigate to="/" />} />
            <Route path="/products" element={isAuthenticated ? <Products /> : <Navigate to="/" />} />
            <Route path="/shippings" element={isAuthenticated ? <Shippings /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;

