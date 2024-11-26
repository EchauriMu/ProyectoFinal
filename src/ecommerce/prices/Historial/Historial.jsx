import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import HistorialListas from './HistorialListas';
import PresentacionHistorial from './PresentacionHistorial';
import RegistroHistorial from './RegistroHistorial';
import EditModal from './EditModal'; // Modal dedicada a la edición
import '../assets/Historial.css';
import AddRegistroModal from "./AddRegistroModal";


const Historial = () => {
  const [listas, setListas] = useState([]);
  const [selectedLista, setSelectedLista] = useState(null);
  const [presentaciones, setPresentaciones] = useState([]); // Estado para la segunda tabla
  const [selectedPresentaOK, setSelectedPresentaOK] = useState(null);
  const [editingRegistro, setEditingRegistro] = useState(null);
  const [registros, setRegistros] = useState([]); // Nuevo estado para registros
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const maxId = registros.length > 0 ? Math.max(...registros.map((registro) => registro.Id), 0) : 0;


  const fetchRegistros = useCallback((IdPresentaOK) => {
    axios
      .get(`${import.meta.env.VITE_REST_API_PRECIOS}/historial/${selectedLista.IdListaOK}/historial/${IdPresentaOK}`)
      .then((response) => {
        const registrosAplanados = response.data.flatMap((presentacion) =>
          presentacion.historial.map((registro) => ({
            ...registro,
            IdPresentaOK: presentacion.IdPresentaOK, // Conserva el IdPresentaOK
          }))
        );
        setRegistros(registrosAplanados);
      })
      .catch((error) => {
        console.error('Error al obtener los registros:', error);
      });
  }, [selectedLista]);
  


 
  // Función para obtener listas
  const fetchListas = useCallback(() => {
    axios
      .get(`${import.meta.env.VITE_REST_API_PRECIOS}/historial/Listas/`)
      .then((response) => {
        setListas(response.data);
        setSelectedLista(null); // Resetea las selecciones si es necesario
        setPresentaciones([]); // Resetea las presentaciones
      })
      .catch((error) => {
        console.error('Error al obtener las listas:', error);
      });
  }, []);


  // Función para obtener presentaciones
  const fetchPresentaciones = (idListaOK) => {
    axios
      .get(`${import.meta.env.VITE_REST_API_PRECIOS}/historial/${idListaOK}/historial`)
      .then((response) => {
        setPresentaciones(response.data);
        setSelectedPresentaOK(null); // Resetea la selección de presentaciones
      })
      .catch((error) => {
        console.error('Error al obtener las presentaciones:', error);
      });
  };


  const handleEditRegistro = (registro) => {
    setEditingRegistro(registro);
  };

  const handleAddRegistro = () => {
    setIsAddModalOpen(true);
  };
 


const handleDeleteSelected = (registroIds) => {
  confirmAlert({
    title: 'Confirmación de eliminación',
    message: '¿Estás seguro de eliminar los registros seleccionados?',
    buttons: [
      {
        label: 'Sí',
        onClick: () => {
          const deletePromises = registroIds.map((id) =>
            axios.delete(`${import.meta.env.VITE_REST_API_PRECIOS}/historial/${selectedLista.IdListaOK}/historial/${selectedPresentaOK.IdPresentaOK}/${id}`)
          );

          Promise.all(deletePromises)
            .then(() => {
              fetchRegistros(selectedPresentaOK.IdPresentaOK); // Recargar registros
            })
            .catch((error) => console.error('Error al eliminar registros:', error));
        },
      },
      { label: 'No' },
    ],
  });
};


  useEffect(() => {
    fetchListas(); // Llamada inicial
  }, [fetchListas]);


  const handleListaClick = (lista) => {
    setSelectedLista(lista);
    fetchPresentaciones(lista.IdListaOK); // Obtén las presentaciones
  };


  const handlePresentaOKClick = (presentaOK) => {
    setSelectedPresentaOK(presentaOK);
    setRegistros([]); // Limpia los registros actuales antes de cargar nuevos
    fetchRegistros(presentaOK.IdPresentaOK); // Llama para obtener los nuevos registros
  };





  return (
    <div className="historial">
      <div className="TablaHistorial">
        <HistorialListas
          listas={listas}
          onListaClick={handleListaClick}
        />


        {selectedLista && (
          <PresentacionHistorial
            presentaciones={presentaciones}
            onPresentaOKClick={handlePresentaOKClick}
          />
        )}


        {selectedPresentaOK && (
          <RegistroHistorial
          presentaOK={selectedPresentaOK}
          registros={registros}
          onEditRegistro={handleEditRegistro}
          onAddRegistro={handleAddRegistro}
          onDeleteSelected={handleDeleteSelected} // Pasar la nueva función
        />
        )}


        {editingRegistro && (
          <EditModal
            registro={editingRegistro}
            onClose={() => setEditingRegistro(null)}
            selectedLista={selectedLista}
            selectedPresentaOK={selectedPresentaOK}
            setRegistros={setRegistros} // Pasar el setter
          />
        )}
        {isAddModalOpen && (
        <AddRegistroModal
          onClose={() => setIsAddModalOpen(false)}
          selectedLista={selectedLista}
          selectedPresentaOK={selectedPresentaOK}
          setRegistros={setRegistros}
          maxId={Math.max(...registros.map((registro) => registro.Id), 0)} // Pasa el ID más alto
        />
      )}

      </div>
    </div>
  );
};
export default Historial;
