// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import listasTablasGeneralReducer from './reducers/listasTablasGeneralReducer';

// Configuración del store con el reducer
const store = configureStore({
  reducer: {
    listasTablasGeneral: listasTablasGeneralReducer, // Este es el reducer para la lista de datos que se obtiene desde l api
  },
});

export default store;
