import React, { useState } from 'react';
import '../assets/historial.css'; // Asegúrate de que este archivo sea el correcto para el estilo de historial

const PresentacionHistorial = ({ lista, onPresentaOKClick, onDeleteHistorial }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filter, setFilter] = useState(''); // Estado para el filtro
  const [filteredData, setFilteredData] = useState(lista.historial); // Datos filtrados

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (indexOfLastItem < filteredData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value); // Actualiza el valor del filtro
  };

  const applyFilter = () => {
    const lowercasedFilter = filter.toLowerCase();
    const filtered = lista.historial.filter((item) =>
      item.IdPresentaOK.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reinicia la paginación
  };

  return (
    <div className="contenedorListaHistorial">
      <div className="flex-containerHistorial">
        <div className="historialListas">
          <div className="encabezado">
            <h3>Historial de la Lista: {lista.IdListaOK}</h3>
          </div>
          {/* Filtro */}
          <div className="filtro-container">
            <input
              type="text"
              value={filter}
              onChange={handleFilterChange}
              placeholder="Buscar por IdPresentaOK"
              className="input-filtro"
            />
            <button onClick={applyFilter} className="boton-filtro">
              Filtrar
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>IdPresentaOK</th>
                {/*<th>Acciones</th>*/}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.IdPresentaOK}>
                  <td onClick={() => onPresentaOKClick(item)}>{item.IdPresentaOK}</td>
                  {/*<td>
                  <i className="fa-solid fa-trash action-icon delete" style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDeleteHistorial(item.IdPresentaOK)}></i>
                  </td>*/}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="paginacion">
            <div className="info-paginacion">
              <span className="registro-info">
                {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredData.length)} de {filteredData.length} registros
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
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Anterior
              </button>
              <button
                onClick={handleNextPage}
                disabled={indexOfLastItem >= filteredData.length}
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresentacionHistorial;
