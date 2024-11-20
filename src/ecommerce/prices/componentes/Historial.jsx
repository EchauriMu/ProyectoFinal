import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Importa la librería de confirmación
import 'react-confirm-alert/src/react-confirm-alert.css'; // Estilos para la confirmación
import '../assets/Historial.css';

const Historial = () => {
  const [listas, setListas] = useState([]); // Para almacenar las listas
  const [selectedLista, setSelectedLista] = useState(null); // Para la lista seleccionada
  const [selectedPresentaOK, setSelectedPresentaOK] = useState(null); // Para el presentaOK seleccionado
  const [editingRegistro, setEditingRegistro] = useState(null); // Registro en edición
  const [formData, setFormData] = useState({
    Id: '',
    IdTipoFormulaOK: '',
    Formula: '',
    CostoIni: 0,
    CostoFin: 0,
    Precio: 0,
    detail_row: {
      Activo: '',
      Borrado: '',
      detail_row_reg: [
        {
          FechaReg: '',
          UsuarioReg: '',
        },
      ],
    },
  });

  //
  useEffect(() => {
    setEditingRegistro(null); // Cerrar formulario
    setFormData({
      Id: '',
      IdTipoFormulaOK: '',
      Formula: '',
      CostoIni: 0,
      CostoFin: 0,
      Precio: 0,
      detail_row: {
        Activo: '',
        Borrado: '',
        detail_row_reg: [{ FechaReg: '', UsuarioReg: '' }],
      },
    });
  }, [selectedLista, selectedPresentaOK]);
  
  //Funcion para mostrar el formulario
  const handleEditRegistro = (registro) => {
    setEditingRegistro(registro.Id);
    setFormData(registro); // Cargar datos del registro en el formulario
  };

  //FUNCION SOLICITUD de PUT
  const handleUpdateRegistro = (e) => {
    e.preventDefault();
  
    const { Id } = formData; // Obtén el ID del registro en edición
    axios
      .put(`${import.meta.env.VITE_REST_API_PRECIOS}/historial/${selectedLista.IdListaOK}/historial/${selectedPresentaOK.IdPresentaOK}/${Id}`, formData)
      .then(() => {
        // Actualiza la lista local con los nuevos datos
        setSelectedPresentaOK((prev) => {
          const updatedHistorial = prev.historial.map((item) =>
            item.Id === Id ? formData : item
          );
          return { ...prev, historial: updatedHistorial };
        });
        setEditingRegistro(null);
        console.log('Registro actualizado con éxito');
      })
      .catch((error) => {
        console.error('Error al actualizar el registro:', error);
      });
  };
  


  // Cargar listas desde la API
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_REST_API_PRECIOS}/historial/Listas/`)
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
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPresentaOK.historial.map((subHistorial) => (
                      <tr key={subHistorial.Id}>
                        <td>{subHistorial.Id}</td>
                        <td>{subHistorial.detail_row?.detail_row_reg[0]?.FechaReg || 'Sin fecha'}</td>
                        <td>
                        {/* Botón de Editar */}
                        <button className="editar-btn" onClick={() => handleEditRegistro(subHistorial)}>Editar</button>
                        
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

            {editingRegistro && (
              <div>
              <form onSubmit={handleUpdateRegistro}>
                <label>ID:</label>
                <input
                  type="text"
                  value={formData.Id}
                  onChange={(e) => setFormData({ ...formData, Id: e.target.value })}
                  disabled
                />
                <label>IdTipoFormulaOK:</label>
                <input
                  type="text"
                  value={formData.IdTipoFormulaOK}
                  onChange={(e) => setFormData({ ...formData, IdTipoFormulaOK: e.target.value })}
                />
                <label>Formula:</label>
                <input
                  type="text"
                  value={formData.Formula}
                  onChange={(e) => setFormData({ ...formData, Formula: e.target.value })}
                />
                <label>CostoIni:</label>
                <input
                  type="number"
                  value={formData.CostoIni}
                  onChange={(e) => setFormData({ ...formData, CostoIni: e.target.value })}
                />
                <label>CostoFin:</label>
                <input
                  type="number"
                  value={formData.CostoFin}
                  onChange={(e) => setFormData({ ...formData, CostoFin: e.target.value })}
                />
                <label>Precio:</label>
                <input
                  type="number"
                  value={formData.Precio}
                  onChange={(e) => setFormData({ ...formData, Precio: e.target.value })}
                />
                
                <button type="submit">Guardar</button>
                <button type="button" onClick={() => setEditingRegistro(null)}>Cancelar</button>
              </form>
              </div>
            )}




            <button className="CERRAR" onClick={closePopup}>Cerrar</button>
          </div>
        </div>
      )}
    </div>

    
  );
};

export default Historial;