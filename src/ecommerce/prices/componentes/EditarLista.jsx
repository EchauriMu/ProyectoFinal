import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { updatePrecioAction } from '../../../actions/listasTablasGeneralActions';

const EditarLista = ({ isEditVisible, setIsEditVisible, selectedProduct }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    IdInstitutoOK: '',
    IdListaOK: '',
    IdListaBK: '',
    FechaExpiraIni: '',
    FechaExpiraFin: ''
  });

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        IdInstitutoOK: selectedProduct.IdInstitutoOK,
        IdListaOK: selectedProduct.IdListaOK,
        IdListaBK: selectedProduct.IdListaBK,
        FechaExpiraIni: selectedProduct.FechaExpiraIni,
        FechaExpiraFin: selectedProduct.FechaExpiraFin
      });
    }
  }, [selectedProduct]);

  // Manejador de cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Función para enviar los cambios (PUT)
  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: '¿Estás seguro de que deseas actualizar esta lista?',
      text: '¡Este cambio es irreversible!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actualizar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Llamar a la acción para actualizar el precio
        dispatch(updatePrecioAction(formData));
        setIsEditVisible(false); // Cerrar el popup
        Swal.fire('Actualizado!', 'La lista ha sido actualizada.', 'success');
      }
    });
  };

  if (!isEditVisible || !selectedProduct) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Editar Lista</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="IdInstitutoOK">ID Instituto:</label>
            <input
              type="text"
              id="IdInstitutoOK"
              name="IdInstitutoOK"
              value={formData.IdInstitutoOK}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="IdListaOK">ID Lista:</label>
            <input
              type="text"
              id="IdListaOK"
              name="IdListaOK"
              value={formData.IdListaOK}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="IdListaBK">Descripción Lista:</label>
            <input
              type="text"
              id="IdListaBK"
              name="IdListaBK"
              value={formData.IdListaBK}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="FechaExpiraIni">Fecha Expira Inicio:</label>
            <input
              type="date"
              id="FechaExpiraIni"
              name="FechaExpiraIni"
              value={formData.FechaExpiraIni}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="FechaExpiraFin">Fecha Expira Fin:</label>
            <input
              type="date"
              id="FechaExpiraFin"
              name="FechaExpiraFin"
              value={formData.FechaExpiraFin}
              onChange={handleChange}
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="submit-btn">Guardar Cambios</button>
            <button type="button" className="cancel-btn" onClick={() => setIsEditVisible(false)}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarLista;
