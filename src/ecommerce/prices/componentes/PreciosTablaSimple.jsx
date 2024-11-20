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
  const [selectedItems, setSelectedItems] = useState([]); // Estado para almacenar elementos seleccionados
  const [selectAll, setSelectAll] = useState(false); // Estado para manejar el checkbox de selección total
  const [selectedRowId, setSelectedRowId] = useState(null); // Almacena el ID de la fila seleccionada
  const [selectedListaPrecios, setSelectedListaPrecios] = useState(null); // Almacena la alerta seleccionada

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

  // Manejar selección de un ítem
  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id) // Desmarcar
        : [...prevSelected, id] // Marcar
    );
  };

  // Manejar selección de todos los ítems visibles
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      // Seleccionar todos los ítems actuales
      setSelectedItems(currentItems.map((item) => item._id));
    } else {
      // Deseleccionar todos
      setSelectedItems([]);
    }
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
    <div className="contenedor">
      <h1 className="titulo">Centro de búsqueda</h1>

      <div className="flex-container">
        {/* Tabla de productos */}
        <div className="precios">

        <div className="encabezado">
  <i className="fa-solid fa-tag"></i>

  {/* Botón para refrescar datos */}
  <span
  className="Refrescarbtn"
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
                <th>
                  <div className="checkbox-container">
                    <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                  </div>
                </th>
                <th>ID Inst</th>
                <th>ID Lista</th>
                <th>DesLista</th>
                <th>Fecha Expira Inicio</th>
                <th>Fecha Expira Fin</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((producto) => (
                 <tr key={producto._id} onClick={() => handleRowClick(producto)}>
                  <td>
                    <div className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(producto._id)}
                        onChange={() => handleCheckboxChange(producto._id)}
                      />
                    </div>
                  </td>
                  <td>{producto.IdInstitutoOK}</td>
                  <td>{producto.IdListaOK}</td>
                  <td>{producto.IdListaBK}</td>
                  <td>{new Date(producto.FechaExpiraIni).toLocaleDateString()}</td>
                  <td>{new Date(producto.FechaExpiraFin).toLocaleDateString()}</td>
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
