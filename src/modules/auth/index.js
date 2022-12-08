import { PURGE } from 'redux-persist';
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
  AVISO_MODAL,
  LOGOUT
} from './../../utils/constants';

const INITIAL_STATE = {
  token: null,
  logged: false,
  loggedAt: null,
  loading: false,
  plano_ativo: null,
  send_recuperar: false,
  aviso: false,
  notifications: [],
};

function Auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PURGE: {
      return {
        token: null,
        logged: false,
        loggedAt: null,
        loading: false,
        plano_ativo: null,
        send_recuperar: false,
        notifications: [],
      };
    }
    case `REMOVER_ELEMENTOS_SALVOS`: {
      return {
        token: null,
        logged: false,
        loggedAt: null,
        loading: false,
        plano_ativo: null,
        send_recuperar: false,
        notifications: [],
      };
    }

    case AVISO_MODAL:
      return {
        ...state,
        aviso: !state.aviso,
      };

    case ATUALIZAR_ASSINATURA_ATIVA: {
      return {
        ...state,
        plano_ativo: action.payload,
      };
    }
    case AUTH_PROVIDER_CHANGE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case LOGIN_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOGIN_SUCCESS: {
      const { token } = action.payload.data;
      return {
        ...state,
        loading: false,
        loggedAt: new Date().toJSON(),
        token,
      };
    }
    case ALTERAR_SENHA_SUCCESS: {
      const { token } = action.payload.data;
      return {
        ...state,
        loading: false,
        loggedAt: new Date().toJSON(),
        token,
      };
    }

    case LOGIN_FAILED: {
      return {
        ...state,
        loading: false,
        token: null,
      };
    }

    case CADASTRO_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case CADASTRO_SUCCESS: {
      const { token } = action.payload.data;
      return {
        ...state,
        loading: false,
        loggedAt: new Date().toJSON(),
        token,
      };
    }
    case CADASTRO_FAILED: {
      return {
        ...state,
        loading: false,
        token: null,
      };
    }

    case CADASTRO_CORRETOR_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case CADASTRO_CORRETOR_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    case CADASTRO_CORRETOR_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }

    case SOLICITAR_SENHA_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case SOLICITAR_SENHA_SUCCESS: {
      return {
        ...state,
        send_recuperar: true,
        loading: false,
      };
    }
    case SOLICITAR_SENHA_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        token: null,
        logged: false,
        loggedAt: null,
        loading: false,
        plano_ativo: null,
        send_recuperar: false,
        notifications: [],
      };
    }

    default:
      return state;
  }
}

export default Auth;
