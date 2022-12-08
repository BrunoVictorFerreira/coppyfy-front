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
  CREATE_GAME_FAILED
} from "./../../utils/constants";

import { PURGE } from "redux-persist";

const INITIAL_STATE = {
  loading_endereco: false,
  loading_dados: false,
  loading_alt_senha: false,
  loading_acesso: false,

};

function UsuarioReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PURGE:
      return INITIAL_STATE;


        /**
     * solicitar cadastro empresarial
     */
         case CREATE_GAME_REQUEST:
          return {
            ...state,
            loading_dados: true
          };

        case CREATE_GAME_SUCCESS:
          return {
            ...state,
            loading_dados: false
          };

        case CREATE_GAME_FAILED:
          return {
            ...state,
            loading_dados: false,
          };
          
         case SOLICITAR_CADASTRO_EMPRESARIAL_REQUEST:
          return {
            ...state,
            loading_dados: true
          };

        case SOLICITAR_CADASTRO_EMPRESARIAL_SUCCESS:
          return {
            ...state,
            loading_dados: false
          };

        case SOLICITAR_CADASTRO_EMPRESARIAL_FAILED:
          return {
            ...state,
            loading_dados: false,
          };

       /**
     * solicitar teleconsulta mes amarelo
     */
    case SOLICITAR_CONSULTA_GRATUITA_CAMED_REQUEST:
      return {
        ...state,
        loading_dados: true
      };

    case SOLICITAR_CONSULTA_GRATUITA_CAMED_SUCCESS:
      return {
        ...state,
        loading_dados: false
      };

    case SOLICITAR_CONSULTA_GRATUITA_CAMED_FAILED:
      return {
        ...state,
        loading_dados: false,
      };

         /**
     * solicitar teleconsulta mes amarelo
     */
    case SOLICITAR_MES_AMARELO_REQUEST:
      return {
        ...state,
        loading_dados: true
      };

    case SOLICITAR_MES_AMARELO_SUCCESS:
      return {
        ...state,
        loading_dados: false
      };

    case SOLICITAR_MES_AMARELO_FAILED:
      return {
        ...state,
        loading_dados: false,
      };




   /**
     * atualizar ou cadastrar endereco usuario
     */
    case CAD_ATU_ENDERECO_REQUEST:
      return {
        ...state,
        loading_endereco: true
      };

    case CAD_ATU_ENDERECO_SUCCESS:
      return {
        ...state,
        loading_endereco: false
      };

    case CAD_ATU_ENDERECO_FAILED:
      return {
        ...state,
        loading_endereco: false,
      };
    /**
     * Atualizar dados pessoais do usuário logado
     *
     * */
    case ATUALIZAR_DADOS_REQUEST:
      return {
        ...state,
        loading_dados: true
      };

    case ATUALIZAR_DADOS_SUCCESS:
      return {
        ...state,
        loading_dados: false
      };

    case ATUALIZAR_DADOS_FAILED:
      return {
        ...state,
        loading_dados: false,
      };

    /**
     * Atualizar senha do usuário logado
     *
     * */
    case ATUALIZAR_SENHA_REQUEST:
      return {
        ...state,
        loading_alt_senha: true
      };

    case ATUALIZAR_SENHA_SUCCESS:
      return {
        ...state,
        loading_alt_senha: false
      };

    case ATUALIZAR_SENHA_FAILED:
      return {
        ...state,
        loading_alt_senha: false,
      };

  /**
   * Atualizar dados de acesso para o usuário logado
   *
   * */
    case ATUALIZA_ACESSO_REQUEST:
    return {
      ...state,
      loading_acesso: true
    };

  case ATUALIZA_ACESSO_SUCCESS:
    return {
      ...state,
      loading_acesso: false
    };

  case ATUALIZA_ACESSO_FAILED:
    return {
      ...state,
      loading_acesso: false,
    };


      default:
      return state;
  }
}

export default UsuarioReducer;
