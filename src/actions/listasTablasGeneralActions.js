// actions/listasTablasGeneralActions.js
export const fetchListasTablasGeneral = () => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_LISTAS_TABLAS_GENERAL_REQUEST' });

    try {
      const response = await fetch('http://localhost:3020/api/v1/listas-precios'); 
      const data = await response.json();
      dispatch({ type: 'FETCH_LISTAS_TABLAS_GENERAL_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_LISTAS_TABLAS_GENERAL_FAILURE', error: error.message });
    }
  };
};

// actions/listasTablasGeneralActions.js
export const fetchPrecioById = (id) => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_PRECIO_REQUEST' });

    try {
  
      const response = await fetch(`http://localhost:3020/api/v1/listas-precios/${id}`);
      const data = await response.json();
      
      dispatch({ type: 'FETCH_PRECIO_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_PRECIO_FAILURE', error: error.message });
    }
  };
};

// actions/precioActions.js
// actions/precioActions.js
export const deletePrecioAction = (id) => {
  return async (dispatch) => {
    dispatch({ type: 'DELETE_PRECIO_REQUEST' });  // Indica que se está haciendo la solicitud de eliminación

    try {
      const response = await fetch(`http://localhost:3020/api/v1/listas-precios/${id}`, {
        method: 'DELETE',  // Usamos el método DELETE
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el precio');
      }

      dispatch({ type: 'DELETE_PRECIO_SUCCESS', payload: id });  // El precio se ha eliminado correctamente

      // Ahora, después de eliminar, volvemos a obtener la lista de precios
      dispatch(fetchListasTablasGeneral());
    } catch (error) {
      dispatch({ type: 'DELETE_PRECIO_FAILURE', error: error.message });  // En caso de error
    }
  };
};


export const crearListaPrecios = (formData) => {
  return async (dispatch) => {
    dispatch({ type: 'CREAR_LISTA_PRECIOS_REQUEST' });

    try {
      const response = await fetch('http://localhost:3020/api/v1/listas-precios/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al crear la lista de precios');
      }

      const data = await response.json();

      dispatch({
        type: 'CREAR_LISTA_PRECIOS_SUCCESS',
        payload: data,
      });

      dispatch(fetchListasTablasGeneral()); // Obtener lista actualizada
    } catch (error) {
      dispatch({
        type: 'CREAR_LISTA_PRECIOS_FAILURE',
        error: error.message,
      });

      // Re-lanzar el error para que el .catch del componente lo capture
      throw error;
    }
  };
};
