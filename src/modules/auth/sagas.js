
import { RequestFailed } from "../../config/alert";
import api from "../../config/api";
import { CADASTRO_REQUEST, LOGIN_REQUEST, SOLICITAR_SENHA_REQUEST, CADASTRO_CORRETOR_REQUEST, CADASTRO_IMAGE_JOGADOR_REQUEST } from "./../../utils/constants";
import { all, takeLatest, put, call } from "redux-saga/effects";
import { LoginSuccess, LoginFailed, CadastroFailed, CadastroSuccess, SolicitarSenhaSuccess, SolicitarSenhaFailed, CadastroCorretorFailed, CadastroCorretorSuccess, CadastroJogadorSuccess, CadastroJogadorFailed } from "./actions";

export function* AuthLogin(payload) {
  try {
    const response = yield call(api.post, '/api/login', payload.payload);
    yield put(LoginSuccess(response));
  } catch (error) {
    yield put(LoginFailed());
   yield put(RequestFailed(error));
  }
}

export function* CadastroJogador(payload) {
  try {
    const response = yield call(api.post, '/api/upload-jogadores', payload.payload);
    yield put(CadastroJogadorSuccess(response));
  } catch (error) {
    yield put(CadastroJogadorFailed());
   yield put(RequestFailed(error));
  }
}

export function* AuthCadastro(payload) {
  try {
    const token = payload?.payload?.token;
    api.defaults.headers.common.recaptcha = token;
    const response = yield call(api.post, '/clientes/cadastrar', payload.payload);
    delete api.defaults.headers.common.recaptcha;
    payload?.payload?.callback?.();
    yield put(CadastroSuccess(response));
  } catch (error) {
    yield put(CadastroFailed());
    yield put(RequestFailed(error));
  }
}


export function* CadastroCorretor(payload) {
  const { callback } = payload.payload;
  try {
    const token = payload?.payload?.token;
    api.defaults.headers.common.recaptcha = token;
    const response = yield call(api.post, '/clientes/corretor/cadastrar', payload.payload);
    delete api.defaults.headers.common.recaptcha;
    yield put(CadastroCorretorSuccess(response));
    callback(response.data);
  } catch (error) {
    yield put(CadastroCorretorFailed(error));
    yield put(RequestFailed(error));
  }
}



export function* AuthRecuperarSenha(payload) {
  try {
    const token = payload?.payload?.token;
    api.defaults.headers.common.recaptcha = token;
    const response = yield call(api.post, '/clientes/solicitar-nova-senha', payload.payload);
    delete api.defaults.headers.common.recaptcha;
    payload?.payload?.callback?.();
    yield put(SolicitarSenhaSuccess(response));
  } catch (error) {
    yield put(SolicitarSenhaFailed());
    yield put(RequestFailed(error));
  }
}

export default all([
  takeLatest(LOGIN_REQUEST, AuthLogin),
  takeLatest(CADASTRO_IMAGE_JOGADOR_REQUEST, CadastroJogador),
  takeLatest(CADASTRO_REQUEST, AuthCadastro),
  takeLatest(SOLICITAR_SENHA_REQUEST, AuthRecuperarSenha),
  takeLatest(CADASTRO_CORRETOR_REQUEST, CadastroCorretor),

]);
