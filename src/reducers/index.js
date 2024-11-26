import { combineReducers } from 'redux';
import listasTablasGeneralReducer from './listasTablasGeneralReducer';
import precioReducer from './precioReducer';
import deletePrecioReducer from './deleteListReducer';
import crearListaPreciosReducer from './crearListaPreciosReducer'; 
import actualizarListaPreciosReducer from './actualizarListaPreciosReducer';




const rootReducer = combineReducers({
  listasTablasGeneral: listasTablasGeneralReducer, // reducer para la lista genera de listas xd
  precio: precioReducer, //  el reducer para manejar los precios
  deletePrecio: deletePrecioReducer, // el reducer para manejar la eliminación de precios
  crearListaPrecios: crearListaPreciosReducer, // el reducer para crear listas
  actualizarListaPrecios: actualizarListaPreciosReducer, // Reducer para actualizar listas

});

export default rootReducer;
