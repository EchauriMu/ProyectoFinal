const initialState = {
  precioData: [], // Datos de los precios
  loading: false,
  error: null,
};

const putPrecioReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PRECIO_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'UPDATE_PRECIO_SUCCESS':
      // Aquí actualizas los datos de precio en el estado local sin necesidad de hacer un nuevo fetch
      const updatedPrecioData = action.payload;
      const updatedPrecioDataList = state.precioData.map(item =>
        item.IdPresentaOK === updatedPrecioData.IdPresentaOK ? updatedPrecioData : item
      );
      return {
        ...state,
        loading: false,
        precioData: updatedPrecioDataList, // Actualizar el estado local con el precio actualizado
      };

    case 'UPDATE_PRECIO_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default putPrecioReducer;