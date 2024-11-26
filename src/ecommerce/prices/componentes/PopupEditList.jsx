import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { updateListaPrecios } from '../../../actions/listasTablasGeneralActions'; // Ruta de tu acción
import '../assets/PopUpEditList.css';

const PopupEditList = ({ isVisible, setIsVisible, productToEdit, setProductToEdit }) => {
  const dispatch = useDispatch();

  // Estados del formulario
  const [desLista, setDesLista] = useState('');
  const [fechaExpiraIni, setFechaExpiraIni] = useState('');
  const [fechaExpiraFin, setFechaExpiraFin] = useState('');
  const [estado, setEstado] = useState('Activo'); // Estado para manejar Activo/Inactivo

  // Cargar datos del producto a editar
  useEffect(() => {
    if (productToEdit) {
      setDesLista(productToEdit.DesLista || '');
      setFechaExpiraIni(productToEdit.FechaExpiraIni || '');
      setFechaExpiraFin(productToEdit.FechaExpiraFin || '');
      setEstado(
        productToEdit.detail_row?.Activo === 'S' && productToEdit.detail_row?.Borrado === 'N'
          ? 'Activo'
          : 'Inactivo'
      );
    }
  }, [productToEdit]);

  // Guardar cambios
  const handleSave = async (e) => {
    e.preventDefault();

    if (!desLista || !fechaExpiraIni || !fechaExpiraFin) {
      Swal.fire('Error', 'Todos los campos son obligatorios.', 'error');
      return;
    }

    // Preparar los datos para la actualización
    const usuarioReg = sessionStorage.getItem('usuario') || 'UsuarioDesconocido';
    const fechaReg = new Date().toISOString();
    const updatedData = {
      idListaOK: productToEdit.IdListaOK,
      desLista,
      fechaExpiraIni: new Date(fechaExpiraIni).toISOString(),
      fechaExpiraFin: new Date(fechaExpiraFin).toISOString(),
      detail_row: {
        Activo: estado === 'Activo' ? 'S' : 'N',
        Borrado: estado === 'Activo' ? 'N' : 'S',
      },
      detail_row_reg: [
        {
          FechaReg: fechaReg,
          UsuarioReg: usuarioReg,
        },
      ],
    };

    // Mostrar mensaje de confirmación
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres guardar los cambios en esta lista de precios?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Despachar la acción de Redux
        dispatch(updateListaPrecios(updatedData))
          .then(() => {
            // Mostrar éxito
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Lista de precios actualizada correctamente!',
              showConfirmButton: false,
              timer: 1500,
            });
            setIsVisible(false); // Cerrar el popup
          })
          .catch((err) => {
            console.error('Error al guardar:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error al guardar',
              text: err.message || 'Hubo un problema al actualizar la lista de precios.',
            });
          });
      } else {
        Swal.fire('Cancelado', 'No se realizaron cambios.', 'info');
      }
    });
  };

  return (
    <div className={`popup-editar-lista ${isVisible ? 'show' : ''}`}>
      <div className="popup-editar-lista-content">
        <h4>
          Editar Lista de Precios de {productToEdit?.IdListaOK ? productToEdit.IdListaOK : 'Sin selección'}
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
                type="datetime-local"
                value={fechaExpiraIni}
                onChange={(e) => setFechaExpiraIni(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fechaExpiraFin">Fecha Expira Fin:</label>
              <input
                id="fechaExpiraFin"
                type="datetime-local"
                value={fechaExpiraFin}
                onChange={(e) => setFechaExpiraFin(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="estado">Estado:</label>
              <select
                id="estado"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
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
