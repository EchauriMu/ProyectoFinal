// reducers/index.js
import { combineReducers } from 'redux';
import listasTablasGeneralReducer from './listasTablasGeneralReducer';
import precioReducer from './precioReducer'; // Importamos el nuevo reducer

const rootReducer = combineReducers({
  listasTablasGeneral: listasTablasGeneralReducer,
  precio: precioReducer, // Agregamos el nuevo reducer al root
});

export default rootReducer;
