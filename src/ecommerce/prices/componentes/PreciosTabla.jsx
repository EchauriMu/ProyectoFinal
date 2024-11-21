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
import PopUpAgregarLista from './PopUpAgregarLista'


const PreciosTabla = () => {
  const dispatch = useDispatch();
  const { listasTablasGeneral, loading, error } = useSelector(state => state.listasTablasGeneral);

  // ======== ESTADOS ========
  // Popup de agregar lista
  const [isAddListPopupVisible, setIsAddListPopupVisible] = useState(false);
  // Popup de edición
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  // Gráficas
  const [selectedGraphProduct, setSelectedGraphProduct] = useState(null);

  // ======== EFECTOS ========
  useEffect(() => {
    dispatch(fetchListasTablasGeneral());
  }, [dispatch]);

  // ======== MANEJADORES DE EVENTOS ========
  // Mostrar popup de agregar lista
  const handleAddList = () => {
    setIsAddListPopupVisible(true);
  };

  // Seleccionar un producto para la gráfica
  const handleRowClick = (producto) => {
    setSelectedGraphProduct(producto);
    console.log("Producto seleccionado para gráficas:", producto.IdListaOK);
  };

  // Mostrar popup de edición
  const handleEditClick = (producto) => {
    setSelectedProduct(producto);
    setSelectedGraphProduct(producto);
    setIsPopupVisible(true);
  };

  // Eliminar un producto con confirmación
  const handleDeleteClick = (idListaOK) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡Este cambio no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePrecioAction(idListaOK));
        Swal.fire('Eliminado!', 'El precio ha sido eliminado.', 'success');
      }
    });
  };

  // Cambiar número de elementos por página
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

// Función para seleccionar o deseleccionar todos los ítems visibles
const handleSelectAll = () => {
  // Invertir el valor de selectAll
  setSelectAll(!selectAll);
  
  // Si no están todos seleccionados, seleccionamos todos los ítems
  if (!selectAll) {
    setSelectedItems(currentItems.map((item) => item._id));  // Seleccionamos todos los ítems visibles
  } else {
    setSelectedItems([]);  // Si ya están seleccionados todos, deseleccionamos
  }
};

// Función para seleccionar o deseleccionar un ítem individual
const handleCheckboxChange = (id) => {
  setSelectedItems((prevSelected) =>
    // Si el ítem ya está seleccionado, lo deseleccionamos
    prevSelected.includes(id)
      ? prevSelected.filter((item) => item !== id)  // Filtramos el ítem a deseleccionar
      : [...prevSelected, id]  // Si no está seleccionado, lo agregamos a la lista
  );
};


  // Navegar entre páginas
  const handleNextPageTable = () => {
    if (indexOfLastItem < listasTablasGeneral.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // ======== CÁLCULOS ========
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listasTablasGeneral.slice(indexOfFirstItem, indexOfLastItem);
  const isExportButtonActive = selectedItems.length > 0;


  return (
    <div className="contenedor">
      <h1 className="titulo">Listas de Precios</h1>

      <div className="flex-container">
        {/* Tabla de productos */}
        <div className="precios">

        <div className="encabezado">
  <i className="fa-solid fa-tag"></i>
  <h3>Listas de precios:</h3>


  <span className="Aggbtn"  title="Agregar una lista nueva" onClick={handleAddList} >
  <i class="fa-solid fa-plus"></i>
  {/* Mostrar el PopUp solo cuando isAddListPopupVisible es true */}

  </span>
  <PopUpAgregarLista 
          isAddListPopupVisible={isAddListPopupVisible}
          setIsAddListPopupVisible={setIsAddListPopupVisible}
        />



  {/* Botón para refrescar datos */}
  <span
  className="Refrescarbtn"
  title="Recargar tabla"
  onClick={() => dispatch(fetchListasTablasGeneral())} // Llama a la acción de actualizar listas cuando se hace clic en el botón
>
  <i className="fa-solid fa-arrows-rotate"></i>
</span>

  {/* Botón de Exportar */}

    {/* Botón para eliminar seleccionados */}
    <span 
     className={`Eliminarbtn ${isExportButtonActive ? 'activo' : 'inactivo'}`}>
   Eliminar seleccion
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
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((producto) => (
                <tr 
                key={producto._id} 
                onClick={(e) => {
                  e.stopPropagation(); // Detiene la propagación del evento
                  handleRowClick(producto);
                }}
              >

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
                  
    className="fa-solid fa-plus"
    title='Agregar a la lista'
    style={{ color: 'green', cursor: 'pointer', fontWeight: 'bold', fontSize:'20px' }}
    onClick={(e) => {
      e.stopPropagation(); // Evita que el clic en el ícono afecte la fila
      handleEditClick(producto);
    }}
  ></i>


  <i className="fa-solid fa-pen-to-square" 
  style={{ color: 'blue', cursor: 'pointer', fontWeight: 'bold', fontSize:'20px' }}  >


</i>


<i
  className="fa-solid fa-trash"
  style={{ color: 'red', cursor: 'pointer' }}
  onClick={(e) => {
    e.preventDefault(); // Evita que el clic en el ícono afecte la fila
    handleDeleteClick(producto.IdListaOK); // Llamada a la acción de eliminación
  }}
></i>

                  </td>
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
              <button onClick={handleNextPageTable} disabled={indexOfLastItem >= listasTablasGeneral.length}>Siguiente</button>
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
       
            <Graficas product={selectedGraphProduct} />

          
          </div>
        </div>
      </div>



      {/* PopUp Precios */}
      <PopUpPrecios
        isVisible={isPopupVisible}
        product={selectedProduct}
        onClose={() => setIsPopupVisible(false)}
       
      />
    
    </div>

  
  );
};

export default PreciosTabla;
