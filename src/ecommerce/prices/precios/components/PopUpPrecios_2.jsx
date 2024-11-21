import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Para validaciones opcionales
import { useContexto } from '../../componentes/PreciosProvider';
import SeleccionadorActivo from './SeleccionadorActivo';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';

import { putPrecioById, postPrecio, deletePresentacionAction } from '../../../../actions/PopUpPreciosGeneralActions';
import { fetchPrecioById } from '../../../../actions/listasTablasGeneralActions';

import '../assets/PopupPrecios.css';
import '../assets/Precios.css';
import '../assets/Querys.css';

const PopUpPrecios_2 = ({ isVisible, product, onClose }) => {
  const { userName, dispatch } = useContexto();
  const { precioData, loading, error } = useSelector((state) => state.precio);
  const { putLoading, postLoading, deleteLoading } = useSelector((state) => state);

  const [showNewPresentacionInput, setShowNewPresentacionInput] = useState(false);
  const dispatchAction = useDispatch();

  // Inicialización de Formik
  const formik = useFormik({
    initialValues: {
      IdProdServOK :  '',
      selectedPresentaId: '',
      IdPresentaOK: '',
      IdTipoFormulaOK: '',
      Formula: '',
      CostoIni: '',
      CostoFin: '',
      Precio: '',
    },
    onSubmit: (values) => {
      if (showNewPresentacionInput) {
        handleNuevoPrecio(values);
      } else {
        handleActualizarPrecio(values);
      }
    },
  });

  useEffect(() => {
    if (product?.IdListaOK) {
      dispatchAction(fetchPrecioById(product.IdListaOK));
    }
  }, [product, dispatchAction]);

  useEffect(() => {
    if (precioData.length > 0 && product?.IdProdServOK) {
      const selectedPrices = precioData.filter((item) => item.IdProdServOK === product.IdProdServOK);
      if (selectedPrices.length > 0) {
        const [firstPrice] = selectedPrices;
        formik.setValues({
          selectedPresentaId: firstPrice.IdPresentaOK,
          IdTipoFormulaOK: firstPrice.IdTipoFormulaOK || '',
          Formula: firstPrice.Formula || '',
          CostoIni: firstPrice.CostoIni || '',
          CostoFin: firstPrice.CostoFin || '',
          Precio: firstPrice.Precio || '',
        });
      }
    }
  }, [precioData, product]);

  const handleActualizarPrecio = (values) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres actualizar este precio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedPrecioData = {
          ...values,
          detail_row: {
            Activo: values.activo,
            Borrado: values.borrado,
            detail_row_reg: [{ FechaReg: new Date(), UsuarioReg: userName }],
          },
        };
        dispatchAction(putPrecioById(product.IdListaOK, updatedPrecioData));
        Swal.fire('¡Actualizado!', 'El precio ha sido actualizado.', 'success');
      }
    });
  };

  const handleNuevoPrecio = (values) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres agregar este nuevo precio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, agregar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const newPrecioData = {
          IdProdServOK: product.IdListaOK,
          ...values,
          detail_row: {
            Activo: values.activo,
            Borrado: values.borrado,
            detail_row_reg: [{ FechaReg: new Date(), UsuarioReg: userName }],
          },
        };
        dispatchAction(postPrecio(product.IdListaOK, newPrecioData));
        setShowNewPresentacionInput(false);
        Swal.fire('¡Creado!', 'El nuevo precio ha sido agregado.', 'success');
      }
    });
  };

  if (!isVisible || !product) return null;

  return (
    <div className="popup-position">
      <div className="popup-container">
        
        {loading && <div>Cargando...</div>}
        {error && <div>Error al cargar los datos: {error}</div>}
        <form onSubmit={formik.handleSubmit} >
        <div className="header">
          <h2>Añadir/Modificar/Eliminar SubDoc Precios de:</h2>
          <span>ID Lista: {product.IdListaOK}</span>
        </div>
        {loading && <div>Cargando...</div>}
      {error && <div>Error al cargar los datos: {error}</div>}
              {/* Estados para acciones (POST, PUT, DELETE) */}


      {/* Contenido principal */}
        <div className="content">
          <div className="dropdown">
            <h4>Selecciona Presentación</h4>
            <div className="presentacion-contenedor">
              <select
                id="selectedPresentaId"
                name="selectedPresentaId"
                value={formik.values.selectedPresentaId}
                onChange={formik.handleChange}
              >
                <option value="">Selecciona presentación</option>
                {precioData?.map((item) => (
                  <option key={item.IdPresentaOK} value={item.IdPresentaOK}>
                    {item.IdPresentaOK}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="dropdown">
            <h4>Nueva Presentación</h4>
            <div className="presentacion-contenedor">
            {showNewPresentacionInput ? (
              <div>
                <input
                  id="IdPresentaOK"
                  name="IdPresentaOK"
                  type="text"
                  value={formik.values.IdPresentaOK}
                  onChange={formik.handleChange}
                />
                <button type="button" onClick={() => setShowNewPresentacionInput(false)}>
                  Cancelar
                </button>
                <button type="submit">Confirmar</button>
              </div>
            ) : (
              <span
                className="AggbtnPop"
                title="Agregar una lista nueva"
                onClick={() => setShowNewPresentacionInput(true)}
              >
                Añadir Presentación
              </span>
            )}
          </div>
          <h4>Selecciona un nuevo precio</h4>
          <div className="button-group">
            {['CostoIni', 'CostoFin', 'nuevoPrecio'].map((field) => (
              <div key={field} className="precio-act">
                <label htmlFor={field}>{field}</label>
                <input
                  id={field}
                  name={field}
                  type="number"
                  value={formik.values[field]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched[field] && formik.errors[field] && (
                  <div>{formik.errors[field]}</div>
                )}
              </div>
            ))}
          </div>
          <div className="button-group">
            {['IdTipoFormulaOK', 'Formula',].map((field) => (
              <div key={field} className="precio-act">
                <label htmlFor={field}>{field}</label>
                <input
                  id={field}
                  name={field}
                  type="string"
                  value={formik.values[field]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched[field] && formik.errors[field] && (
                  <div>{formik.errors[field]}</div>
                )}
              </div>
            ))}
          </div>
          <SeleccionadorActivo />
          <button type="submit">Actualizar</button>
          <button onClick={onClose}>Regresar</button>
        
        </div>
        </div>
        </form>
      </div>
    </div>
  );
};

export default PopUpPrecios_2;
