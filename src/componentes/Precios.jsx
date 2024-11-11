import React, { useState } from 'react';
import '../assets/Precios.css'; 
import '../assets/Busqueda.css';
import '../assets/Graficas.css';
import '../assets/Querys.css';
import PopUpPrecios from './PopUpPrecios'; // Importa el componente PopUpPrecios
import Graficas from './Graficas';

const Precios = () => {
  const [precios] = useState([
    { 
      id: 1, 
      nombre: "Teléfono Samsung Galaxy M15 5G 128 GB 4 GB Azul oscuro", 
      precio: 0.00, 
      descripcion: "Detalles Detalles Detalles??", 
      fecha: "2:16pm 12/09/2024" 
    },
    { 
      id: 2, 
      nombre: "Apple iPhone 13 (128 GB) - Azul medianoche", 
      precio: 1000.00, 
      descripcion: "Detalles: Iphone es Iphone", 
      fecha: "2:16pm 12/09/2024" 
    },
    { 
      id: 3, 
      nombre: "Xiaomi Redmi Note 10", 
      precio: 300.00, 
      descripcion: "Detalles: Excelente smartphone", 
      fecha: "2:16pm 12/09/2024" 
    },
    { 
      id: 4, 
      nombre: "Huawei P30 Lite", 
      precio: 0.00, 
      descripcion: "Detalles: Gran cámara y batería", 
      fecha: "2:16pm 12/09/2024" 
    },
    { 
      id: 5, 
      nombre: "Google Pixel 5", 
      precio: 700.00, 
      descripcion: "Detalles: Calidad de cámara excepcional", 
      fecha: "2:16pm 12/09/2024" 
    }
  ]);

  const [selectedRows, setSelectedRows] = useState([]); 
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleRowClick = (id) => {
    setSelectedRows(prevSelectedRows => {
      if (prevSelectedRows.includes(id)) {
        return prevSelectedRows.filter(rowId => rowId !== id);
      } else {
        return [...prevSelectedRows, id];
      }
    });
  };

  const handleEditPriceClick = (producto) => {
    setCurrentProduct(producto);
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const handleSavePrice = (newPrice) => {
    if (currentProduct) {
      setCurrentProduct({ ...currentProduct, precio: parseFloat(newPrice) });
      setIsPopupVisible(false);  // Cerrar el popup después de guardar
    }
  };

  return (
    <div className="contenedor">
      <h1 className="titulo">Centro de búsqueda</h1>

      {/* Filtros y contenedor principal omisos para brevedad */}
      
      <div className="flex-container">
        {/* Tabla de productos */}
        <div className="precios">
          <div className="encabezado">
            <i className="fa-solid fa-tag"></i>
            <h3>Precios Recientes</h3>
            <span className="EditarBtn">
              <i className="fa-solid fa-arrow-up-from-bracket"></i> Exportar
            </span>
          </div>

          <table>
            <thead>
              <tr>
                <th></th>
                <th>Nombre del Producto</th>
                <th>Descripción</th>
                <th>Fecha</th>
                <th className="thPrecio">
                  <span className="SpanPrecio">Precio</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {precios.map((producto) => (
                <tr 
                  key={producto.id} 
                  onClick={() => handleRowClick(producto.id)}
                  className={selectedRows.includes(producto.id) ? 'seleccionado' : ''}
                >
                  <td>
                    <img 
                      src="https://placehold.co/50x50" 
                      alt={producto.nombre} 
                    />
                  </td>
                  <td className="nombre-celda">
                    <p>{producto.nombre}</p>
                  </td>
                  <td className="descipcion-celda">
                    <p>{producto.descripcion}</p>
                  </td>
                  <td>
                    <p>{producto.fecha}</p>
                  </td>
                  <td className="precio-celda">
                    <div className="precio-flex">
                      <span className={producto.precio === 0 ? 'spanPrecioWarning' : 'SpanPrecio'}>
                        ${producto.precio.toFixed(2)}
                      </span>
                      <i className="fa-solid fa-pen" onClick={() => handleEditPriceClick(producto)}></i>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Contenedor de gráficas */}
        <div className="contenedor-graficas">
          <div className="graficas">
            <div className="encabezado">
              <i className="fa-solid fa-chart-simple"></i>
              <h3 className="titulo-grafica">Gráficas</h3>
            </div>
            <p className="info-grafica">Gráfica 1</p>
            <Graficas />
            <p className="info-grafica">Gráfica 2</p>
          </div>
        </div>
      </div>

      {/* Mostrar popup si está visible */}
      <PopUpPrecios 
        isVisible={isPopupVisible} 
        product={currentProduct} 
        onClose={closePopup} 
        onSave={handleSavePrice} 
      />
    </div>
  );
};

export default Precios;
