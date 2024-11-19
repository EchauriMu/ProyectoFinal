import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Importa la librería de confirmación
import 'react-confirm-alert/src/react-confirm-alert.css'; // Estilos para la confirmación
import '../assets/Historial.css';

const Historial = () => {
  const [listas, setListas] = useState([]); // Para almacenar las listas
  const [selectedLista, setSelectedLista] = useState(null); // Para la lista seleccionada
  const [selectedPresentaOK, setSelectedPresentaOK] = useState(null); // Para el presentaOK seleccionado

  // Cargar listas desde la API
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_REST_API_PRECIOS}/listas-precios`)
      .then((response) => {
        console.log(`${import.meta.env.VITE_REST_API_PRECIOS}/listas-precios`);
        console.log(response.data);
        setListas(response.data); // Suponiendo que la respuesta es un arreglo de listas
      })
      .catch((error) => {
        console.error("Hubo un error al obtener las listas:", error);
      });
  }, []);

  const handleListaClick = (lista) => {
    setSelectedLista(lista); // Mostrar el historial de la lista seleccionada
  };

  const handlePresentaOKClick = (idPresentaOK) => {
    // Consultar detalles de historial por IdPresentaOK
    const presentaOK = selectedLista.historial.find(item => item.IdPresentaOK === idPresentaOK);
    setSelectedPresentaOK(presentaOK);
  };

  const closePopup = () => {
    setSelectedLista(null);
    setSelectedPresentaOK(null);
  };

  // Función para eliminar historial con confirmación
  const handleDeleteHistorial = (idPresentaOK) => {
    confirmAlert({
      title: 'Confirmación de eliminación',
      message: '¿Estás seguro de que deseas eliminar este historial?',
      buttons: [
        {
          label: 'Sí',
          onClick: () => {
            axios.delete(`${import.meta.env.VITE_REST_API_PRECIOS}/historial/${selectedLista.IdListaOK}/historial/${idPresentaOK}`)
              .then((response) => {
               
                // Actualizar el estado de la lista después de la eliminación
                const updatedListas = listas.map((lista) => {
                  if (lista._id === selectedLista._id) {
                    lista.historial = lista.historial.filter((item) => item.IdPresentaOK !== idPresentaOK);
                  }
                  return lista;
                });
                setListas(updatedListas);
              })
              .catch((error) => {
                console.error("Error al eliminar el historial:", error);
              });
          }
        },
        {
          label: 'No',
          onClick: () => console.log('Eliminación cancelada')
        }
      ]
    });
  };

//FUNCION PARA ELIMINAR REGISTROS DE UN HISTORIAL
const handleDeleteRegistro = (registroId) => {
  confirmAlert({
    title: 'Confirmación de eliminación',
    message: '¿Estás seguro de que deseas eliminar este registro?',
    buttons: [
      {
        label: 'Sí',
        onClick: () => {
          // Actualizar el estado de selectedPresentaOK
          setSelectedPresentaOK((prev) => {
            const updatedHistorial = prev.historial.filter((item) => item.Id !== registroId);
            return { ...prev, historial: updatedHistorial };
          });

          // Opcional: también actualizar en el backend si es necesario
          axios.delete(`${import.meta.env.VITE_REST_API_PRECIOS}/historial/${selectedLista.IdListaOK}/historial/${selectedPresentaOK.IdPresentaOK}/${registroId}`)
            .then(() => {
              console.log('Registro eliminado correctamente');
            })
            .catch((error) => {
              console.error('Error al eliminar el registro:', error);
            });
        },
      },
      {
        label: 'No',
        onClick: () => console.log('Eliminación cancelada'),
      },
    ],
  });
};


  return (
    <div className="historial">
      <header className="historial-header">
        <i className="fa-solid fa-clock-rotate-left"></i>
        <h3 className="historial-title">Historial de Modificaciones</h3>

        <input type="text" placeholder="Buscar por lista" className="buscador" />
        <span className="EditarBtn"><i className="fa-solid fa-arrow-up-from-bracket"></i>Exportar</span>
        <button className="boton-filtro">Filtrar</button>
      </header>

      <table className="tabla-historial">
        <thead>
          <tr>
            <th>ID Lista</th>
            <th>Descripción Lista</th>
          </tr>
        </thead>
        <tbody>
          {listas.map((lista) => (
            <tr key={lista._id} onClick={() => handleListaClick(lista)}>
              <td>{lista.IdListaOK}</td>
              <td>{lista.DesLista}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedLista && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h3>Historial de la Lista: {selectedLista.DesLista}</h3>

            <h4>Historial</h4>
            <table>
              <thead>
                <tr>
                  <th>IdPresentaOK</th>
              
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {selectedLista.historial.map((item) => (
                  <tr key={item.IdPresentaOK} onClick={() => handlePresentaOKClick(item.IdPresentaOK)}>
                    <td>{item.IdPresentaOK}</td>
                    <td>{item.tipoCambio}</td>
                    <td>{item.fecha}</td>
                    <td>
                      <button className="boton-eliminar" onClick={() => handleDeleteHistorial(item.IdPresentaOK)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {selectedPresentaOK && (
              <div>
                <h4>Registros de {selectedPresentaOK.IdPresentaOK}</h4>
                <table>
                  <thead>
                    <tr>
                      
                      <th>ID</th>
                      <th>Fecha</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPresentaOK.historial.map((subHistorial) => (
                      <tr key={subHistorial.Id}>
                        <td>{subHistorial.Id}</td>
                        <td>{subHistorial.detail_row?.detail_row_reg[0]?.FechaReg || 'Sin fecha'}</td>
                        <td>
                        <button className="boton-eliminar" onClick={() => handleDeleteRegistro(subHistorial.Id)}>
                          Eliminar
                        </button>
                      </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <button onClick={closePopup}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Historial;
