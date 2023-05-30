import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  AUTH_PROVIDER_CHANGE,
  ATUALIZAR_ASSINATURA_ATIVA,
  CADASTRO_REQUEST,
  CADASTRO_SUCCESS,
  CADASTRO_FAILED,
  ALTERAR_SENHA_SUCCESS,
  SOLICITAR_SENHA_REQUEST,
  SOLICITAR_SENHA_SUCCESS,
  SOLICITAR_SENHA_FAILED,
  CADASTRO_CORRETOR_REQUEST,
  CADASTRO_CORRETOR_SUCCESS,
  CADASTRO_CORRETOR_FAILED,
  CADASTRO_IMAGE_JOGADOR_REQUEST,
  CADASTRO_IMAGE_JOGADOR_SUCCESS,
  CADASTRO_IMAGE_JOGADOR_FAILED,
  AVISO_MODAL,
  LOGOUT,
} from './../../utils/constants'
import { PURGE } from 'redux-persist'
/**
 * LOGIN
 */
export const ProviderAuthChange = (payload) => ({
  type: AUTH_PROVIDER_CHANGE,
  payload,
})

export const AtualizarPlanoAtivo = (payload) => ({
  type: ATUALIZAR_ASSINATURA_ATIVA,
  payload,
})

export const ShowAviso = () => ({
  type: AVISO_MODAL,
})

export const LoginRequest = (payload) => ({
  type: LOGIN_REQUEST,
  payload,
})

export const LoginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
})
export const LoginFailed = (payload) => ({
  type: LOGIN_FAILED,
  payload,
})
export const CadastroJogadorRequest = (payload) => ({
  type: CADASTRO_IMAGE_JOGADOR_REQUEST,
  payload,
})

export const CadastroJogadorSuccess = (payload) => ({
  type: CADASTRO_IMAGE_JOGADOR_SUCCESS,
  payload,
})
export const CadastroJogadorFailed = (payload) => ({
  type: CADASTRO_IMAGE_JOGADOR_FAILED,
  payload,
})

export const AlterarSenhaUpdateToken = (payload) => ({
  type: ALTERAR_SENHA_SUCCESS,
  payload,
})

export const CadastroRequest = (payload) => ({
  type: CADASTRO_REQUEST,
  payload,
})

export const CadastroSuccess = (payload) => ({
  type: CADASTRO_SUCCESS,
  payload,
})
export const CadastroFailed = (payload) => ({
  type: CADASTRO_FAILED,
  payload,
})

export const SolicitarChamadaOnline = (payload) => ({
  type: 'solicitar_chamada_online',
  payload,
})

export const SolicitarSenhaRequest = (payload) => ({
  type: SOLICITAR_SENHA_REQUEST,
  payload,
})

export const SolicitarSenhaSuccess = (payload) => ({
  type: SOLICITAR_SENHA_SUCCESS,
  payload,
})
export const SolicitarSenhaFailed = (payload) => ({
  type: SOLICITAR_SENHA_FAILED,
  payload,
})

export const CadastroCorretorRequest = (payload) => ({
  type: CADASTRO_CORRETOR_REQUEST,
  payload,
})

export const CadastroCorretorSuccess = (payload) => ({
  type: CADASTRO_CORRETOR_SUCCESS,
  payload,
})
export const CadastroCorretorFailed = (payload) => ({
  type: CADASTRO_CORRETOR_FAILED,
  payload,
})

export const RemoverElementosSalvos = () => ({
  type: 'REMOVER_ELEMENTOS_SALVOS',
})

export const LoggoutEmpty = () => ({
  type: LOGOUT,
})
