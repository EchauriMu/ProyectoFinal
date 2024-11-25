
import React, { useState, useEffect } from 'react';
import { useContexto } from '../../componentes/PreciosProvider';
import SeleccionadorActivo from './SeleccionadorActivo';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { addPrecio } from '../services/remote/post/addPrecio';
import { deletePresentacion } from '../services/remote/del/deletePresentacion';
import { putPrecio } from '../services/remote/put/putPrecio';
import {fetchPrecioById} from '../../../../actions/listasTablasGeneralActions';

import '../assets/PopupPrecios.css';
import '../assets/Precios.css';
import '../assets/Querys.css';

const PopUpPrecios = ({ isVisible, product, onClose }) => {
  // Contexto
  const { 
    selectedPresentaId, setSelectedPresentaId,
    botonesHabilitado, setBotonesHabilitado,
    userName, 
    activo, setActivo,
    borrado, setBorrado,
    dispatch 
  } = useContexto();

  // Estado global del store
  const { precioData, loading, error } = useSelector((state) => state.precio);

  // Estado local
  const [showNewPresentacionInput, setShowNewPresentacionInput] = useState(false);

  // Efectos
  useEffect(() => {
    if (product?.IdListaOK) {
      dispatch(fetchPrecioById(product.IdListaOK));
      borrado_input();
      formik.resetForm();
    }
  }, [product, dispatch]);

  useEffect(() => {
    if (precioData.length > 0 && product?.IdProdServOK) {
      const selectedPrices = precioData.filter(item => item.IdProdServOK === product.IdProdServOK);
      if (selectedPrices.length > 0) {
        setSelectedPresentaId(selectedPrices.IdPresentaOK);
      }
    }
  }, [precioData, product]);

  //Validación de Yup
  const validationSchema = Yup.object({
    IdPresentaOK: Yup.string().required("La presentación es obligatoria."),
    IdTipoFormulaOK: Yup.string().required("El tipo de fórmula es obligatorio."),
    Formula: Yup.string().required("La fórmula es obligatoria."),
    CostoIni: Yup.number().required("El costo inicial es obligatorio.").min(0, "El costo inicial debe ser mayor o igual a 0."),
    CostoFin: Yup.number().required("El costo final es obligatorio.").min(Yup.ref('CostoIni'), "El costo final debe ser mayor o igual al costo inicial."),
    Precio: Yup.number().required("El precio es obligatorio.").min(0, "El precio debe ser mayor o igual a 0."),
  });

  // Inicialización de Formik
  const formik = useFormik({
    initialValues: {
      IdProdServOK :  "",
      IdPresentaOK: '',
      IdTipoFormulaOK: '',
      Formula: '',
      CostoIni: '',
      CostoFin: '',
      Precio: '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (showNewPresentacionInput) {
        handleNuevoPrecio(values);
      } else {
        handleActualizarPrecio(values);
      }
    },
  });



  // Handlers
  const handleActualizarPrecio = (values) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres actualizar este precio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar',
    }).then(async result => {
      if (result.isConfirmed) {
        const updatedPrecioData = {
          ...values,
          detail_row: {
            Activo: activo,
            Borrado: borrado,
            detail_row_reg: [{ FechaReg: new Date(), UsuarioReg: userName }]
          }
        };
        try{
          await putPrecio(product.IdListaOK, updatedPrecioData).then(
            () =>{
              Swal.fire('¡Actualizado!', 'El precio ha sido actualizado.', 'success');
              dispatch(fetchPrecioById(product.IdListaOK))
            }
          );
        }catch(e){
          Swal.fire('¡Error!', 'La presentación no se pudo actualizar.', 'error');
        }
        
        
      }
    });
  };
  
  const handleNuevoPrecio =  (values) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres agregar este nuevo precio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, agregar',
      cancelButtonText: 'Cancelar',
    }).then(async result => {
      if (result.isConfirmed) {
        const newPrecioData = {
          ...values,
          IdPresentaOK: formik.values.IdProdServOK+"-"+formik.values.IdPresentaOK,
          detail_row: {
            Activo: activo,
            Borrado: borrado,
            detail_row_reg: [{ FechaReg: new Date(), UsuarioReg: userName }]
          }
        };
        try{
          console.log(newPrecioData)
          await addPrecio(product.IdListaOK, newPrecioData).then(
            () =>{
              Swal.fire('¡Creado!', 'El nuevo precio ha sido agregado.', 'success');
              borrado_input();
              setShowNewPresentacionInput(false)
              setBotonesHabilitado(false)
              dispatch(fetchPrecioById(product.IdListaOK))
              formik.resetForm();
            }
          );
        }catch(e){
          Swal.fire('¡Error!', 'La presentación no se pudo agregar.', 'error');
        }
        
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
    }).then( async result => {
      if (result.isConfirmed) {
        try{
          await deletePresentacion(product.IdListaOK, selectedPresentaId).then(()=>{
            Swal.fire('¡Eliminado!', 'El precio ha sido eliminado.', 'success');
            dispatch(fetchPrecioById(product.IdListaOK))
            borrado_input();
          });
        }catch(e){
          Swal.fire('¡Error!', 'El precio no ha sido eliminado.', 'error')
        }
        
        
      }
    });
  };

  const handleSelectPresentacion = (e) => {
    setSelectedPresentaId(e.target.value);
    const selected = precioData.find(item => item.IdPresentaOK === e.target.value);
    if (selected) {
      formik.setValues({
        IdProdServOK :  selected.IdProdServOK,
        IdPresentaOK: selected.IdPresentaOK,
        IdTipoFormulaOK: selected.IdTipoFormulaOK,
        Formula: selected.Formula,
        CostoIni: selected.CostoIni,
        CostoFin: selected.CostoFin,
        Precio: selected.Precio,
      });
    }else{
      borrado_input();
    }
  };

  const borrado_input = () => {
      setActivo("S"); 
      setBorrado("N");
      formik.setValues({
        IdProdServOK : product.IdListaOK ,
        IdPresentaOK: '',
        IdTipoFormulaOK: '',
        Formula: '',
        CostoIni: '',
        CostoFin: '',
        Precio: '',
      });
      
  };

  const handleBack = () => {
    dispatch(fetchPrecioById(product.IdListaOK));
    onClose();
  };

  const menuDesplegable = () =>{
    setShowNewPresentacionInput(false);
    if (selectedPresentaId == ""){
      setBotonesHabilitado(true)
    }else{
      setBotonesHabilitado(false)
    }
    
  }

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

      {/* Contenido principal */}
      <div onSubmit={formik.handleSubmit} className="content">
        {/* Selección de Presentación */}
        <div className="dropdown">
          <h4>Selecciona Presentación</h4>
          <div className="presentacion-contenedor">
            <div className="select-div">
              <select
                id="presentacion"
                value={selectedPresentaId}
                onChange={handleSelectPresentacion}
                onClick={() => {
                  menuDesplegable();
                }}
              >
                <option value="" >Selecciona presentación</option>
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
        <div className="button-group">
          
          <div className="presentacion-contenedor" >
            {!showNewPresentacionInput ? (
              <span
                className="AggbtnPop"
                title="Agregar una lista nueva"
                value=""
                onClick={(e) => {
                  formik.resetForm();
                  handleSelectPresentacion(e);
                  setShowNewPresentacionInput(true);
                  setSelectedPresentaId("");
                  setBotonesHabilitado(true);
                }}
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
                  id={"IdPresentaOK"}
                  name = {"IdPresentaOK"}
                  value={formik.values.IdPresentaOK}
                  onChange={formik.handleChange}
                />
                
              </div>
              {formik.errors.IdPresentaOK && formik.touched.IdPresentaOK && (
                  <div className="error">*{formik.errors.IdPresentaOK}</div>
                )}
            </div>
                
                <span
                  className="actualizarPrecio"
                  onClick={() => {
                    formik.handleSubmit(); // Llama al envío del formulario
                    
                  }}
                >
                  Confirmar
                </span>
                <span
                  className="EliminarPrecio"
                  onClick={() =>{ 
                    setShowNewPresentacionInput(false);
                    setBotonesHabilitado(false);
                  }}
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
            { id: "costo-inicial", label: "Costo Inicial", name:"CostoIni" },
            { id: "costo-final", label: "Costo Final", name: "CostoFin" },
            { id: "precio-actual", label: "Precio", name: "Precio" },
          ].map(({ id, label, name }) => (
            <div className="precio-act" key={id}>
              <label htmlFor={id}>{label}</label>
              <div className="input-div">
                <span>$</span>
                <input
                  type="number"
                  id={id}
                  className="input-precioRec"
                  name = {name}
                  value={formik.values[name]}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.errors[name] && formik.touched[name] && (
                  <div className="error">*{formik.errors[name]}</div>
                )}
            </div>
          ))}
        </div>

        {/* Formulas */}
        <div className="button-group">
          {[
            { id: "nuevo-formula-id", label: "Formula ID",name: "IdTipoFormulaOK" },
            { id: "nuevo-formula", label: "Formula", name: "Formula" },
          ].map(({ id, label, name }) => (
            <div className="formula-id" key={id}>
              <label htmlFor={id}>{label}</label>
              <div className="input-div">
                <input
                  type="text"
                  id={id}
                  className="input-precioRec"
                  name = {name}
                  value={formik.values[name]}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.errors[name] && formik.touched[name] && (
                  <div className="error">*{formik.errors[name]}</div>
                )}
            </div>
          ))}
          <SeleccionadorActivo />
            <span
            className="actualizarPrecio"
            type="submit"
            title="Recargar tabla"
            onClick={() => {
              if (!botonesHabilitado) {
                formik.handleSubmit(); // Llama al envío del formulario solo si no están deshabilitados
              }
            }}
            style={{ pointerEvents: botonesHabilitado ? 'none' : 'auto', opacity: botonesHabilitado ? 0.5 : 1 }}
          >
            Actualizar
          </span>

          <span
            className="EliminarPrecio"
            onClick={() => {
              if (!botonesHabilitado) {
                handleDelete(); // Llama al envío del formulario solo si no están deshabilitados
              }
            }}
            style={{ pointerEvents: botonesHabilitado ? 'none' : 'auto', opacity: botonesHabilitado ? 0.5 : 1 }}
          >
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
                  <p> 
                    Fecha de Registro:{" "}
                    {new Date(reg.FechaReg).toLocaleString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: false, // Usa formato de 24 horas
                    })} - Registrado por:{" "}
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
