import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../assets/Precios.css';
import { fetchListasTablasGeneral } from '../../../actions/listasTablasGeneralActions';

const PreciosTablaSimple = ({ onRowClick }) => {
  const dispatch = useDispatch();
  const { listasTablasGeneral, loading, error } = useSelector(state => state.listasTablasGeneral);

  //const de la tabla
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Valor inicial de elementos por página

  useEffect(() => {
    dispatch(fetchListasTablasGeneral());
  }, [dispatch]);

  // Calcular el índice de inicio y fin para la paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listasTablasGeneral.slice(indexOfFirstItem, indexOfLastItem);

  const handleRowClick = (row) => {
    console.log(row.IdListaOK); // Imprime el IdListaOK
    onRowClick(row.IdListaOK); // Propaga el ID seleccionado al padre
  };

  // Función para cambiar el número de elementos por página
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reiniciar a la primera página cada vez que se cambia el número de elementos
  };

  // Función para cambiar de página
  const handleNextPage = () => {
    if (indexOfLastItem < listasTablasGeneral.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="contenedorListaAlertas">
     

      <div className="flex-containerAlerts">
        {/* Tabla de productos */}
        <div className="preciosAlerts">

          <div className="encabezado">
            <h3>Listas Disponibles:</h3>

            {/* Botón para refrescar datos */}
            <span
              className="RefrescarbtnAlerts"
              title="Recargar tabla"
              onClick={() => dispatch(fetchListasTablasGeneral())} // Llama a la acción de actualizar listas cuando se hace clic en el botón
            >
              <i className="fa-solid fa-arrows-rotate"></i>
            </span>
          </div>

          {loading ? (
            <div className="contenedorLoader">
              <div className="Cargando1"></div>
            </div>
          ) : error ? (
            <div className="contenedorLoader">
              <div className="error-message">{`Error: ${error}`}</div>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID Inst</th>
                  <th>ID Lista</th>
                  <th>DesLista</th>
                 
                </tr>
              </thead>
              <tbody>
                {currentItems.map((producto) => (
                  <tr key={producto._id} onClick={() => handleRowClick(producto)}>
                    <td>{producto.IdInstitutoOK}</td>
                    <td>{producto.IdListaOK}</td>
                    <td>{producto.IdListaBK}</td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Paginación */}
          <div className="paginacion">
            <div className="info-paginacion">
              <span className="registro-info">
                {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, listasTablasGeneral.length)} de {listasTablasGeneral.length} registros
              </span>
              <select
                className="items-por-page"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <span>registros por página</span>
            </div>
            <div className="botones-paginacion">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
              <button onClick={handleNextPage} disabled={indexOfLastItem >= listasTablasGeneral.length}>Siguiente</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PreciosTablaSimple;
