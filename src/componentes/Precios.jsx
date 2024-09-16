import React from 'react';
import '../assets/Precios.css'; 
import '../assets/Busqueda.css';
import '../assets/Graficas.css';

import Graficas from './Graficas'; // Importa el componente Graficas


const Precios = () => {
  return (
    <div class="contenedor">
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
    <h2 class="">Precios</h2> 
    <div class="flex-container">

        <div class="contenedor-tarjetas">
            <div class="tarjeta">
                <div class="contenido-tarjeta">
                    <img src="https://http2.mlstatic.com/D_NQ_NP_2X_694149-MLA75587187665_042024-F.webp" alt="imagen producto" class="imagen-tarjeta"/>
                    <div class="info-tarjeta">
                        <h2 class="titulo-tarjeta">Teléfono Samsung Galaxy M15 5G 128 GB 4 GB Azul oscuro</h2>
                        <p class="descripcion-tarjeta">Detalles Detalles Detalles??</p>
                        <p class="id-tarjeta">ID-Producto: 21400670</p>
                        <p class="fecha-tarjeta">Fecha: 2:16pm 12/09/2024</p>
                    </div>
                    <div class="acciones-tarjeta">
                        <p class="precio-tarjeta">$ 0.00</p>
                        <div class="grupo-botones">
                            <button class="btn modificar">Modificar</button>
                            <button class="btn eliminar">Eliminar</button>
                            <button class="btn agregar">Agregar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tarjeta">
                <div class="contenido-tarjeta">
                    <img src="https://http2.mlstatic.com/D_NQ_NP_2X_973345-MLA47781591382_102021-F.webp" alt="Producto" class="imagen-tarjeta" />
                    <div class="info-tarjeta">
                        <h2 class="titulo-tarjeta">Apple iPhone 13 (128 GB) - Azul medianoche</h2>
                        <p class="descripcion-tarjeta">Detalles: Iphone es Iphone</p>
                        <p class="id-tarjeta">ID-Producto: 21400641</p>
                        <p class="fecha-tarjeta">Fecha: 2:16pm 12/09/2024</p>
                    </div>
                    <div class="acciones-tarjeta">
                        <p class="precio-tarjeta">$ 0.00</p>
                        <div class="grupo-botones">
                            <button class="btn modificar">Modificar</button>
                            <button class="btn eliminar">Eliminar</button>
                            <button class="btn agregar">Agregar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="graficas">
            <h2 class="titulo-graficas">Gráficas</h2>
            <p class="info-grafica">Gráfica 1</p>
            <Graficas /> 
            <p class="info-grafica">Gráfica 2</p>
        </div>
    </div>
</div>
  );
};

export default Precios;


