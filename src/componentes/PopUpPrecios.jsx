import React, { useState } from 'react';
import '../assets/PopUpPrecios.css';

const PopUpPrecios = ({ isVisible, product, onClose, onSave }) => {
  const [inputPrice, setInputPrice] = useState(product ? product.precio : 0); // Renombrado de newPrice a inputPrice
  const [currentStep, setCurrentStep] = useState(1); // Renombrado de step a currentStep

  if (!isVisible || !product) return null;

  const handlePriceChange = (e) => {
    setInputPrice(parseFloat(e.target.value)); // Renombrado de newPrice a inputPrice
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2); // Pasa al paso de confirmación
    } else {
      onSave(inputPrice); // Renombrado de newPrice a inputPrice
      onClose(); // Cierra el modal después de guardar
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1); // Regresa al paso de edición si está en el paso de confirmación
    } else {
      onClose(); // Cierra el modal si está en el paso 1
    }
  };

  return (
    <div className="popup-position">
      <div className="popup-container">
        <div className="container">
          <div className="header">
            <h2>Editar Precio</h2>
          </div>

          {/* Wizard steps */}
          <div className="wizard">
            <span className={`step ${currentStep >= 1 ? 'completed' : ''} ${currentStep === 1 ? 'active' : ''}`}>1</span>
            <span className={`step ${currentStep === 2 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>2</span>
          </div>

          {currentStep === 1 ? (
            <>
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
                    <div className="input-divActual">
                      <span>$</span>
                      <input
                        type="text"
                        id="precio-actual"
                        className="input-precioRec"
                        value={product.precio.toFixed(2)}
                        readOnly
                      />
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
                        value={inputPrice} // Renombrado de newPrice a inputPrice
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
                  <button className="go-back-btn" onClick={handleBack}>Regresar</button>
                  <button className="done-btn" onClick={handleNextStep}>Guardar</button>
                </div>
              </div>
            </>
          ) : (
            // Step 2: Confirmation step
            <div className="content">
              <h3>Confirmación</h3>
              <p>¿Estás seguro de que quieres guardar los cambios?</p>
              <div className="actions">
                <button className="go-back-btn" onClick={handleBack}>Cancelar</button>
                <button className="confirm-btn" onClick={handleNextStep}>Confirmar</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopUpPrecios;
