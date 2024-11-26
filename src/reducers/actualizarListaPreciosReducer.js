const initialState = {
    loading: false,
    success: false,
    error: null,
  };
  
  const actualizarListaPreciosReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LISTA_PRECIOS_UPDATE_REQUEST':
        return {
          ...state,
          loading: true,
          success: false,
          error: null,
        };
      case 'LISTA_PRECIOS_UPDATE_SUCCESS':
        return {
          ...state,
          loading: false,
          success: true,
          error: null,
        };
      case 'LISTA_PRECIOS_UPDATE_FAIL':
        return {
          ...state,
          loading: false,
          success: false,
          error: action.payload, // El mensaje de error enviado
        };
      default:
        return state;
    }
  };
  
  export default actualizarListaPreciosReducer;
  