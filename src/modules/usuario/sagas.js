import api from '../../config/api';
import { RequestSuccess, RequestFailed } from '../../config/alert';
import {
  SOLICITAR_MES_AMARELO_REQUEST,
  CAD_ATU_ENDERECO_REQUEST,
  ATUALIZAR_DADOS_REQUEST,
  ATUALIZAR_SENHA_REQUEST,
  ATUALIZA_ACESSO_REQUEST,
  SOLICITAR_CONSULTA_GRATUITA_CAMED_REQUEST,
  SOLICITAR_CADASTRO_EMPRESARIAL_REQUEST,
  CREATE_GAME_REQUEST,
} from './../../utils/constants';
import { OpenCloseModal } from '../utils/actions';
import { all, takeLatest, put, call } from 'redux-saga/effects';
import { AlterarSenhaUpdateToken } from '../auth/actions';
import {
  AtualizarDadosFailed,
  AtualizarDadosSuccess,
  AtualizarSenhaFailed,
  AtualizarSenhaSuccess,
  CadAtualizarEnderecoFailed,
  CadAtualizarEnderecoSuccess,
  AtualizarAcessoSuccess,
  AtualizarAcessoFailed,
  SolicitarTeleconsultaSuccess,
  SolicitarTeleconsultaFailed,
  SolicitarTeleconsultaCamedSuccess,
  SolicitarTeleconsultaCamedFailed,
  CriarGameFailed,
  CriarGameSuccess,
} from './actions';


/**
 * Funçáo para realizar disparo de email de solicitaçao de cadastro empresarial
 */
 export function* CreateGame(payload) {
  try {
    const response = yield call(
      api.post,
      '/api/graphql',
      payload.payload,
    );
    yield put(CriarGameSuccess(response));
    payload?.payload?.callback?.();
    yield put(
      RequestSuccess(
        'Jogo Criado com sucesso!'
      )
    );
  } catch (error) {
    yield put(CriarGameFailed(error));
    yield put(RequestFailed(error));
  }
}
 export function* SolicitarCadastroEmpresarial(payload) {
  try {
    const token = payload?.payload?.token;
    api.defaults.headers.common.recaptcha = token;
    const response = yield call(
      api.post,
      '/clientes/solicitar-cadastro-empresarial',
      payload.payload,
      { params: payload.payload.token }
    );
    delete api.defaults.headers.common.recaptcha;
    yield put(SolicitarTeleconsultaCamedSuccess(response));
    payload?.payload?.callback?.();
    yield put(
      RequestSuccess(
        'Pronto! Solicitação concluída com sucesso! Em até 24hs úteis entraremos em contato.'
      )
    );
  } catch (error) {
    yield put(SolicitarTeleconsultaCamedFailed(error));
    yield put(RequestFailed(error));
  }
}

/**
 * Funçáo para realizar disparo de email consulta gratuita camed
 */
export function* solicitarConsultaGratuitaCamed(payload) {
  try {
    const response = yield call(
      api.post,
      '/clientes/solicitar-consulta-gratuita-camed',
      payload.payload
    );
    yield put(SolicitarTeleconsultaCamedSuccess(response));
    payload?.payload?.callback?.();
    yield put(
      RequestSuccess(
        'Pronto! Solicitação concluída com sucesso! Em até 24hs úteis entraremos em contato.'
      )
    );
  } catch (error) {
    yield put(SolicitarTeleconsultaCamedFailed(error));
    yield put(RequestFailed(error));
  }
}

/**
 * Funçáo para realizar disparo de email mes amare
 */

export function* solicitarTeleconsultaMesAmarelo(payload) {
  try {
    const response = yield call(
      api.post,
      '/clientes/solicitar-consulta-mes-amarelho',
      payload.payload
    );
    yield put(SolicitarTeleconsultaSuccess(response));
    payload?.payload?.callback?.();
    yield put(
      RequestSuccess(
        'Pronto! Em até 24h horas um dos nossos concierges da saúde irá entrar em contato com você!'
      )
    );
  } catch (error) {
    yield put(SolicitarTeleconsultaFailed(error));
    yield put(RequestFailed(error));
  }
}
export function* cadAtualizarEndereco(payload) {
  try {
    const response = yield call(
      api.post,
      '/clientes/cadastrar-atualizar-endereco',
      payload.payload
    );
    yield put(CadAtualizarEnderecoSuccess(response));
    payload?.payload?.RefechUsuario();
    yield put(OpenCloseModal(false));
    yield put(RequestSuccess(response));
  } catch (error) {
    yield put(CadAtualizarEnderecoFailed(error));
    yield put(RequestFailed(error));
  }
}

export function* atualizarDadosPessoais(payload) {
  const { colaborador } = payload.payload;
  try {
    const response = yield call(api.put, '/clientes/atualizar', null, {
      params: payload.payload,
    });
    yield put(AtualizarDadosSuccess(response));
    if (colaborador) {
      payload?.payload?.refetchColaborador?.();
    } else {
      payload?.payload?.refetchAssinantes?.();
    }

    payload?.payload?.RefechUsuario();

    yield put(OpenCloseModal(false));
    yield put(RequestSuccess(response));
  } catch (error) {
    yield put(AtualizarDadosFailed(error));
    yield put(RequestFailed(error));
  }
}

export function* atualizarSenhaLogada(payload) {
  try {
    const response = yield call(api.put, '/clientes/alterar-senha', null, {
      params: payload.payload,
    });
    yield put(AtualizarSenhaSuccess(response));
    yield put(AlterarSenhaUpdateToken(response));

    yield put(OpenCloseModal(false));
    yield put(RequestSuccess(response));
  } catch (error) {
    yield put(AtualizarSenhaFailed(error));
    yield put(RequestFailed(error));
  }
}

export function* atualizarDadosAcesso(payload) {
  try {
    const route = payload?.payload?.route || '/auth/login';
    const response = yield call(
      api.put,
      '/clientes/alterar-dados-accesso',
      null,
      { params: payload.payload }
    );
    yield put(AtualizarAcessoSuccess(response));
    yield put(RequestSuccess(response, route));
  } catch (error) {
    yield put(AtualizarAcessoFailed(error));
    yield put(RequestFailed(error));
  }
}

export default all([
  takeLatest(CREATE_GAME_REQUEST, CreateGame),
  takeLatest(CAD_ATU_ENDERECO_REQUEST, cadAtualizarEndereco),
  takeLatest(ATUALIZAR_DADOS_REQUEST, atualizarDadosPessoais),
  takeLatest(ATUALIZAR_SENHA_REQUEST, atualizarSenhaLogada),
  takeLatest(ATUALIZA_ACESSO_REQUEST, atualizarDadosAcesso),
  takeLatest(SOLICITAR_MES_AMARELO_REQUEST, solicitarTeleconsultaMesAmarelo),
  takeLatest(
    SOLICITAR_CONSULTA_GRATUITA_CAMED_REQUEST,
    solicitarConsultaGratuitaCamed
  ),
  takeLatest(
    SOLICITAR_CADASTRO_EMPRESARIAL_REQUEST,
    SolicitarCadastroEmpresarial
  )
]);
