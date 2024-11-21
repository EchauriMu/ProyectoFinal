const initialState = {
    precioData: [], // Datos de los precios
    loading: false,
    error: null,
  };
  
  const deletePresentacionReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'DELETE_PRESENTACION_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case 'DELETE_PRESENTACION_SUCCESS':
        // Filtrar y eliminar el precio de la lista usando idPresentaOK
        const { id, idPresentaOK } = action.payload;
        const updatedPrecioData = state.precioData.filter(
          (item) => item.IdPresentaOK !== idPresentaOK
        );
        return {
          ...state,
          loading: false,
          precioData: updatedPrecioData, // Actualiza el estado eliminando la presentación
        };
  
      case 'DELETE_PRESENTACION_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.error,
        };
  
      default:
        return state;
    }
  };
  
  export default deletePresentacionReducer;