// reducers/listasTablasGeneralReducer.js
const initialState = {
  listasTablasGeneral: [],
  loading: false,
  error: null
};

const listasTablasGeneralReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_LISTAS_TABLAS_GENERAL_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_LISTAS_TABLAS_GENERAL_SUCCESS':
      return { ...state, loading: false, listasTablasGeneral: action.payload };
    case 'FETCH_LISTAS_TABLAS_GENERAL_FAILURE':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default listasTablasGeneralReducer;
