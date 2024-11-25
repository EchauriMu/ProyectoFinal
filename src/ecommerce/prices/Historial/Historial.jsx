import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import HistorialListas from './HistorialListas';
import PresentacionHistorial from './PresentacionHistorial';
import RegistroHistorial from './RegistroHistorial';
import EditModal from './EditModal'; // Modal dedicada a la edición
import '../assets/Historial.css';

const Historial = () => {
  const [listas, setListas] = useState([]);
  const [selectedLista, setSelectedLista] = useState(null);
  const [selectedPresentaOK, setSelectedPresentaOK] = useState(null);
  const [editingRegistro, setEditingRegistro] = useState(null);

  // Función para obtener datos
  const fetchListas = useCallback(() => {
    axios
      .get(`${import.meta.env.VITE_REST_API_PRECIOS}/historial/Listas/`)
      .then((response) => {
        setListas(response.data);
        setSelectedLista(null); // Resetea las selecciones si es necesario
        setSelectedPresentaOK(null);
      })
      .catch((error) => {
        console.error('Error al obtener las listas:', error);
      });
  }, []);

  useEffect(() => {
    fetchListas(); // Llamada inicial
  }, [fetchListas]);

  const handleListaClick = (lista) => {
    setSelectedLista(lista);
    setSelectedPresentaOK(null); // Resetear la presentación seleccionada
  };

  const handlePresentaOKClick = (presentaOK) => {
    setSelectedPresentaOK(presentaOK);
  };

  const handleEditRegistro = (registro) => {
    setEditingRegistro(registro);
  };

  const handleDeleteHistorial = (idPresentaOK) => {
    confirmAlert({
      title: 'Confirmación de eliminación',
      message: '¿Estás seguro de eliminar este historial?',
      buttons: [
        {
          label: 'Sí',
          onClick: () => {
            axios
              .delete(`${import.meta.env.VITE_REST_API_PRECIOS}/historial/${selectedLista.IdListaOK}/historial/${idPresentaOK}`)
              .then(() => {
                fetchListas(); // Refrescar después de eliminar
              })
              .catch((error) => console.error('Error al eliminar historial:', error));
          },
        },
        { label: 'No' },
      ],
    });
  };

  const handleDeleteRegistro = (registroId) => {
    confirmAlert({
      title: 'Confirmación de eliminación',
      message: '¿Estás seguro de eliminar este registro?',
      buttons: [
        {
          label: 'Sí',
          onClick: () => {
            axios
              .delete(
                `${import.meta.env.VITE_REST_API_PRECIOS}/historial/${selectedLista.IdListaOK}/historial/${selectedPresentaOK.IdPresentaOK}/${registroId}`
              )
              .then(() => {
                fetchListas(); // Refrescar después de eliminar
              })
              .catch((error) => console.error('Error al eliminar registro:', error));
          },
        },
        { label: 'No' },
      ],
    });
  };

  return (
    <div className="historial">
      <div className="TablaHistorial">
        <HistorialListas
          listas={listas}
          onListaClick={handleListaClick}
           // Pasar la función de recarga como prop
        />

        {selectedLista && (
          <PresentacionHistorial
            lista={selectedLista}
            onPresentaOKClick={handlePresentaOKClick}
            onDeleteHistorial={handleDeleteHistorial}
          />
        )}

        {selectedPresentaOK && (
          <RegistroHistorial
            presentaOK={selectedPresentaOK}
            onEditRegistro={handleEditRegistro}
            onDeleteRegistro={handleDeleteRegistro}
          />
        )}

        {editingRegistro && (
          <EditModal
            registro={editingRegistro}
            onClose={() => setEditingRegistro(null)}
            selectedLista={selectedLista}
            selectedPresentaOK={selectedPresentaOK}
            setSelectedPresentaOK={setSelectedPresentaOK}
          />
        )}
      </div>
    </div>
  );
};

export default Historial;
