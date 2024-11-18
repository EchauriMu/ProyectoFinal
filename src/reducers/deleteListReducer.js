// reducers/deletePrecioReducer.js
const initialState = {
  precioData: [],  // Lista de precios
  loading: false,  // Indicador de carga
  error: null,     // Manejo de errores
};

const deletePrecioReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DELETE_PRECIO_REQUEST':
      return { ...state, loading: true, error: null };

    case 'DELETE_PRECIO_SUCCESS':
      return {
        ...state,
        loading: false,
        precioData: state.precioData.filter((precio) => precio.id !== action.payload),
      };

    case 'DELETE_PRECIO_FAILURE':
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};

export default deletePrecioReducer;
