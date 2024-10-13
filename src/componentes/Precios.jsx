// Importaciones necesarias
import React, { useState } from 'react';
import '../assets/Precios.css'; 
import '../assets/Busqueda.css';
import '../assets/Graficas.css';
import '../assets/Querys.css';

import Graficas from './Graficas'; // Importa el componente Graficas

const Precios = () => {
  // Datos simulados de productos
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

  const [selectedRows, setSelectedRows] = useState([]); // Estado para filas seleccionadas

  const handleRowClick = (id) => {
    setSelectedRows(prevSelectedRows => {
      if (prevSelectedRows.includes(id)) {
        // Si la fila ya está seleccionada, se deselecciona
        return prevSelectedRows.filter(rowId => rowId !== id);
      } else {
        // Si la fila no está seleccionada, se añade
        return [...prevSelectedRows, id];
      }
    });
  };

  return (
    <div className="contenedor">
      <h1 className="titulo">Centro de búsqueda</h1>

      {/* Filtros y contenedor principal omisos para brevedad */}

      <div className="flex-container">

        {/* Tabla de productos */}
        <div className="precios">
          <div className="encabezado">
            <h3>Precios Recientes</h3>
            <i className="bx bx-filter"></i>
            <span className="EditarBtn">Editar</span>
          </div>

          <table>
            <thead>
              <tr>
                <th>Nombre del Producto</th>
                <th>Descripción</th>
                <th>Fecha</th>
                <th className='thPrecio'><span className='SpanPrecio'>Precio</span></th>
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
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH39w-HG9z0SK5Ku7Joaj9UN6hXwpY2r-nGA&s" 
                      alt={producto.nombre} 
                    />
                    <p>{producto.nombre}</p>
                  </td>
                  <td>{producto.descripcion}</td>
                  <td>{producto.fecha}</td>
                  <td className='precio-celda'>
  <span className={producto.precio === 0 ? 'spanPrecioWarning' : 'SpanPrecio'}>
    ${producto.precio.toFixed(2)}
  </span>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Contenedor de gráficas */}
        <div className="contenedor-graficas">
          <div className="graficas">
            <h2 className="titulo-grafica">Gráficas</h2>
            <p className="info-grafica">Gráfica 1</p>
            <Graficas /> {/* Componente de gráficas */}
            <p className="info-grafica">Gráfica 2</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Precios;
