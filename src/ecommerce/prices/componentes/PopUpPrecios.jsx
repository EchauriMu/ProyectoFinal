import React, { useState, useEffect } from 'react';
import '../assets/PopUpPrecios.css';
import { fetchPrecioById } from '../../../actions/listasTablasGeneralActions';
import { useDispatch, useSelector } from 'react-redux';

const PopUpPrecios = ({ isVisible, product, onClose, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [nuevoPrecio, setNuevoPrecio] = useState("");
  const [selectedProdServId, setSelectedProdServId] = useState("");
  const [selectedPresentaId, setSelectedPresentaId] = useState("");
  const dispatch = useDispatch();

  // Acceso a la data desde el store usando 'precioData'
  const { precioData, loading, error } = useSelector((state) => state.precio); //  'precio' es el nombre del slice en tu reducer

  // Hacer fetch cuando `product` cambia
  useEffect(() => {
    if (product?.IdListaOK) {
      dispatch(fetchPrecioById(product.IdListaOK)); // Dispara la acción para obtener los precios
    }
  }, [product, dispatch]);

  // Filtrar los precios cuando `precioData` o `product` cambian
  useEffect(() => {
    if (precioData.length > 0 && product?.IdProdServOK) {
      const selectedPrices = precioData.filter(
        (item) => item.IdProdServOK === product.IdProdServOK
      );
      if (selectedPrices.length > 0) {
        setSelectedProdServId(selectedPrices[0].IdProdServOK);
        setSelectedPresentaId(selectedPrices[0].IdPresentaOK);
        setNuevoPrecio(selectedPrices[0].Precio);
      }
    }
  }, [precioData, product]);

  // Cambiar paso
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

  const handleSelectProduct = (e) => {
    const selectedProductId = e.target.value;
    setSelectedProdServId(selectedProductId);

    // Filtrar precios para el producto seleccionado
    const selectedPrices = precioData.filter(item => item.IdProdServOK === selectedProductId);
    if (selectedPrices.length > 0) {
      setSelectedPresentaId(selectedPrices[0].IdPresentaOK);
      setNuevoPrecio(selectedPrices[0].Precio);
    }
  };

  const handleSelectPresentacion = (e) => {
    const selectedPresentaId = e.target.value;
    setSelectedPresentaId(selectedPresentaId);

    // Buscar el precio correspondiente a la presentación seleccionada
    const selected = precioData.find(item => item.IdPresentaOK === selectedPresentaId);
    if (selected) {
      setNuevoPrecio(selected.Precio);
    }
  };

  if (!isVisible || !product) return null;

  return (
    <div className="popup-position">
      <div className="popup-container">
        <div className="container">
          <div className="header">
            <h2>Editar Precio - ID Lista: {product.IdListaOK}</h2>
          </div>

          {/* Cargando o Error */}
          {loading && <div>Cargando...</div>}
          {error && <div>Error al cargar los datos: {error}</div>}

          {/* Wizard steps */}
          <div className="wizard">
            <span className={`step ${currentStep >= 1 ? 'completed' : ''} ${currentStep === 1 ? 'active' : ''}`}>1</span>
            <span className={`step ${currentStep === 2 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>2</span>
          </div>

          {currentStep === 1 ? (
            <div className="content">
              {/* Dropdown Producto */}
              <div className="dropdown">
                <h4>Selecciona Producto</h4>
                <div className="presentacion-contenedor">
                  <div className="select-div">
                  <select
  id="producto"
  value={selectedProdServId}
  onChange={handleSelectProduct}
>
  <option value="">Selecciona algo</option>
  {precioData && [...new Set(precioData.map(item => item.IdProdServOK))].map(productId => (
    <option key={productId} value={productId}>
      {productId}
    </option>
  ))}
</select>


                  </div>
                </div>
              </div>

              {/* Dropdown Presentación */}
              <div className="dropdown">
                <h4>Selecciona Presentación</h4>
                <div className="presentacion-contenedor">
                  <div className="select-div">
              

                  <select
  id="presentacion"
  value={selectedPresentaId}
  onChange={handleSelectPresentacion}
>
  <option value="">Selecciona algo</option>
  {precioData && precioData.map(item => (
    <option key={item.IdPresentaOK} value={item.IdPresentaOK}>
      {item.IdPresentaOK}
    </option>
  ))}
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
      type="text"
      id="costo-inicial"
      className="input-precioRec"
      value={precioData?.find(item => item.IdPresentaOK === selectedPresentaId)?.CostoIni || ""}
      onChange={(e) => setNuevoPrecio(e.target.value)} // Hacer modificable
    />
  </div>
</div>

<div className="precio-act">
  <label htmlFor="costo-final">Costo Final</label>
  <div className="input-div">
    <span>$</span>
    <input
      type="text"
      id="costo-final"
      className="input-precioRec"
      value={precioData?.find(item => item.IdPresentaOK === selectedPresentaId)?.CostoFin || ""}
      onChange={(e) => setNuevoPrecio(e.target.value)} // Hacer modificable
    />
  </div>
</div>

<div className="precio-act">
  <label htmlFor="precio-actual">Precio Actual</label>
  <div className="input-div">
    <span>$</span>
    <input
      type="text"
      id="precio-actual"
      className="input-precioRec"
      value={precioData?.find(item => item.IdPresentaOK === selectedPresentaId)?.Precio || ""}
      onChange={(e) => setNuevoPrecio(e.target.value)} // Hacer modificable
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
      value={nuevoPrecio || ""}
      onChange={(e) => setNuevoPrecio(e.target.value)}
    />
  </div>
</div>

              </div>


              
              {/* Detail Row */}
              <h4>Detalle de Registro</h4>
              <div className="resources">
                <div className="resource-columns">
                  {precioData && precioData.find(item => item.IdPresentaOK === selectedPresentaId)?.detail_row?.detail_row_reg.map((reg, index) => (
                    <p key={index}>
                      Registro {index + 1}: Fecha de Registro: {new Date(reg.FechaReg).toLocaleDateString()} - Registrado por: {reg.UsuarioReg}
                    </p>
                  ))}
                </div>
              </div>

            </div>




          ) : (
            <div className="ConfrimacionContainer">
            {/* Confirmación o Paso 2 */}
            <h4>Confirmación</h4>
            <p>¿Estás seguro de que deseas guardar este nuevo precio?</p>
            <div className="imageContainer">
              <img 
                src="https://w7.pngwing.com/pngs/673/47/png-transparent-yellow-emoji-drawing-emoji-discord-meme-android-imgur-thinking-orange-people-internet-thumbnail.png" 
                alt="Emoji de pensamiento" 
                className="emoji"
              />
            </div>
          </div>
          
          )}

          {/* Botones */}
          <div className="actions">
            <button className="go-back-btn" onClick={handleBack}>
              Regresar
            </button>
            <button className="done-btn" onClick={handleNextStep}>
              {currentStep === 1 ? 'Siguiente' : 'Guardar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpPrecios;
