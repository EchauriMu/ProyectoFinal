// reducers/index.js
import { combineReducers } from 'redux';
import listasTablasGeneralReducer from './listasTablasGeneralReducer';  // Importar el nuevo reducer

const rootReducer = combineReducers({
  listasTablasGeneral: listasTablasGeneralReducer,  // Usar el nuevo reducer
});

export default rootReducer;
