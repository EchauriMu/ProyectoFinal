// actions/listasTablasGeneralActions.js
export const fetchListasTablasGeneral = () => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_LISTAS_TABLAS_GENERAL_REQUEST' });

    try {
      const response = await fetch('http://localhost:3020/api/v1/listas-precios'); // Reemplaza con tu URL de API
      const data = await response.json();
      dispatch({ type: 'FETCH_LISTAS_TABLAS_GENERAL_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_LISTAS_TABLAS_GENERAL_FAILURE', error: error.message });
    }
  };
};
