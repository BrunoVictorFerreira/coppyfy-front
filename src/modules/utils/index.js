import {
  ADD_ALERT,
  OPEN_CLOSE_MODAL,
  REMOVE_ALERT
} from "../../utils/constants";
import { PURGE } from "redux-persist";

export const INITIAL_STATE_UTIL = {
  open: false,
  load_cartao: false,
  loader_header: false,
  alerts: [],
  route: null,
};

function UtilReducer(state = INITIAL_STATE_UTIL, action) {
  switch (action.type) {
    case PURGE:
      return INITIAL_STATE_UTIL;
   /**
     * Incuir items no carrinho
     */
    case 'redirect-route':
      return {
        ...state,
        route: action.route,
      };

    case OPEN_CLOSE_MODAL:
      return {
        ...state,
        ...action.payload
      };

    case 'LOADER_HEADER':
      return {
        ...state,
        loader_header: action.payload
      };

      case ADD_ALERT:
        return {
          ...state,
          alerts: [...state.alerts, action.alert],
        };
      case REMOVE_ALERT:
        return {
          ...state,
          alerts: [...state.alerts].filter((a) => a.id !== action.id),
        };

    default:
      return state;
  }
}

export default UtilReducer;
