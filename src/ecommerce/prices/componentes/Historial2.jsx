import React, { useState } from 'react';
import '../assets/Historial.css';

const Historial = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const datosHistorial = [
    {
      id: 1,
      lista: '9001-000000000001',
      tipoCambio: 'agregado',
      hora: '08:00 am',
      usuario: 'FIBARRAC',
      detalles: {
        instituto: '9001',
        descripcionLista: 'Publico en General',
        formula: '(CostoIni + CostoFin) / 2 * factor_demanda',
        precio: 35605.5,
      },
    },
    {
      id: 2,
      lista: '9001-000000000002',
      tipoCambio: 'editado',
      hora: '10:30 am',
      usuario: 'JDOE',
      detalles: {
        instituto: '9001',
        descripcionLista: 'Publico en General',
        formula: '(CostoIni + CostoFin) / 2 * factor_demanda',
        precio: 30000,
      },
    },
    {
      id: 3,
      lista: '9001-000000000003',
      tipoCambio: 'eliminado',
      hora: '02:15 pm',
      usuario: 'ADMIN',
      detalles: {
        instituto: '9001',
        descripcionLista: 'Publico en General',
        formula: '(CostoIni + CostoFin) / 2 * factor_demanda',
        precio: 25000,
      },
    },
    // Más registros según sea necesario.
  ];

  const handleRowClick = (item) => {
    setSelectedItem(item);
  };

  const closePopup = () => {
    setSelectedItem(null);
  };

  return (
    <div className="historial">
      <header className="historial-header">
      <i class="fa-solid fa-clock-rotate-left"></i>
        <h3 className="historial-title">Historial de Modificaciones</h3>

    
      </header>

      <table className="tabla-historial">
        <thead>
          <tr>
            <th>ID</th>
            <th>Lista</th>
            <th>Tipo de Modificación</th>
            <th>Hora</th>
            <th>Usuario</th>
          </tr>
        </thead>
        <tbody>
          {datosHistorial.map((item) => (
            <tr key={item.id} onClick={() => handleRowClick(item)}>
              <td>{item.id}</td>
              <td>{item.lista}</td>
              <td>
  <span className={`tipo-modificacion-${item.tipoCambio}`}>
    {item.tipoCambio.charAt(0).toUpperCase() + item.tipoCambio.slice(1)}
  </span>
</td>

              <td>{item.hora}</td>
              <td>{item.usuario}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedItem && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h3>Detalles de Modificación</h3>
            <p><strong>Instituto:</strong> {selectedItem.detalles.instituto}</p>
            <p><strong>Descripción Lista:</strong> {selectedItem.detalles.descripcionLista}</p>
            <p><strong>Fórmula:</strong> {selectedItem.detalles.formula}</p>
            <p><strong>Precio:</strong> {selectedItem.detalles.precio}</p>
            <button onClick={closePopup}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Historial;
