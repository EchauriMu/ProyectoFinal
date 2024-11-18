import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Agregamos useSelector
import '../assets/PopUpAggList.css';
import { crearListaPrecios } from '../../../actions/listasTablasGeneralActions';

const PopUpAgregarLista = ({ isAddListPopupVisible, setIsAddListPopupVisible, sessionUser }) => {
  const [formData, setFormData] = useState({
    IdInstitutoOK: '',
    IdListaOK: '',
    IdListaBK: '',
    DesLista: '',
    FechaExpiraIni: '',
    FechaExpiraFin: '',
    IdTipoListaOK: '',
    IdTipoGeneraListaOK: '',
    precios: [
      {
        IdProdServOK: '',
        IdPresentaOK: '',
        CostoIni: '',
        CostoFin: '',
        Precio: '',
        detail_row: {
          Activo: 'S',
          Borrado: 'N',
          detail_row_reg: [
            {
              FechaReg: new Date().toISOString(),
              UsuarioReg: sessionUser || 'defaultUser',
            },
          ],
        },
      },
    ],
    roles: ['admin', 'gestor_precios'],
    negocios: [],
    alertas: [],
    historial: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePrecioChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPrecios = [...formData.precios];
    updatedPrecios[index] = { ...updatedPrecios[index], [name]: value };
    setFormData({
      ...formData,
      precios: updatedPrecios,
    });
  };

  const handleAddPrecio = () => {
    setFormData({
      ...formData,
      precios: [
        ...formData.precios,
        {
          IdProdServOK: '',
          IdPresentaOK: '',
          CostoIni: '',
          CostoFin: '',
          Precio: '',
          detail_row: {
            Activo: 'S',
            Borrado: 'N',
            detail_row_reg: [
              {
                FechaReg: new Date().toISOString(),
                UsuarioReg: sessionUser || 'defaultUser',
              },
            ],
          },
        },
      ],
    });
  };

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.crearListaPrecios);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(crearListaPrecios(formData));
    console.log('Datos enviados:', formData);
    setIsAddListPopupVisible(false);
  };

  const handleDeletePrecio = (index) => {
    const updatedPrecios = formData.precios.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      precios: updatedPrecios,
    });
  };



  return (
    <div className={`popup-agregar-lista ${isAddListPopupVisible ? 'show' : ''}`}>
  <div className="popup-agregar-lista-content">
    <h4>Agregar Nueva Lista de Precios</h4>
    <form onSubmit={handleSubmit}>
  <label>ID Institución:</label>
  <input
    type="text"
    name="IdInstitutoOK"
    value={formData.IdInstitutoOK}
    onChange={handleInputChange}
    required
  />

  <label>ID Lista:</label>
  <input
    type="text"
    name="IdListaOK"
    value={formData.IdListaOK}
    onChange={handleInputChange}
    required
  />

  <label>ID Lista BK:</label> {/* Nuevo campo */}
  <input
    type="text"
    name="IdListaBK"
    value={formData.IdListaBK}
    onChange={handleInputChange}
    required
  />

  <label>Descripción de la Lista:</label>
  <input
    type="text"
    name="DesLista"
    value={formData.DesLista}
    onChange={handleInputChange}
    required
  />

  <label>Fecha Expira Inicio:</label>
  <input
    type="datetime-local"
    name="FechaExpiraIni"
    value={formData.FechaExpiraIni}
    onChange={handleInputChange}
    required
  />

  <label>Fecha Expira Fin:</label>
  <input
    type="datetime-local"
    name="FechaExpiraFin"
    value={formData.FechaExpiraFin}
    onChange={handleInputChange}
    required
  />

  <label>ID Tipo Lista OK:</label> {/* Nuevo campo */}
  <input
    type="text"
    name="IdTipoListaOK"
    value={formData.IdTipoListaOK}
    onChange={handleInputChange}
    required
  />

  <label>ID Tipo Genera Lista OK:</label> {/* Nuevo campo */}
  <input
    type="text"
    name="IdTipoGeneraListaOK"
    value={formData.IdTipoGeneraListaOK}
    onChange={handleInputChange}
    required
  />

  {/* Precios */}
  <button type="button" onClick={handleAddPrecio}>Agregar Precio</button>
  <div>
    <label>Precios:</label>
    <div className="precios-container" style={{ overflowX: 'auto' }}>
      {formData.precios.map((precio, index) => (
        <div key={index} className="precio-item">
          <h4>Precio {index + 1}</h4>
          <label>ID Producto:</label>
          <input
            type="text"
            name="IdProdServOK"
            value={precio.IdProdServOK}
            onChange={(e) => handlePrecioChange(index, e)}
            required
          />

          <label>ID Presentación:</label>
          <input
            type="text"
            name="IdPresentaOK"
            value={precio.IdPresentaOK}
            onChange={(e) => handlePrecioChange(index, e)}
            required
          />

          <label>Costo Inicial:</label>
          <input
            type="number"
            name="CostoIni"
            value={precio.CostoIni}
            onChange={(e) => handlePrecioChange(index, e)}
            required
          />

          <label>Costo Final:</label>
          <input
            type="number"
            name="CostoFin"
            value={precio.CostoFin}
            onChange={(e) => handlePrecioChange(index, e)}
            required
          />

          <label>Precio:</label>
          <input
            type="number"
            name="Precio"
            value={precio.Precio}
            onChange={(e) => handlePrecioChange(index, e)}
            required
          />
          <button type="button" onClick={() => handleDeletePrecio(index)}>Eliminar Precio</button>
        </div>
      ))}
    </div>
  </div>

  {/* Contenedor de botones */}
  <div className="button-containerAddlist">
    <button type="button" className="regresar" onClick={() => setIsAddListPopupVisible(false)}>
      Regresar
    </button>
    <button type="submit">Guardar Lista</button>
  </div>
</form>
  </div>
</div>

  );
};

export default PopUpAgregarLista;
