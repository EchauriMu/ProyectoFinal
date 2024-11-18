// reducers/index.js
import { combineReducers } from 'redux';
import listasTablasGeneralReducer from './listasTablasGeneralReducer';
import precioReducer from './precioReducer'; // Importamos el reducer original para manejar los precios
import deletePrecioReducer from './deleteListReducer'; // Importamos el nuevo reducer para eliminar precios
import putPrecioReducer from './putPrecioReducer'; // Importamos el nuevo reduces para actulizar un precio
import postPrecioReducer from './postPrecioReducer'; // Importamos el nuevo reduces para eliminar una presentacion
import deletePresentacionReducer from './deletePresentacionReducer';

const rootReducer = combineReducers({
  listasTablasGeneral: listasTablasGeneralReducer, // Mantén este reducer si es necesario
  precio: precioReducer, // Agregamos el reducer para manejar los precios
  deletePrecio: deletePrecioReducer, // Agregamos el reducer para manejar la eliminación de precios
  putPrecio: putPrecioReducer, // Agregamos el reducer para manejear la actualización de un precio
  postPrecio: postPrecioReducer, // Agregamos el reducer para manejar la agregación de un precio
  deletePresentacion : deletePresentacionReducer // Agregamos el reducer para manejar la eliminación de una presentación
});

export default rootReducer;
