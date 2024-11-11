import React, { useState } from 'react';
import '../assets/PopUpPrecios.css';

const PopUpPrecios = ({ isVisible, product, onClose, onSave }) => {
  const [newPrice, setNewPrice] = useState(product ? product.precio : 0);

  if (!isVisible || !product) return null;

  const handlePriceChange = (e) => {
    setNewPrice(e.target.value);
  };

  const handleSave = () => {
    onSave(newPrice);
  };

  return (
    <div className="popup-position">
      <div className="popup-container">
        <div className="container">
          <div className="header">
            <h2>Editar Precio</h2>
          </div>
          <div className="wizard">
            <span className="step completed">1</span>
            <span className="step active">2</span>
          </div>

          <div className="dropdown">
            <h3>Presentación del producto</h3>
            <div className="presentacion-contenedor">
              <div className="select-div">
                <select id="version">
                  <option>Color negro</option>
                  <option>Color Azul</option>
                </select>
                <p className="version-info">Asegúrate de seleccionar la correcta</p>
              </div>
              <img className="img-presenta" src="https://placehold.co/120x120" alt="Presentación" />
            </div>
          </div>

          <div className="content">
            <h3>Selecciona un nuevo precio</h3>
            <div className="button-group">
              <div className="precio-act">
                <label htmlFor="precio-actual">Precio Actual</label>
                <div className="input-div">
                  <span>$</span>
                  <input type="text" id="precio-actual" className="input-precioRec" value={product.precio.toFixed(2)} readOnly />
                </div>
              </div>

              <div className="precio-act">
                <label htmlFor="nuevo-precio">Nuevo Precio</label>
                <div className="input-div">
                  <span>$</span>
                  <input
                    type="number"
                    id="nuevo-precio"
                    className="input-precioAct"
                    value={newPrice}
                    onChange={handlePriceChange}
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <h3>Historial Modificaciones</h3>
            <div className="resources">
              <div className="resource-columns">
                {/* Aquí puedes agregar historial de modificaciones si es necesario */}
              </div>
            </div>

            <div className="actions">
              <button className="go-back-btn" onClick={onClose}>Regresar</button>
              <button className="done-btn" onClick={handleSave}>Guardar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpPrecios;
