import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Asegúrate de tener el rootReducer correctamente

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production', // Asegúrate de que esté habilitado solo en desarrollo
});

export default store;
