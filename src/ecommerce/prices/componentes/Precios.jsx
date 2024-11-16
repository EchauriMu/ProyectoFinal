import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../assets/Precios.css';
import '../assets/Graficas.css';
import '../assets/Querys.css';
import Graficas from './Graficas';
import { fetchListasTablasGeneral } from '../../../actions/listasTablasGeneralActions';
import PopUpPrecios from './PopUpPrecios';
import { deletePrecioAction } from '../../../actions/listasTablasGeneralActions';
import Swal from 'sweetalert2';



const Precios = () => {
  const dispatch = useDispatch();
  const { listasTablasGeneral, loading, error } = useSelector(state => state.listasTablasGeneral);


//const de graficas
const [selectedGraphProduct, setSelectedGraphProduct] = useState(null);

  // Manejador para seleccionar el producto de la gráfica
  const handleRowClick = (producto) => {
    setSelectedGraphProduct(producto); // Selecciona el producto para las gráficas
    console.log("Producto seleccionado para gráficas:", producto.IdListaOK);
  };


//const para popups
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Controla si el popup está visible
  const [selectedProduct, setSelectedProduct] = useState(null);   // Guarda el producto seleccionado
  
  const handleEditClick = (producto) => {
    setSelectedProduct(producto);  // Establece el producto seleccionado
    setIsPopupVisible(true);      // Muestra el popup
  };
  



//const para os deletes
const handleDeleteClick = (idListaOK) => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "¡Este cambio no se puede revertir!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminarlo',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      // Llama a la acción de eliminación si el usuario confirma
      dispatch(deletePrecioAction(idListaOK));
      Swal.fire(
        'Eliminado!',
        'El precio ha sido eliminado.',
        'success'
      );
    }
  });
};





  //const de la tabla
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Valor inicial de elementos por página
  const [selectedItems, setSelectedItems] = useState([]); // Estado para almacenar elementos seleccionados
  const [selectAll, setSelectAll] = useState(false); // Estado para manejar el checkbox de selección total

  useEffect(() => {
    dispatch(fetchListasTablasGeneral());
  }, [dispatch]);

  // Calcular el índice de inicio y fin para la paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listasTablasGeneral.slice(indexOfFirstItem, indexOfLastItem);

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

  // Función para exportar solo los elementos seleccionados a CSV
  const exportToCSV = () => {
    const selectedData = listasTablasGeneral.filter(producto => selectedItems.includes(producto._id));
    
    const headers = ['ID Institución', 'ID Lista', 'Nombre del Producto', 'Fecha Expira Inicio', 'Fecha Expira Fin'];

    const rows = selectedData.map((producto) => [
      producto.IdInstitutoOK,
      producto.IdListaOK,
      producto.IdListaBK,
      new Date(producto.FechaExpiraIni).toLocaleDateString(),
      new Date(producto.FechaExpiraFin).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(','), // Agregar las cabeceras
      ...rows.map(row => row.join(',')), // Convertir cada fila en una cadena CSV
    ].join('\n');

    // Crear un Blob con el contenido CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Crear un enlace temporal para iniciar la descarga
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'precios_seleccionados.csv'); // Nombre del archivo a descargar
      link.click(); // Iniciar la descarga
    }
  };

  // Verificar si hay elementos seleccionados para activar/desactivar el botón de exportación
  const isExportButtonActive = selectedItems.length > 0;

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="contenedor">
      <h1 className="titulo">Centro de búsqueda</h1>

      <div className="flex-container">
        {/* Tabla de productos */}
        <div className="precios">
          <div className="encabezado">
            <i className="fa-solid fa-tag"></i>
            <h3>Precios Recientes</h3>
            <span 
              className={`Exportarbtn ${isExportButtonActive ? 'activo' : 'inactivo'}`} 
              onClick={isExportButtonActive ? exportToCSV : null}
            >
              <i className="fa-solid fa-arrow-up-from-bracket"></i> Exportar
            </span>
          </div>

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
                <th>Acción</th>
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
                  <td className='iconsActions'>
                  <i
    className="fa-solid fa-pen"
    style={{ color: 'blue', cursor: 'pointer' }}
    onClick={(e) => {
      e.stopPropagation(); // Evita que el clic en el ícono afecte la fila
      handleEditClick(producto);
    }}
  ></i>

<i
  className="fa-solid fa-trash"
  style={{ color: 'red', cursor: 'pointer' }}
  onClick={(e) => {
    e.stopPropagation(); // Evita que el clic en el ícono afecte la fila
    handleDeleteClick(producto.IdListaOK); // Llamada a la acción de eliminación
  }}
></i>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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

        {/* Contenedor de gráficas */}
        <div className="contenedor-graficas">
          <div className="graficas">
            <div className="encabezado">
              <i className="fa-solid fa-chart-simple"></i>
              <h3 className="titulo-grafica">Gráficas</h3>
            </div>
            <p className="info-grafica">Gráfica 1</p>

            <Graficas product={selectedGraphProduct} />

            <p className="info-grafica">Gráfica 2</p>
          </div>
        </div>
      </div>



      {/* PopUp Precios */}
      <PopUpPrecios
        isVisible={isPopupVisible}
        product={selectedProduct}
        onClose={() => setIsPopupVisible(false)}
        onSave={() => {/* Lógica para guardar los cambios */}} 
      />
    
    </div>

    
  );
};

export default Precios;
