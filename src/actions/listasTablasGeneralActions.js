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
console.log(`http://localhost:3020/api/v1/listas-precios/${id}`);
      const data = await response.json();
      dispatch({ type: 'FETCH_PRECIO_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_PRECIO_FAILURE', error: error.message });
    }
  };
};
