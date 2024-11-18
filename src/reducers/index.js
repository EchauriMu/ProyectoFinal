import { combineReducers } from 'redux';
import listasTablasGeneralReducer from './listasTablasGeneralReducer';
import precioReducer from './precioReducer';
import deletePrecioReducer from './deleteListReducer';
import crearListaPreciosReducer from './crearListaPreciosReducer'; // Nuevo reducer

const rootReducer = combineReducers({
  listasTablasGeneral: listasTablasGeneralReducer,
  precio: precioReducer,
  deletePrecio: deletePrecioReducer,
  crearListaPrecios: crearListaPreciosReducer, // Agregamos el reducer para crear listas
});

export default rootReducer;
