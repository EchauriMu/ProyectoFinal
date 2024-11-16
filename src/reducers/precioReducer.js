// reducers/precioReducer.js
const initialState = {
    precioData: [],
    loading: false,
    error: null,
  };
  
  const precioReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_PRECIO_REQUEST':
        return { ...state, loading: true, error: null };
      case 'FETCH_PRECIO_SUCCESS':
        return { ...state, loading: false, precioData: action.payload };
      case 'FETCH_PRECIO_FAILURE':
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  };
  
  export default precioReducer;
  