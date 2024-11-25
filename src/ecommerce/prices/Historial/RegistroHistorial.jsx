import React, { useState } from 'react';

const RegistroHistorial = ({ presentaOK, onEditRegistro, onDeleteRegistro }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = presentaOK.historial.slice(indexOfFirstItem, indexOfLastItem);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (indexOfLastItem < presentaOK.historial.length) {
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
      <h4>Registros de {presentaOK.IdPresentaOK}</h4></div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((registro) => (
            <tr key={registro.Id}>
              <td>{registro.Id}</td>
              <td>{registro.detail_row?.detail_row_reg[0]?.FechaReg || 'Sin fecha'}</td>
              <td>
                
                <i className="fa-solid fa-pen-to-square action-icon edit" style={{ color: 'blue', cursor: 'pointer' }} onClick={() => onEditRegistro(registro)}></i>
                <i className="fa-solid fa-trash action-icon delete" style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDeleteRegistro(registro.Id)}></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="paginacion">
        <div className="info-paginacion">
          <span>
            {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, presentaOK.historial.length)} de{' '}
            {presentaOK.historial.length} registros
          </span>
          <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
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
            disabled={indexOfLastItem >= presentaOK.historial.length}
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

export default RegistroHistorial;
