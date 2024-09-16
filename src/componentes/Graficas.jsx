import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';

const Graficas = () => {
  const opciones = {
    chart: {
      id: 'grafico-basico',
      toolbar: {
        show: true,
        colors: ['#8086F2'],
      },
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997],
    },
    colors: ['#8086F2'], // color de la línea
  };

  const series = [
    {
      name: 'series-1',
      data: [30, 40, 35, 50, 49, 60, 70],
    },
  ];

  useEffect(() => {
    // Cambiar textos después de que el gráfico se haya renderizado
    const exportMenuItems = document.querySelectorAll('.apexcharts-menu-item');
    exportMenuItems.forEach(item => {
      if (item.textContent.includes('Download SVG')) item.textContent = 'Descargar SVG';
      if (item.textContent.includes('Download PNG')) item.textContent = 'Descargar PNG';
      if (item.textContent.includes('Download CSV')) item.textContent = 'Descargar CSV';
    });
  }, []);

  return (
    <div className="grafica">
      <Chart options={opciones} series={series} type="line" width="100%" height="250px" />
    </div>
  );
};

export default Graficas;
