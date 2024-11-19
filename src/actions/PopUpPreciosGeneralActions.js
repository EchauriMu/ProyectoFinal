import { fetchPrecioById } from "./listasTablasGeneralActions";
// actions/PopUpPreciosGeneralActions.js
export const postPrecio = (id ,precioData) => {
  return async (dispatch) => {
    dispatch({ type: 'POST_PRECIO_REQUEST' });

    try {
      // Hacemos una solicitud POST al servidor para crear un nuevo precio
      const response = await fetch(`http://localhost:3020/api/v1/listas-precios/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(precioData), // Enviamos los datos para crear el nuevo precio
      });
      console.log(JSON.stringify(precioData, null, 2));

      if (!response.ok) {
        throw new Error('Error al crear el precio');
      }

      const data = await response.json();
      console.log("Respuesta del servidor:", data);
      dispatch(fetchPrecioById(id));
      dispatch({ type: 'POST_PRECIO_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'POST_PRECIO_FAILURE', error: error.message });
    }
  };
};


// actions/PopUpPreciosGeneralActions.js

export const putPrecioById = (id, precioData) => {
  return async (dispatch) => {
    dispatch({ type: 'UPDATE_PRECIO_REQUEST' });

    try {
      // Hacemos una solicitud PUT al servidor para actualizar el precio
      const response = await fetch(`http://localhost:3020/api/v1/listas-precios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(precioData) // Enviamos los datos a actualizar
      });
       console.log (JSON.stringify(precioData, null, 2))

      if (!response.ok) {
        throw new Error('Error al actualizar el precio');
      }

      const data = await response.json();
      dispatch(fetchPrecioById(id));
      console.log("Respuesta del servidor:", data);
      dispatch({ type: 'UPDATE_PRECIO_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'UPDATE_PRECIO_FAILURE', error: error.message });
    }
  };
};

// actions/PopUpPreciosGeneralActions.js
export const deletePresentacionAction = (id, idPresentaOK) => {
  return async (dispatch) => {
    dispatch({ type: 'DELETE_PRESENTACION_REQUEST' });  // Indica que se está haciendo la solicitud de eliminación

    try {
      const response = await fetch(`http://localhost:3020/api/v1/listas-precios/${id}/precio/${idPresentaOK}`, {
        method: 'DELETE',  // Usamos el método DELETE
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el precio');
      }

      dispatch({ type: 'DELETE_PRESENTACION_SUCCESS', payload: id , idPresentaOK});  // El precio se ha eliminado correctamente

      // Ahora, después de eliminar, volvemos a obtener la lista de precios
      dispatch(fetchPrecioById(id));
    } catch (error) {
      dispatch({ type: 'DELETE_PRESENTACION_FAILURE', error: error.message });  // En caso de error
    }
  };
};
