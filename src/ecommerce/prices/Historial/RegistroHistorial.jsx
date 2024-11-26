import React, { useState, useEffect } from 'react';


const RegistroHistorial = ({
  presentaOK,
  registros,
  onEditRegistro,
  onAddRegistro,
  onDeleteSelected, // Nueva función para eliminar seleccionados
}) => {
  const [selectedRegistros, setSelectedRegistros] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = registros.slice(indexOfFirstItem, indexOfLastItem); // Usar registros dinámicos

  useEffect(() => {
    setSelectedRegistros([]); // Reinicia selección
    setCurrentPage(1); // Reinicia la paginación
  }, [registros]);


  useEffect(() => {
    setCurrentPage(1); // Reiniciar la página al cargar nuevos registros
  }, [registros]);


  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };


  const handleNextPage = () => {
    if (indexOfLastItem < registros.length) {
      setCurrentPage(currentPage + 1);
    }
  };


  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  // Manejar selección de checkbox
  const handleCheckboxChange = (id) => {
    setSelectedRegistros((prev) =>
      prev.includes(id) ? prev.filter((regId) => regId !== id) : [...prev, id]
    );
  };

  // Seleccionar o deseleccionar todos
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRegistros(currentItems.map((registro) => registro.Id));
    } else {
      setSelectedRegistros([]);
    }
  };
  




  return (
    <div className="contenedorListaHistorial">
      <div className="flex-containerHistorial">
        <div className="historialListas">
        <div className="encabezado encabezadoagregar">
          <h4>Registros de {registros.length > 0 ? registros[0].IdPresentaOK : 'la presentación seleccionada'}</h4>
          <button className="btn-agregar-registro" onClick={onAddRegistro}>
            <i className="fa-solid fa-plus"></i>
          </button>
         <i
          className="fa-solid fa-trash action-icon delete"
          style={{
            color: selectedRegistros.length === 0 ? 'gray' : 'red',
            cursor: selectedRegistros.length === 0 ? 'not-allowed' : 'pointer',
            fontSize: '30px',
          }}
          onClick={() => selectedRegistros.length > 0 && onDeleteSelected(selectedRegistros)}
        ></i>
        </div>
          <table>
            <thead>
              <tr>
                  <th>
                  <input
                    type="checkbox" className='checkdeleteregistro'
                    onChange={handleSelectAll}
                    checked={selectedRegistros.length === registros.length && registros.length > 0}
                  />
                </th>
                <th>ID</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
            {currentItems.map((registro) => (
              <tr key={registro.Id}>
                <td>
                <input
                  type="checkbox" className='checkdeleteregistro'
                  checked={selectedRegistros.includes(registro.Id)}
                  onChange={() => handleCheckboxChange(registro.Id)}
                />
              </td>
                <td>{registro.Id}</td>
                <td>{registro.detail_row?.detail_row_reg?.[0]?.FechaReg || 'Sin fecha'}</td>
                <td>
                  <i
                    className="fa-solid fa-pen-to-square action-icon edit"
                    style={{ color: 'blue', cursor: 'pointer' }}
                    onClick={() => onEditRegistro(registro)}
                  ></i>
                  
                </td>
              </tr>
            ))}
          </tbody>


          </table>
          <div className="paginacion">
            <div className="info-paginacion">
              <span>
                {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, registros.length)} de {registros.length} registros
              </span>
              <select value={itemsPerPage} onChange={(e) => setItemsPerPage(parseInt(e.target.value, 10))}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <span> registros por página</span>
            </div>
            <div className="botones-paginacion">
              <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                Anterior
              </button>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={indexOfLastItem >= registros.length}
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
