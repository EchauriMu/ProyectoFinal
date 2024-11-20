import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrecioById } from '../../../actions/listasTablasGeneralActions';
import '../assets/Loaders.css';
import '../assets/Graficas.css'; // Archivo CSS adicional

const Graficas = ({ product }) => {
  const dispatch = useDispatch();

  // Hacer fetch cuando `product` cambia
  useEffect(() => {
    if (product?.IdListaOK) {
      dispatch(fetchPrecioById(product.IdListaOK)); // Dispara la acción para obtener los precios
    }
  }, [product?.IdListaOK, dispatch]);

  // Acceso a los datos desde el store usando 'precioData'
  const { precioData, loading, error } = useSelector((state) => state.precio); // 'precio' es el nombre del slice en tu reducer

  const handleRefresh = () => {
    if (product?.IdListaOK) {
      dispatch(fetchPrecioById(product.IdListaOK)); // Refresca los datos
    }
  };

  // Validar datos antes de mapearlos
  const categorias = precioData?.length ? precioData.map((item) => item.IdPresentaOK) : [];
  const datosSerie = precioData?.length ? precioData.map((item) => item.Precio) : [];

  // Configuración del gráfico
  const opciones = {
    chart: {
      id: 'grafico-precios',
      toolbar: {
        show: true,
      },
    },
    xaxis: {
      categories: categorias, // Eje X
      labels: {
        rotate: -45, // Evitar superposición
      },
    },
    colors: ['#8086F2'],
  };

  const series = [
    {
      name: 'Precio',
      data: datosSerie, // Datos de la serie
    },
  ];

  // Renderizado según estado
  if (loading)
    return (
      <div className="contenedorLoader">
        <div className="Cargando1"></div>
      </div>
    );

  if (error)
    return (
      <div className="error">
        Error al cargar los datos: {error}
        <button onClick={handleRefresh} className="btn-retry">
          Reintentar
        </button>
      </div>
    );

  return (
    <div className="grafica-container">
      <div className="info-graf-container">
        <p className="info-grafica">
          Precios de: {product?.IdListaOK ? product.IdListaOK : 'Selecciona un producto'}
        </p>
        <button className="btn-refrescar-graf" onClick={handleRefresh}>
          <i className="fa-solid fa-arrow-rotate-right"></i>
        </button>
      </div>
      <div className="grafica">
        <Chart options={opciones} series={series} type="line" width="100%" height="250px" />
      </div>
    </div>
  );
};

export default Graficas;
