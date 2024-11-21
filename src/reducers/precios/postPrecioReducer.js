const initialState = {
    precioData: [], // Datos de los precios
    loading: false,
    error: null,
  };
  
  const postPrecioReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'POST_PRECIO_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case 'POST_PRECIO_SUCCESS':
        // Aquí agregas el nuevo precio a la lista de precioData
        const newPrecioData = action.payload; // El nuevo precio creado
        return {
          ...state,
          loading: false,
          precioData: [...state.precioData, newPrecioData], // Agregar el nuevo precio al estado
        };
  
      case 'POST_PRECIO_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.error,
        };
  
      default:
        return state;
    }
  };
  
  export default postPrecioReducer;
  