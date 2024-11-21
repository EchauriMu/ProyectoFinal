import { combineReducers } from 'redux';
import listasTablasGeneralReducer from './listasTablasGeneralReducer';
import precioReducer from './precioReducer';
import deletePrecioReducer from './deleteListReducer';
import crearListaPreciosReducer from './crearListaPreciosReducer'; 
import putPrecioReducer from './putPrecioReducer'; 
import postPrecioReducer from './postPrecioReducer'; 
import deletePresentacionReducer from './deletePresentacionReducer';

const rootReducer = combineReducers({
  listasTablasGeneral: listasTablasGeneralReducer, // reducer para la lista genera de listas xd
  precio: precioReducer, //  el reducer para manejar los precios
  deletePrecio: deletePrecioReducer, // el reducer para manejar la eliminación de precios
  putPrecio: putPrecioReducer, //  el reducer para manejear la actualización de un precio
  postPrecio: postPrecioReducer, // el reducer para manejar la agregación de un precio
  deletePresentacion : deletePresentacionReducer, // el reducer para manejar la eliminación de una presentación
  crearListaPrecios: crearListaPreciosReducer, // el reducer para crear listas
});

export default rootReducer;
