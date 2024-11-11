// Importaciones necesarias
import React, { useState } from 'react';
import '../assets/Precios.css'; 
import '../assets/Busqueda.css';
import '../assets/Graficas.css';
import '../assets/Querys.css';

import Graficas from './Graficas'; // Importa el componente Graficas
import Nav from './Nav'
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
     <h1 class="titulo">Centro de búsqueda</h1>
    <div class="filtros">
        <div class="filtro-item">
            <label class="etiqueta">Categoría del Producto</label>
            <select class="seleccion">
                <option>Opción 1</option>
                <option>Opción 2</option>
            </select>
        </div>
        <div class="filtro-item">
            <label class="etiqueta">Ordenar Por:</label>
            <select class="seleccion">
                <option>Últimos</option>
                <option>Antiguos</option>
            </select>
        </div>
        <div class="filtro-item">
            <label class="etiqueta">Fecha:</label>
            <input type="date" class="input-fecha" />
        </div>
        <div class="filtro-item">
            <label class="etiqueta">Rango de Precios</label>
            <input type="range" class="input-rango" />
        </div>
        <div class="filtro-item">
        <form action="#">
                <div class="form-input">
                    <input type="search" placeholder="Buscar..."/>
                    <button class="search-btn" type="submit">   
                        <img src="https://static-00.iconduck.com/assets.00/search-icon-2044x2048-psdrpqwp.png" alt="lupa" class="imagen-busqueda" />
                    </button>
                </div>
            </form>
        </div>
    
    </div>
      {/* Filtros y contenedor principal omisos para brevedad */}

      <div className="flex-container">

        {/* Tabla de productos */}
        <div className="precios">
          <div className="encabezado">
          <i class="fa-solid fa-tag"></i>
            <h3>Precios Recientes</h3>
           
            <span className="EditarBtn">
            <i class="fa-solid fa-arrow-up-from-bracket"></i>
                 Exportar
            </span>
          </div>

          <table>
            <thead>
              <tr>
                <th></th>
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
                      src="https://placehold.co/50x50" 
                      alt={producto.nombre} 
                    />
                  </td>
                  <td className='nombre-celda'>
                    <p>{producto.nombre}</p>
                  </td>
                  <td className='descipcion-celda'>
                  <p>{producto.descripcion}</p>
                  </td>
                  <td>
                  <p>{producto.fecha}</p>
                  </td>
                  <td className='precio-celda'>
                    <div className='precio-flex'>
  <span className={producto.precio === 0 ? 'spanPrecioWarning' : 'SpanPrecio'}>
    ${producto.precio.toFixed(2)}

  </span>
  <i class="fa-solid fa-pen"></i>
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
          <i class="fa-solid fa-chart-simple"></i>
            <h3 className="titulo-grafica">Gráficas</h3>
            </div>
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
