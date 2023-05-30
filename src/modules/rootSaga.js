import { all } from 'redux-saga/effects';
import AuthSaga from './auth/sagas';
import UsuarioSaga from './usuario/sagas';

export default function* rootSaga() {
  return yield all([
    AuthSaga,
    UsuarioSaga
  ]);
}
