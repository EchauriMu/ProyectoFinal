// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Usamos el rootReducer combinado

const store = configureStore({
  reducer: rootReducer, // Utilizamos el nuevo rootReducer
});

export default store;
