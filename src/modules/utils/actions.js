import { ADD_ALERT, LOADER_HEADER, OPEN_CLOSE_MODAL, REMOVE_ALERT } from "../../utils/constants";



export const OpenCloseModal = (status, param = {
  load_cartao: false
}) => ({
  type: OPEN_CLOSE_MODAL,
  payload: {
    open: status,
    ...param
  }
});



export const ButtonLoaderBusca = (status) => ({
  type: LOADER_HEADER,
  payload: status
});

export const AddAlert = (alert) => ({
  type: ADD_ALERT,
  alert,
});

export const RemoveAlert = (id) => ({
  type: REMOVE_ALERT,
  id,
});
