
import React, { useState, useEffect } from 'react';
import { useContexto } from '../../componentes/PreciosProvider';
import SeleccionadorActivo from './SeleccionadorActivo';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';

import { 
  putPrecioById, 
  postPrecio, 
  deletePresentacionAction 
} from '../../../../actions/PopUpPreciosGeneralActions';

import {fetchPrecioById} from '../../../../actions/listasTablasGeneralActions';

import '../assets/PopupPrecios.css';
import '../assets/Precios.css';
import '../assets/Querys.css';

const PopUpPrecios = ({ isVisible, product, onClose }) => {
  // Contexto
  const { 
    nuevoPrecio, setNuevoPrecio,
    selectedProdServId, setSelectedProdServId,
    selectedPresentaId, setSelectedPresentaId,
    idPresentaOK, setIdPresentaOK,
    idTipoFormulaOK, setIdTipoFormulaOK,
    formula, setFormula,
    costoIni, setCostoIni,
    costoFin, setCostoFin,
    userName, 
    activo, setActivo,
    borrado, setBorrado,
    dispatch 
  } = useContexto();

  // Estado global del store
  const { precioData, loading, error } = useSelector((state) => state.precio);
  const { putLoading, putError } = useSelector((state) => state.putPrecio);
  const { postLoading, postError } = useSelector((state) => state.postPrecio);
  const { deleteLoading, deleteError } = useSelector((state) => state.deletePresentacion);

  // Estado local
  const [showNewPresentacionInput, setShowNewPresentacionInput] = useState(false);

  // Efectos
  useEffect(() => {
    if (product?.IdListaOK) {
      dispatch(fetchPrecioById(product.IdListaOK));
    }
  }, [product, dispatch]);

  useEffect(() => {
    if (precioData.length > 0 && product?.IdProdServOK) {
      const selectedPrices = precioData.filter(item => item.IdProdServOK === product.IdProdServOK);
      if (selectedPrices.length > 0) {
        const [firstPrice] = selectedPrices;
        setSelectedProdServId(firstPrice.IdProdServOK);
        setSelectedPresentaId(firstPrice.IdPresentaOK);
        setNuevoPrecio(firstPrice.Precio);
      }
    }
  }, [precioData, product]);

  useEffect(() => {
    if (precioData && selectedPresentaId) {
      const selected = precioData.find(item => item.IdPresentaOK === selectedPresentaId);
      if (selected) {
        setIdTipoFormulaOK(selected.IdTipoFormulaOK || "");
        setFormula(selected.Formula || "");
        setCostoIni(selected.CostoIni || "");
        setCostoFin(selected.CostoFin || "");
        setNuevoPrecio(selected.Precio || "");
        setActivo(selected.detail_row?.Activo || "S");
        setBorrado(selected.detail_row?.Borrado || "N");
      }
    }
  }, [precioData, selectedPresentaId]);

  // Handlers
  const handleActualizarPrecio = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres actualizar este precio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (result.isConfirmed) {
        const updatedPrecioData = {
          IdProdServOK: product.IdListaOK,
          IdPresentaOK: selectedPresentaId,
          IdTipoFormulaOK: idTipoFormulaOK,
          Formula: formula,
          CostoIni: costoIni,
          CostoFin: costoFin,
          Precio: nuevoPrecio,
          detail_row: {
            Activo: activo,
            Borrado: borrado,
            detail_row_reg: [{ FechaReg: new Date(), UsuarioReg: userName }]
          }
        };
        dispatch(putPrecioById(product.IdListaOK, updatedPrecioData));
        Swal.fire('¡Actualizado!', 'El precio ha sido actualizado.', 'success');
      }
    });
  };

  const handleNuevoPrecio = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres agregar este nuevo precio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, agregar',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (result.isConfirmed) {
        const newPrecioData = {
          IdProdServOK: product.IdListaOK,
          IdPresentaOK: idPresentaOK,
          IdTipoFormulaOK: idTipoFormulaOK,
          Formula: formula,
          CostoIni: costoIni,
          CostoFin: costoFin,
          Precio: nuevoPrecio,
          detail_row: {
            Activo: activo,
            Borrado: borrado,
            detail_row_reg: [{ FechaReg: new Date(), UsuarioReg: userName }]
          }
        };
        dispatch(postPrecio(product.IdListaOK, newPrecioData));
        setIdPresentaOK("");
        Swal.fire('¡Creado!', 'El nuevo precio ha sido agregado.', 'success');
      }
    });
  };

  const handleDelete = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Este precio se eliminará!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(deletePresentacionAction(product.IdListaOK, selectedPresentaId));
        Swal.fire('¡Eliminado!', 'El precio ha sido eliminado.', 'success');
      }
    });
  };

  const handleSelectPresentacion = (e) => {
    setSelectedPresentaId(e.target.value);
    const selected = precioData.find(item => item.IdPresentaOK === e.target.value);
    if (selected) {
      setNuevoPrecio(selected.Precio);
      setCostoIni(selected.CostoIni);
    }
  };

  const handleBack = () => {
    dispatch(fetchPrecioById(product.IdListaOK));
    onClose();
  };

  if (!isVisible || !product) return null;

  // Render
  return (
<div className="popup-position">
  {/* Header */}
  

  <div className="popup-container">
    {/* Contenedor principal */}
    
    <div className="container">
      {/* Estado de carga y errores */}
      <div className="header">
        <h2>Añadir/Modificar/Eliminar SubDoc Precios de:</h2>
        <span>ID Lista: {product.IdListaOK}</span>
      </div>
      {loading && <div>Cargando...</div>}
      {error && <div>Error al cargar los datos: {error}</div>}

      {/* Estados para acciones (POST, PUT, DELETE) */}
      <div>
        {putLoading && <p>Cargando actualización...</p>}
        {putError && <p>Error en actualización: {putError}</p>}
        {postLoading && <p>Cargando creación...</p>}
        {postError && <p>Error en creación: {postError}</p>}
        {deleteLoading && <p>Cargando eliminación...</p>}
        {deleteError && <p>Error en eliminación: {deleteError}</p>}
      </div>

      {/* Contenido principal */}
      <div className="content">
        {/* Selección de Presentación */}
        <div className="dropdown">
          <h4>Selecciona Presentación</h4>
          <div className="presentacion-contenedor">
            <div className="select-div">
              <select
                id="presentacion"
                value={selectedPresentaId}
                onChange={handleSelectPresentacion}
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
        </div>

        {/* Nueva Presentación */}
        <div className="dropdown">
          
          <div className="presentacion-contenedor" >
            {!showNewPresentacionInput ? (
              <span
                className="AggbtnPop"
                title="Agregar una lista nueva"
                onClick={() => setShowNewPresentacionInput(true)}
              >
                Añadir Presentación
              </span>
            ) : (
              <div className="button-group">
                <div className="formula-id">
                <label >Nueva presentación</label>
                <div className="input-div">
                <input
                  type="text"
                  className="input-precioRec"
                  value={idPresentaOK || ""}
                  onChange={(e) => setIdPresentaOK(e.target.value)}
                />
              </div>
            </div>
                
                <span
                  className="actualizarPrecio"
                  onClick={() => {
                    handleNuevoPrecio();
                    setShowNewPresentacionInput(false);
                  }}
                >
                  Confirmar
                </span>
                <span
                  className="EliminarPrecio"
                  onClick={() => setShowNewPresentacionInput(false)}
                >
                  Cancelar
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Inputs de precios */}
        <div className="button-group">
          {[
            { id: "costo-inicial", label: "Costo Inicial", value: costoIni, setter: setCostoIni },
            { id: "costo-final", label: "Costo Final", value: costoFin, setter: setCostoFin },
            { id: "precio-actual", label: "Precio", value: nuevoPrecio, setter: setNuevoPrecio },
          ].map(({ id, label, value, setter }) => (
            <div className="precio-act" key={id}>
              <label htmlFor={id}>{label}</label>
              <div className="input-div">
                <span>$</span>
                <input
                  type="number"
                  id={id}
                  className="input-precioRec"
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Formulas */}
        <div className="button-group">
          {[
            { id: "nuevo-formula-id", label: "Formula ID", value: idTipoFormulaOK, setter: setIdTipoFormulaOK },
            { id: "nuevo-formula", label: "Formula", value: formula, setter: setFormula },
          ].map(({ id, label, value, setter }) => (
            <div className="formula-id" key={id}>
              <label htmlFor={id}>{label}</label>
              <div className="input-div">
                <input
                  type="text"
                  id={id}
                  className="input-precioRec"
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                />
              </div>
            </div>
          ))}
          <SeleccionadorActivo />
          <span
            className="actualizarPrecio"
            title="Recargar tabla"
            onClick={handleActualizarPrecio}
          >
            Actualizar
          </span>
          <span className="EliminarPrecio" onClick={handleDelete}>
            Eliminar Precio
          </span>
        </div>

        {/* Detalle de registro */}
        <h4>Detalle de Registro</h4>
        <div className="resources">
          <div className="resource-columns">
            {precioData &&
              precioData
                .find((item) => item.IdPresentaOK === selectedPresentaId)
                ?.detail_row?.detail_row_reg.map((reg, index) => (
                  <p key={index}>
                    Registro {index + 1}: Fecha de Registro:{" "}
                    {new Date(reg.FechaReg).toLocaleDateString()} - Registrado por:{" "}
                    {reg.UsuarioReg}
                  </p>
                ))}
          </div>
        </div>
      </div>

      {/* Botón para regresar */}
      <div className="actions">
        <button className="go-back-btn" onClick={handleBack}>
          Regresar
        </button>
      </div>
    </div>
  </div>
</div>
  );
};

export default PopUpPrecios;
