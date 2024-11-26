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
  const handleSave = async () => {
    if (!desLista || !fechaExpiraIni || !fechaExpiraFin) {
      Swal.fire('Error', 'Todos los campos son obligatorios.', 'error');
      return;
    }

    // Obtener usuario y fecha de registro desde sessionStorage
    const usuarioReg = sessionStorage.getItem('usuario') || 'UsuarioDesconocido'; // Valor predeterminado si no existe
    const fechaReg = new Date().toISOString(); // Fecha actual en formato ISO

    // Formar el cuerpo de solicitud de acuerdo al formato esperado por la API
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

    try {
      // Enviar los datos a través del servicio Redux
      dispatch(updateListaPrecios(updatedData));

      // Mostrar mensaje de éxito
      Swal.fire('Éxito', 'Lista de precios actualizada correctamente.', 'success');
      setIsVisible(false);
    } catch (error) {
      Swal.fire('Error', 'No se pudo actualizar la lista de precios.', 'error');
      console.error('Error al guardar los cambios:', error);
    }
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
