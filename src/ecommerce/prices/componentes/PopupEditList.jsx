import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { updateListaPrecios } from '../../../actions/listasTablasGeneralActions'; // Ruta de tu acción
import '../assets/PopUpEditList.css';

const PopupEditList = ({ isVisible, setIsVisible, productToEdit, setProductToEdit }) => {
  const dispatch = useDispatch();

  // Estados para los valores del formulario
  const [desLista, setDesLista] = useState('');
  const [fechaExpiraIni, setFechaExpiraIni] = useState('');
  const [fechaExpiraFin, setFechaExpiraFin] = useState('');

  // Efecto para cargar los datos del producto a editar
  useEffect(() => {
    if (productToEdit) {
      setDesLista(productToEdit.DesLista || '');
      setFechaExpiraIni(productToEdit.FechaExpiraIni || '');
      setFechaExpiraFin(productToEdit.FechaExpiraFin || '');
    }
  }, [productToEdit]);

  // Manejo del botón "Guardar Cambios"
  const handleSave = async () => {
    if (!desLista || !fechaExpiraIni || !fechaExpiraFin) {
      Swal.fire('Error', 'Todos los campos son obligatorios.', 'error');
      return;
    }

    const updatedData = {
      idListaOK: productToEdit.IdListaOK, // ID único del producto
      desLista,
      fechaExpiraIni,
      fechaExpiraFin,
    };

    try {
      // Ejecuta el dispatch para actualizar la lista de precios
      await dispatch(updateListaPrecios(updatedData));

      // Muestra un mensaje de éxito
      Swal.fire('Éxito', 'Lista de precios actualizada correctamente.', 'success');
      setIsVisible(false); // Cierra el popup
    } catch (error) {
      // Maneja errores durante la actualización
      Swal.fire('Error', 'No se pudo actualizar la lista de precios.', 'error');
      console.error('Error al guardar los cambios:', error);
    }
  };

  // Renderiza el componente
  return (
    <div className={`popup-editar-lista ${isVisible ? 'show' : ''}`}>
      <div className="popup-editar-lista-content">
      
      <h4>
  Editar Lista de Precios de {productToEdit?.IdListaOK || 'Sin selección'}
</h4>

        {productToEdit ? (
          <div>
            <div className="form-group">
              <label htmlFor="desLista">Descripción de la lista:</label>
              <input
                id="desLista"
                type="text"
                value={desLista}
                onChange={(e) => setDesLista(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fechaExpiraIni">Fecha Expira Inicio:</label>
              <input
                id="fechaExpiraIni"
                type="date"
                value={fechaExpiraIni}
                onChange={(e) => setFechaExpiraIni(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fechaExpiraFin">Fecha Expira Fin:</label>
              <input
                id="fechaExpiraFin"
                type="date"
                value={fechaExpiraFin}
                onChange={(e) => setFechaExpiraFin(e.target.value)}
              />
            </div>
            <div className="popup-buttons">
            <button className="btn-close" onClick={() => setIsVisible(false)}>
                Cerrar
              </button>
              <button className="btn-save" onClick={handleSave}>
                Guardar Cambios
              </button>
             
            </div>
          </div>
        ) : (
          <p>No se seleccionó ningún producto para editar.</p>
        )}
      </div>
    </div>
  );
};

export default PopupEditList;
