import React, { useState } from 'react';
import '../assets/PopUpPrecios.css';

const PopUpPrecios = ({ isVisible, product, onClose, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [nuevoPrecio, setNuevoPrecio] = useState("");

  if (!isVisible || !product) return null;

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      onSave({ nuevoPrecio });
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else {
      onClose();
    }
  };

  return (
    <div className="popup-position">
      <div className="popup-container">
        <div className="container">
          <div className="header">
            <h2>Editar Precio - ID Lista: {product.IdListaOK}</h2>
          </div>

          {/* Wizard steps */}
          <div className="wizard">
            <span className={`step ${currentStep >= 1 ? 'completed' : ''} ${currentStep === 1 ? 'active' : ''}`}>1</span>
            <span className={`step ${currentStep === 2 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>2</span>
          </div>

          {currentStep === 1 ? (
            <div className="content">
              {/* Dropdown Producto */}
              <div className="dropdown">
                <h4>Producto</h4>
                <div className="presentacion-contenedor">
                  <div className="select-div">
                    <select id="producto">
                      <option value="9001-000000000001">9001-000000000001</option>
                      <option value="9001-000000000002">Otro Producto</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Dropdown Presentación */}
              <div className="dropdown">
                <h4>Presentación del producto</h4>
                <div className="presentacion-contenedor">
                  <div className="select-div">
                    <select id="presentacion">
                      <option value="9001-000000000001-000000001">9001-000000000001-000000001</option>
                      <option value="9001-000000000001-000000002">Otra Presentación</option>
                    </select>
                  </div>
                </div>
              </div>

             {/* Precios */}
          <h4>Selecciona un nuevo precio</h4>
          <div className="button-group">
            <div className="precio-act">
              <label htmlFor="costo-inicial">Costo Inicial</label>
              <div className="input-div">
                <span>$</span>
                <input
                  type="number"
                  id="costo-inicial"
                  className="input-precioAct"
                  value="15234.55"
                  onChange={(e) => setCostoInicial(e.target.value)} // Implementar la lógica de estado si es necesario
                />
              </div>
            </div>
  
            <div className="precio-act">
              <label htmlFor="costo-final">Costo Final</label>
              <div className="input-div">
                <span>$</span>
                <input
                  type="number"
                  id="costo-final"
                  className="input-precioAct"
                  value="25600.00"
                  onChange={(e) => setCostoFinal(e.target.value)} // Implementar la lógica de estado si es necesario
                />
              </div>
            </div>
  
            <div className="precio-act">
              <label htmlFor="precio-actual">Precio Actual</label>
              <div className="input-divActual">
                <span>$</span>
                <input
                  type="text"
                  id="precio-actual"
                  className="input-precioRec"
                  value="35605.50"
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
                  value="35605.50"
                  onChange={(e) => setNuevoPrecio(e.target.value)} // Implementar la lógica de estado si es necesario
                />
              </div>
            </div>
  
            {/* Fórmula dentro del div de "Editar Precio" */}
            <div className="precio-act">
              <label htmlFor="formula">Fórmula</label>
              <div className="input-div">
                <input
                  type="text"
                  id="formula"
                  className="input-precioAct"
                  value="(CostoIni + CostoFin) / 2 * factor_demanda"
                  onChange={(e) => setFormula(e.target.value)} // Implementar la lógica de estado si es necesario
                />
              </div>
            </div>
          </div>

              {/* Historial de modificaciones */}
              <h4>Historial Modificaciones</h4>
              <div className="resources">
                <div className="resource-columns">
                  <p>Modificación 1: Precio cambiado a $34,000 el 2023-05-01</p>
                  <p>Modificación 2: Precio cambiado a $35,605.50 el 2023-06-15</p>
                </div>
              </div>

              <div className="actions">
                <button className="go-back-btn" onClick={handleBack}>
                  Regresar
                </button>
                <button className="done-btn" onClick={handleNextStep}>
                  Guardar
                </button>
              </div>
            </div>
          ) : (
            <div className="content">
              <h3>Confirmación</h3>
              <p>¿Estás seguro de que quieres guardar los cambios?</p>
              <div className="actions">
                <button className="go-back-btn" onClick={handleBack}>
                  Cancelar
                </button>
                <button className="confirm-btn" onClick={handleNextStep}>
                  Confirmar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopUpPrecios;
