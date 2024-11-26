import React, { useState } from 'react';
import '../assets/Historial.css';

const HistorialListas = ({ listas, onListaClick,onReload }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listas.slice(indexOfFirstItem, indexOfLastItem);

  const handleRowClick = (lista) => {
    console.log(lista.IdListaOK);
    onListaClick(lista);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (indexOfLastItem < listas.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="contenedorListaHistorial">
      <div className="flex-containerHistorial">
        <div className="historialListas">
          <div className="encabezado">
            <h3>Listas Disponibles:</h3>
            <span
              className="RefrescarbtnHistorial"
              title="Recargar tabla"
              onClick={onReload} // Usar la función pasada desde Historial
            >
              <i className="fa-solid fa-arrows-rotate"></i>
            </span>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID Lista</th>
                <th>Descripción Lista</th>
                <th>Fecha Expira Inicio</th>
                <th>Fecha Expira Fin</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((lista) => (
                <tr key={lista.IdListaOK} onClick={() => onListaClick(lista)}>
                  <td>{lista.IdListaOK}</td>
                  <td>{lista.DesLista}</td>
                  <td>{new Date(lista.FechaExpiraIni).toLocaleDateString()}</td>
                  <td>{new Date(lista.FechaExpiraFin).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        <div className="paginacion">
          <div className="info-paginacion">
            <span className="registro-info">
              {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, listas.length)} de {listas.length} registros
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
              disabled={indexOfLastItem >= listas.length}
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

export default HistorialListas;
