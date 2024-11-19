import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/DetalleModal.css'; // Agrega estilos específicos para el modal

const DetalleModal = ({ idListaOK, onClose }) => {
  const [detalleData, setDetalleData] = useState(null);

  useEffect(() => {
    const fetchDetalleData = async () => {
      try {
        const response = await axios.get(`/api/detalle/${idListaOK}`); // Reemplaza con tu endpoint
        setDetalleData(response.data);
      } catch (error) {
        console.error('Error al obtener detalles:', error);
      }
    };

    fetchDetalleData();
  }, [idListaOK]);

  if (!detalleData) return <p>Cargando detalles...</p>;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h3>Detalles de la Lista {idListaOK}</h3>
        <p><strong>Instituto:</strong> {detalleData.instituto}</p>
        <p><strong>Descripción:</strong> {detalleData.descripcionLista}</p>
        <p><strong>Fórmula:</strong> {detalleData.formula}</p>
        <p><strong>Precio:</strong> {detalleData.precio}</p>
      </div>
    </div>
  );
};

export default DetalleModal;
