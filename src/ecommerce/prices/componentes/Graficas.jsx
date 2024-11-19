import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrecioById } from '../../../actions/listasTablasGeneralActions';
import '../assets/Loaders.css';
import '../assets/Graficas.css'; // Archivo CSS adicional

const Graficas = ({ product }) => {
  const dispatch = useDispatch();

  // Acceso a los datos desde el store usando 'precioData'
  const { precioData, loading, error } = useSelector((state) => state.precio); // 'precio' es el nombre del slice en tu reducer

  // Hacer fetch cuando `product` cambia
  useEffect(() => {
    if (product?.IdListaOK) {
      dispatch(fetchPrecioById(product.IdListaOK)); // Dispara la acción para obtener los precios
    }
  }, [product, dispatch]);

  const handleRefresh = () => {
    if (product?.IdListaOK) {
      dispatch(fetchPrecioById(product.IdListaOK)); // Refresca los datos
    }
  };

  // Si estamos cargando o hay un error, no renderizamos el gráfico
  if (loading)
    return (
      <div className="contenedorLoader">
        <div className="Cargando1"></div>
      </div>
    );
  if (error) return <div className="error">Error al cargar los datos: {error}</div>;

  // Mapeo de los datos para el gráfico
  const opciones = {
    chart: {
      id: 'grafico-precios',
      toolbar: {
        show: true,
      },
    },
    xaxis: {
      categories: precioData.map((item) => item.IdPresentaOK), // IdPresentaOK como eje X
      labels: {
        rotate: -45, // Para evitar que los valores se sobrepongan
      },
    },
    colors: ['#8086F2'],
  };

  // Los datos de la serie (precio)
  const series = [
    {
      name: 'Precio',
      data: precioData.map((item) => item.Precio), // Precios de los productos
    },
  ];

  return (
    <div className="grafica-container">
<div className="info-graf-container">
  <p className="info-grafica">
    Precios de: {precioData?.IdListaOK ? precioData.IdListaOK : 'Selecciona un producto'}
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
