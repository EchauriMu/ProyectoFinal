// reducers/index.js
import { combineReducers } from 'redux';
import listasTablasGeneralReducer from './listasTablasGeneralReducer';
import precioReducer from './precioReducer'; // Importamos el reducer original para manejar los precios
import deletePrecioReducer from './deleteListReducer'; // Importamos el nuevo reducer para eliminar precios

const rootReducer = combineReducers({
  listasTablasGeneral: listasTablasGeneralReducer, // Mantén este reducer si es necesario
  precio: precioReducer, // Agregamos el reducer para manejar los precios
  deletePrecio: deletePrecioReducer, // Agregamos el reducer para manejar la eliminación de precios
});

export default rootReducer;
