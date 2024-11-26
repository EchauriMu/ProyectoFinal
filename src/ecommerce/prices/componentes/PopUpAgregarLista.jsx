import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
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
    precios: [], // Lista de precios vacía
    negocios: [],
    alertas: [],
    historial: [],
    notas:[],
    promociones:[]
  });

  // Obtener usuario y fecha de registro desde sessionStorage
  const usuarioReg = sessionStorage.getItem('usuario') || 'UsuarioDesconocido';
  const fechaReg = new Date().toISOString(); // Fecha actual en formato ISO

  // Detalle para la lista y los precios
  const detailRow = {
    Activo: 'S',
    Borrado: 'N',
    detail_row_reg: [
      {
        FechaReg: fechaReg, // Pasa la fecha como cadena ISO
        UsuarioReg: usuarioReg,
      },
    ],
  };
  

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.crearListaPrecios);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Insertar el detail_row en la lista principal
    const formDataConDetail = {
      ...formData,
      detail_row: { ...detailRow }, // Insertar el detail_row en la lista principal
    };

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres guardar esta lista de precios?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(crearListaPrecios(formDataConDetail))
          .then(() => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Lista de precios creada correctamente!',
              showConfirmButton: false,
              timer: 1500,
            });
            setIsAddListPopupVisible(false); // Cerrar el popup después de éxito
          })
          .catch((err) => {
            console.error('Error al enviar:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error al guardar',
              text: err.message || 'Hubo un problema al crear la lista de precios.',
            });
          });
      }
    });
  };

  return (
    <div className={`popup-agregar-lista ${isAddListPopupVisible ? 'show' : ''}`}>
      <div className="popup-agregar-lista-content">
        <h4>Agregar Nueva Lista de Precios</h4>
        <form className="FormaggList" onSubmit={handleSubmit}>
          <label>ID Institución:</label>
          <input
            type="text"
            name="IdInstitutoOK"
            value={formData.IdInstitutoOK}
            onChange={(e) => setFormData({ ...formData, IdInstitutoOK: e.target.value })}
            required
          />
          <label>ID Lista:</label>
          <input
            type="text"
            name="IdListaOK"
            value={formData.IdListaOK}
            onChange={(e) => setFormData({ ...formData, IdListaOK: e.target.value })}
            required
          />
          <label>ID Lista BK:</label>
          <input
            type="text"
            name="IdListaBK"
            value={formData.IdListaBK}
            onChange={(e) => setFormData({ ...formData, IdListaBK: e.target.value })}
            required
          />
          <label>Descripción de la Lista:</label>
          <input
            type="text"
            name="DesLista"
            value={formData.DesLista}
            onChange={(e) => setFormData({ ...formData, DesLista: e.target.value })}
            required
          />
          <label>Fecha Expira Inicio:</label>
          <input
            type="datetime-local"
            name="FechaExpiraIni"
            value={formData.FechaExpiraIni}
            onChange={(e) => setFormData({ ...formData, FechaExpiraIni: e.target.value })}
            required
          />
          <label>Fecha Expira Fin:</label>
          <input
            type="datetime-local"
            name="FechaExpiraFin"
            value={formData.FechaExpiraFin}
            onChange={(e) => setFormData({ ...formData, FechaExpiraFin: e.target.value })}
            required
          />
          <label>ID Tipo Lista OK:</label>
          <input
            type="text"
            name="IdTipoListaOK"
            value={formData.IdTipoListaOK}
            onChange={(e) => setFormData({ ...formData, IdTipoListaOK: e.target.value })}
            required
          />
          <label>ID Tipo Genera Lista OK:</label>
          <input
            type="text"
            name="IdTipoGeneraListaOK"
            value={formData.IdTipoGeneraListaOK}
            onChange={(e) => setFormData({ ...formData, IdTipoGeneraListaOK: e.target.value })}
            required
          />

          {/* No es necesario el formulario de precios si no los vas a manejar */}
          <div className="button-containerAddlist">
            <span type="" className="regresar" onClick={() => setIsAddListPopupVisible(false)}>
              Regresar
            </span>
            <button type="submit">Guardar Lista</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopUpAgregarLista;
