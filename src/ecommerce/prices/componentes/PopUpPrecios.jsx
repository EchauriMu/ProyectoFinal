
import React, { useState, useEffect, startTransition } from 'react';
import { useContexto } from './PreciosProvider';
import SeleccionadorActivo from './SeleccionadorActivo';
import '../assets/PopupPrecios.css';
import '../assets/Precios.css';
import '../assets/Querys.css';
import Swal from 'sweetalert2';

import { fetchPrecioById } from '../../../actions/listasTablasGeneralActions';
import { putPrecioById } from '../../../actions/PopUpPreciosGeneralActions';
import { postPrecio } from '../../../actions/PopUpPreciosGeneralActions';
import { deletePresentacionAction } from '../../../actions/PopUpPreciosGeneralActions';
import { useSelector, useDispatch } from 'react-redux';

const PopUpPrecios = ({ isVisible, product, onClose }) => {



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
    activo,
    setActivo,
    borrado,
    setBorrado,
    dispatch
   } = useContexto();




  // Acceso a la data desde el store usando 'precioData'
  const { precioData, loading, error } = useSelector((state) => state.precio); //  'precio' es el nombre del slice en tu reducer
  const { putPrecioData, putLoading, putError } = useSelector((state) => state.putPrecio); //  'putPrecio' es el nombre del slice en tu reducer

	const { postPrecioData, postLoading, postError } = useSelector((state) => state.postPrecio); //  'postPrecio' es el nombre del slice en tu reducer

	const {deltePrecioData, deleteLoading, deleteError} = useSelector((state) => state.deletePresentacion);
	// Actualizar id


	// Llamada para actualizar el precio
		const actualizarPrecio = (id, precioData) => {
			dispatch(putPrecioById(id, precioData));
		};

	// Llamada para actualizar el precio
	const crearPrecio = (id, precioData) => {
		dispatch(postPrecio(id, precioData));
	};

	// Llamada para actualizar el precio
	const deletePresentacion = (id, precioData) => {
		dispatch(deletePresentacionAction(id, precioData));
	};


  // Hacer fetch cuando `product` cambia
  useEffect(() => {
    if (product?.IdListaOK) {
      dispatch(fetchPrecioById(product.IdListaOK)); // Dispara la acción para obtener los precios
    }
  }, [product, dispatch]);


  
  // Filtrar los precios cuando `precioData` o `product` cambian
  useEffect(() => {
    if (precioData.length > 0 && product?.IdProdServOK) {
      const selectedPrices = precioData.filter(
        (item) => item.IdProdServOK === product.IdProdServOK
      );
      if (selectedPrices.length > 0) {
        setSelectedProdServId(selectedPrices[0].IdProdServOK);
        setSelectedPresentaId(selectedPrices[0].IdPresentaOK);
        setNuevoPrecio(selectedPrices[0].Precio);
      }
    }
		
  }, [precioData, product]);

	// Actualizar precio
	// Función para actualizar el precio
  const handleActualizarPrecio = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Quieres actualizar este precio?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actualizar'
    }).then((result) => {
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
            detail_row_reg: [
              {
                FechaReg: new Date(),
                UsuarioReg: userName
              }
            ] 
          }
        };
  
        actualizarPrecio(product.IdListaOK, updatedPrecioData); // Aquí actualizas el precio
  
        Swal.fire('¡Actualizado!', 'El precio ha sido actualizado.', 'success');
      }
    });
  };




  //handke ara precio nuevo
  const handleNuevoPrecio = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Quieres agregar este nuevo precio?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, agregar'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedPrecioData = {
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
            detail_row_reg: [
              {
                FechaReg: new Date(),
                UsuarioReg: userName
              }
            ] 
          }
        };
  
        crearPrecio(product.IdListaOK, updatedPrecioData); // Aquí creas el nuevo precio
        setIdPresentaOK(""); // Limpiamos el estado
        Swal.fire('¡Creado!', 'El nuevo precio ha sido agregado.', 'success');
      }
    });
  };


const [showNewPresentacionInput, setShowNewPresentacionInput] = useState(false);


const handleDelete = () => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "¡Este precio se eliminará!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar'
  }).then((result) => {
    if (result.isConfirmed) {
      // Solo llama a la función deletePresentacion si el usuario confirma
      deletePresentacion(product.IdListaOK, selectedPresentaId);
      Swal.fire('¡Eliminado!', 'El precio ha sido eliminado.', 'success');
    }
  });
};


  const handleBack = () => {
    dispatch(fetchPrecioById(product.IdListaOK));
      onClose();
  };


	
	//Actualiza los precios una vez que se cambia la presentación
	useEffect(() => {
		if (precioData && selectedPresentaId) {
			const precioSeleccionado = precioData.find(
				(item) => item.IdPresentaOK === selectedPresentaId
			);
			if (precioSeleccionado) {
				setIdTipoFormulaOK(precioSeleccionado.IdTipoFormulaOK || "");
				setFormula(precioSeleccionado.Formula || "");
				setCostoIni(precioSeleccionado.CostoIni || "");
				setCostoFin(precioSeleccionado.CostoFin || "");
				setNuevoPrecio(precioSeleccionado.Precio || "");
				setActivo(precioSeleccionado.detail_row.Activo || "S")
				setBorrado(precioSeleccionado.detail_row.Borrado || "N")

				 // Establece el valor inicial
			}
		}
	}, [precioData, selectedPresentaId]);

  const handleSelectPresentacion = (e) => {
    const selectedPresentaId = e.target.value;
    setSelectedPresentaId(selectedPresentaId);

    // Buscar el precio correspondiente a la presentación seleccionada
    const selected = precioData.find(item => item.IdPresentaOK === selectedPresentaId);
    if (selected) {
      setNuevoPrecio(selected.Precio);
			setCostoIni(selected.costoIni);
    }
  };

  if (!isVisible || !product) return null;

  

  return (
    <div className="popup-position">
      <div className="popup-container">
        <div className="container">
          <div className="header">
            <h2>Añadir/Modificar/Eliminar SubDoc Precios de: </h2>
              
              <span >ID Lista: {product.IdListaOK}</span>
          </div>

          {/* Cargando o Error */}
          {loading && <div>Cargando...</div>}
          {error && <div>Error al cargar los datos: {error}</div>}
									<div>
						{putLoading && <p>Cargando...</p>}
						{putError && <p>Error: {putError}</p>}

						{postLoading && <p>Cargando...</p>}
						{postError && <p>Error: {putError}</p>}

						{deleteLoading && <p>Cargando...</p>}
						{deleteError && <p>Error: {putError}</p>}
						
					</div>
          {/* Wizard steps */}
       
        
            <div className="content">
              {/* Dropdown Producto */}
              <div className="dropdown">
							<h4>Selecciona Presentación</h4>
							<div className="presentacion-contenedor">
                
                <div className="select-div">
				<select
  id="presentacion"
  value={selectedPresentaId}
  onChange={handleSelectPresentacion}
>
  <option value="" >
    Selecciona presentación
  </option>
  {precioData &&
    precioData.map(item => (
      <option key={item.IdPresentaOK} value={item.IdPresentaOK}>
        {item.IdPresentaOK}
      </option>
    ))}
</select>


                  </div>
									</div>
              </div>

              {/* Dropdown Presentación */}
							
              <div className="dropdown">
			  <h4>Nueva Presentación</h4>
                <div className="presentacion-contenedor">
						
				
				{!showNewPresentacionInput && (
  <span 
    className="AggbtnPop"  
    title="Agregar una lista nueva" 
    onClick={() => setShowNewPresentacionInput(true)}
  >
    Añadir Presentacion
  </span>
)}

{showNewPresentacionInput && (
  <div className="dropdown">
    <div className="presentacion-contenedor">
      <div className="presentacion-id">
        <div className="input-div">
       
          <input
            type="text"
            id="nuevo-presentacion-id"
            className="input-precioRec"
            value={idPresentaOK || ""}
            onChange={(e) => setIdPresentaOK(e.target.value)}
          />
        </div>
      </div>
      <div className="button-group">
        <button
          className="confirmar-btn"
          onClick={() => {
            handleNuevoPrecio();
            setShowNewPresentacionInput(false); // Oculta el input después de confirmar
          }}
        >
          Confirmar
        </button>
        <button
          className="cancelar-btn"
          onClick={() => setShowNewPresentacionInput(false)} // Cancela y oculta el input
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
)}




                </div>
								
              </div>

              {/* Precios */}
              <h4>Selecciona un nuevo precio</h4>
             
              <div className="button-group">
              <div className="precio-act">
								<label htmlFor="costo-inicial">Costo Inicial</label>
								<div className="input-div">
									<span>$</span>
									<input
										type="number"
										id="costo-inicial"
										className="input-precioRec"
										value={costoIni}
										onChange={(e) => setCostoIni(e.target.value)} // Hacer modificable
									/>
								</div>
							</div>

							<div className="precio-act">
								<label htmlFor="costo-final">Costo Final</label>
								<div className="input-div">
									<span>$</span>
									<input
										type="number"
										id="costo-final"
										className="input-precioRec"
										value={costoFin}
										onChange={(e) => setCostoFin(e.target.value)} // Hacer modificable
									/>
								</div>
							</div>

							<div className="precio-act">
								<label htmlFor="precio-actual">Precio</label>
								<div className="input-div">
									<span>$</span>
									<input
										type="number"
										id="precio-actual"
										className="input-precioRec"
										value={nuevoPrecio}
										onChange={(e) => setNuevoPrecio(e.target.value)} // Hacer modificable
									/>
								</div>
							</div>



              </div>
							
							<div className="button-group">
							<div className="formula-id">
								<label htmlFor="formula-id">Formula id</label>
								<div className="input-div">
									<span>$</span>
									<input
										type="text"
										id="nuevo-formula-id"
										className="input-precioRec"
										value={idTipoFormulaOK}
										onChange={(e) => setIdTipoFormulaOK(e.target.value)}
									/>
								</div>
							</div>

							<div className="formula-id">
								<label htmlFor="formula-id">Formula</label>
								<div className="input-div">
									<span>$</span>
									<input
										type="text"
										id="nuevo-formula-id"
										className="input-precioRec"
										value={formula}
										onChange={(e) => setFormula(e.target.value)}
									/>
								</div>
							</div>
								<SeleccionadorActivo/>
								<span
								className="actualizarPrecio"
								title="Recargar tabla"
								onClick={handleActualizarPrecio}// Llama a la acción de actualizar listas cuando se hace clic en el botón
							>
								
								Actualizar
							</span>

								{/* Botón de Exportar */}

									{/* Botón para eliminar seleccionados */}
									<span 
									className="EliminarPrecio"
									onClick={handleDelete}>
								Eliminar Precio
								</span>
								

								</div>
						
              {/* Detail Row */}
              <h4>Detalle de Registro</h4>
              <div className="resources">
                <div className="resource-columns">
                  {precioData && precioData.find(item => item.IdPresentaOK === selectedPresentaId)?.detail_row?.detail_row_reg.map((reg, index) => (
                    <p key={index}>
                      Registro {index + 1}: Fecha de Registro: {new Date(reg.FechaReg).toLocaleDateString()} - Registrado por: {reg.UsuarioReg}
                    </p>
                  ))}
                </div>
              </div>

            </div>



          

          {/* Botones */}
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
