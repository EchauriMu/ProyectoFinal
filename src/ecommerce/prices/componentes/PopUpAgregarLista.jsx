import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import '../assets/PopUpAggList.css';
const PopUpAgregarLista = ({ isAddListPopupVisible, setIsAddListPopupVisible }) => {
  const [formData, setFormData] = useState({
    IdInstitutoOK: '',
    IdListaOK: '',
    IdListaBK: '',
    DesLista: '',
    FechaExpiraIni: '',
    FechaExpiraFin: '',
    IdTipoListaOK: '',
    IdTipoGeneraListaOK: '',
    precios: [{
      IdProdServOK: '',
      IdPresentaOK: '',
      CostoIni: '',
      CostoFin: '',
      Precio: ''
    }],
    roles: ['admin', 'gestor_precios'],
    negocios: [],
    promociones: [],
    alertas: [],
    historial: []
  });

  // Actualizar datos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Cambiar las fechas
  const handleFechaChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData); // Solo loguea los datos por ahora
    setIsAddListPopupVisible(false); // Cerrar el popup después de enviar
  };

  return (
    <div className={`popup-agregar-lista ${isAddListPopupVisible ? 'show' : ''}`}>
      <div className="popup-agregar-lista-content">
        <span className="close" onClick={() => setIsAddListPopupVisible(false)}>&times;</span>
        <h3>Agregar Nueva Lista de Precios</h3>
        <form onSubmit={handleSubmit}>
          <label>ID Institución:</label>
          <input
            type="text"
            name="IdInstitutoOK"
            value={formData.IdInstitutoOK}
            onChange={handleInputChange}
          />

          <label>ID Lista:</label>
          <input
            type="text"
            name="IdListaOK"
            value={formData.IdListaOK}
            onChange={handleInputChange}
          />

          <label>ID Lista BK:</label>
          <input
            type="text"
            name="IdListaBK"
            value={formData.IdListaBK}
            onChange={handleInputChange}
          />

          <label>Descripción de la Lista:</label>
          <input
            type="text"
            name="DesLista"
            value={formData.DesLista}
            onChange={handleInputChange}
          />

          <label>Fecha Expira Inicio:</label>
          <input
            type="datetime-local"
            name="FechaExpiraIni"
            value={formData.FechaExpiraIni}
            onChange={handleFechaChange}
          />

          <label>Fecha Expira Fin:</label>
          <input
            type="datetime-local"
            name="FechaExpiraFin"
            value={formData.FechaExpiraFin}
            onChange={handleFechaChange}
          />

          <h4>Precios</h4>
          <label>ID Producto/Servicio:</label>
          <input
            type="text"
            name="IdProdServOK"
            value={formData.precios[0].IdProdServOK}
            onChange={(e) => setFormData({
              ...formData,
              precios: [{
                ...formData.precios[0],
                [e.target.name]: e.target.value
              }]
            })}
          />

          <label>ID Presentación:</label>
          <input
            type="text"
            name="IdPresentaOK"
            value={formData.precios[0].IdPresentaOK}
            onChange={(e) => setFormData({
              ...formData,
              precios: [{
                ...formData.precios[0],
                [e.target.name]: e.target.value
              }]
            })}
          />

          <label>Costo Inicial:</label>
          <input
            type="number"
            name="CostoIni"
            value={formData.precios[0].CostoIni}
            onChange={(e) => setFormData({
              ...formData,
              precios: [{
                ...formData.precios[0],
                [e.target.name]: e.target.value
              }]
            })}
          />

          <label>Costo Final:</label>
          <input
            type="number"
            name="CostoFin"
            value={formData.precios[0].CostoFin}
            onChange={(e) => setFormData({
              ...formData,
              precios: [{
                ...formData.precios[0],
                [e.target.name]: e.target.value
              }]
            })}
          />

          <label>Precio:</label>
          <input
            type="number"
            name="Precio"
            value={formData.precios[0].Precio}
            onChange={(e) => setFormData({
              ...formData,
              precios: [{
                ...formData.precios[0],
                [e.target.name]: e.target.value
              }]
            })}
          />

          <button type="submit">Guardar</button>
        </form>
      </div>
    </div>
  );
};

export default PopUpAgregarLista;