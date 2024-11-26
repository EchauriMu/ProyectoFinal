import React, { useState, useEffect } from 'react';
import '../assets/historial.css';

const PresentacionHistorial = ({ presentaciones, onPresentaOKClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filter, setFilter] = useState('');
  const [filteredData, setFilteredData] = useState(presentaciones);

  // Sincronizar filteredData con presentaciones cuando cambien
  useEffect(() => {
    setFilteredData(presentaciones);
    setCurrentPage(1); // Reiniciar a la primera página
  }, [presentaciones]);

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
    setFilter(e.target.value);
  };

  const applyFilter = () => {
    const lowercasedFilter = filter.toLowerCase();
    const filtered = presentaciones.filter((item) =>
      item.IdPresentaOK.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  return (
    <div className="contenedorListaHistorial">
      <div className="flex-containerHistorial">
        <div className="historialListas">
          <div className="encabezado">
            <h3>Presentaciones</h3>
          </div>
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
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.IdPresentaOK}>
                  <td onClick={() => onPresentaOKClick(item)}>{item.IdPresentaOK}</td>
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
              <span> registros por página</span>
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
