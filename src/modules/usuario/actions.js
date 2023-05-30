import {
  CAD_ATU_ENDERECO_REQUEST,
  CAD_ATU_ENDERECO_SUCCESS,
  CAD_ATU_ENDERECO_FAILED,

  ATUALIZAR_DADOS_REQUEST,
  ATUALIZAR_DADOS_SUCCESS,
  ATUALIZAR_DADOS_FAILED,

  ATUALIZAR_SENHA_REQUEST,
  ATUALIZAR_SENHA_SUCCESS,
  ATUALIZAR_SENHA_FAILED,

  ATUALIZA_ACESSO_REQUEST,
  ATUALIZA_ACESSO_SUCCESS,
  ATUALIZA_ACESSO_FAILED,

  ATUALIZA_USUARIOS_ONLINE_REQUEST,
  ATUALIZA_USUARIOS_ONLINE_SUCCESS,
  ATUALIZA_USUARIOS_ONLINE_FAILED,


  SOLICITAR_MES_AMARELO_REQUEST,
  SOLICITAR_MES_AMARELO_SUCCESS,
  SOLICITAR_MES_AMARELO_FAILED,

  SOLICITAR_CONSULTA_GRATUITA_CAMED_REQUEST,
  SOLICITAR_CONSULTA_GRATUITA_CAMED_SUCCESS,
  SOLICITAR_CONSULTA_GRATUITA_CAMED_FAILED,


  SOLICITAR_CADASTRO_EMPRESARIAL_REQUEST,
  SOLICITAR_CADASTRO_EMPRESARIAL_SUCCESS,
  SOLICITAR_CADASTRO_EMPRESARIAL_FAILED,

  CREATE_GAME_REQUEST,
  CREATE_GAME_SUCCESS,
  CREATE_GAME_FAILED,

} from "./../../utils/constants";


/**
 * Solicitacao cadastro empresarial
 */



 export const CriarGameRequest = (payload) => ({
  type: CREATE_GAME_REQUEST,
  payload
});
export const CriarGameSuccess = (payload) => ({
  type: CREATE_GAME_SUCCESS,
  payload
});
export const CriarGameFailed = (payload) => ({
  type: CREATE_GAME_FAILED,
  payload
});

export const atualizaUsuariosOnlineRequest = (payload) => ({
  type: ATUALIZA_USUARIOS_ONLINE_REQUEST,
  payload
});
export const atualizaUsuariosOnlineSuccess = (payload) => ({
  type: ATUALIZA_USUARIOS_ONLINE_SUCCESS,
  payload
});
export const atualizaUsuariosOnlineFailed = (payload) => ({
  type: ATUALIZA_USUARIOS_ONLINE_FAILED,
  payload
});

 export const SolicitacaoCadastroEmpresarialRequest = (payload) => ({
  type: SOLICITAR_CADASTRO_EMPRESARIAL_REQUEST,
  payload
});
export const SolicitacaoCadastroEmpresarialSuccess = (payload) => ({
  type: SOLICITAR_CADASTRO_EMPRESARIAL_SUCCESS,
  payload
});
export const SolicitacaoCadastroEmpresarialFailed = (payload) => ({
  type: SOLICITAR_CADASTRO_EMPRESARIAL_FAILED,
  payload
});



/**
 * SOLICITAÇÁO DE TELECONSULTA GRATUITA CAMED
 */
 export const SolicitarTeleconsultaCamedRequest = (payload) => ({
  type: SOLICITAR_CONSULTA_GRATUITA_CAMED_REQUEST,
  payload
});
export const SolicitarTeleconsultaCamedSuccess = (payload) => ({
  type: SOLICITAR_CONSULTA_GRATUITA_CAMED_SUCCESS,
  payload
});
export const SolicitarTeleconsultaCamedFailed = (payload) => ({
  type: SOLICITAR_CONSULTA_GRATUITA_CAMED_FAILED,
  payload
});


/**
 * SOLICITAÇÁO DE TELECONSULTA MES AMARELO
 */
 export const SolicitarTeleconsultaRequest = (payload) => ({
  type: SOLICITAR_MES_AMARELO_REQUEST,
  payload
});
export const SolicitarTeleconsultaSuccess = (payload) => ({
  type: SOLICITAR_MES_AMARELO_SUCCESS,
  payload
});
export const SolicitarTeleconsultaFailed = (payload) => ({
  type: SOLICITAR_MES_AMARELO_FAILED,
  payload
});
/**
 * Cadastrar ou atualizar o endereço do usuário logado
 */
export const CadAtualizarEnderecoRequest = (payload) => ({
  type: CAD_ATU_ENDERECO_REQUEST,
  payload
});
export const CadAtualizarEnderecoSuccess = (payload) => ({
  type: CAD_ATU_ENDERECO_SUCCESS,
  payload
});
export const CadAtualizarEnderecoFailed = (payload) => ({
  type: CAD_ATU_ENDERECO_FAILED,
  payload
});

/**
 * Atualizar dados pessoais do usuário logado
 */
export const AtualizarDadosRequest = (payload) => ({
  type: ATUALIZAR_DADOS_REQUEST,
  payload
});
export const AtualizarDadosSuccess = (payload) => ({
  type: ATUALIZAR_DADOS_SUCCESS,
  payload
});
export const AtualizarDadosFailed = (payload) => ({
  type: ATUALIZAR_DADOS_FAILED,
  payload
});


/**
 * Alterar senha modal
 */
export const AtualizarSenhaRequest = (payload) => ({
  type: ATUALIZAR_SENHA_REQUEST,
  payload
});
export const AtualizarSenhaSuccess = (payload) => ({
  type: ATUALIZAR_SENHA_SUCCESS,
  payload
});
export const AtualizarSenhaFailed = (payload) => ({
  type: ATUALIZAR_SENHA_FAILED,
  payload
});


/**
 * Atualizar dados para acesso
 */
 export const AtualizarAcessocoRequest = (payload) => ({
  type: ATUALIZA_ACESSO_REQUEST,
  payload
});
export const AtualizarAcessoSuccess = (payload) => ({
  type: ATUALIZA_ACESSO_SUCCESS,
  payload
});
export const AtualizarAcessoFailed = (payload) => ({
  type: ATUALIZA_ACESSO_FAILED,
  payload
});
