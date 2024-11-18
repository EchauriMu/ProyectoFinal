const initialState = {
    loading: false,
    nuevaLista: null,
    error: null,
  };
  
  const crearListaPreciosReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CREAR_LISTA_PRECIOS_REQUEST':
        return { ...state, loading: true };
      case 'CREAR_LISTA_PRECIOS_SUCCESS':
        return {
          ...state,
          loading: false,
          nuevaLista: action.payload,
        };
      case 'CREAR_LISTA_PRECIOS_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default crearListaPreciosReducer;
  