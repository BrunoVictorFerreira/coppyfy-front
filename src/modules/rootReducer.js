import { combineReducers } from 'redux';
import AuthReducer from './auth';
import UsuarioReducer from './usuario';
import UtilReducer from './utils';

const rootReducer = combineReducers({
  auth: AuthReducer,
  usuario: UsuarioReducer,
  util: UtilReducer
});

export default rootReducer;
