import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Login.css'; // Importa el archivo CSS

const Login = ({ onLogin }) => {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (usuario && contraseña) {
      onLogin(usuario); // Llama a la función para actualizar la autenticación en `App`
      alert("Inicio de sesión exitoso");
      navigate("/home");
    } else {
      alert("Por favor, completa todos los campos");
    }
  };

  return (
    <div className="contenedor-principal">
      <div className="contenedor-login">
        <h2>Inicia sesión con tu nombre de usuario</h2>
        <div>
          <input
            type="text"
            name="usuario"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            className="input"
          />
        </div>
        <div>
          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
            className="input"
          />
        </div>
        <button onClick={handleLogin} className="button">
          Iniciar sesión
        </button>
        <div className="registro">
          <p>ecommerce byteMasters</p>
        </div>
        <div className="recuperacion">
          <p>PW 7-8</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
