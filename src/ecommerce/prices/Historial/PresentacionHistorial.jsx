import React, { useState } from 'react';
import '../assets/historial.css'; // Asegúrate de que este archivo sea el correcto para el estilo de historial

const PresentacionHistorial = ({ presentaciones, onPresentaOKClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = presentaciones.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (indexOfLastItem < presentaciones.length) {
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
            <h3>Presentaciones:</h3>
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
            <div className="botones-paginacion">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Anterior
              </button>
              <button
                onClick={handleNextPage}
                disabled={indexOfLastItem >= presentaciones.length}
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
