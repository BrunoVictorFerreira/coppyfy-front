import { AddAlert, RemoveAlert } from "../../modules/utils/actions";


export const CloseAlert = (alertProps, state) => (dispatch) => {
  if (alertProps.callback) {
    alertProps.callback(state);
  }

  dispatch(RemoveAlert(alertProps.id));
};

const RedirectRouteRequest = (route) => ({
  type: 'redirect-route',
  route,
});


export const ShowAlert = (alertProps) => (dispatch) => {
  if (!alertProps.id) {
    alertProps.id = `${Date.now()}${Math.random()}${Math.random()}`;
  }

  // auto-close on confirm
  if (alertProps.onConfirm) {
    const { onConfirm } = alertProps;
    alertProps.onConfirm = (...args) => {
      onConfirm(...args);
      CloseAlert(alertProps, true)(dispatch);
    };
  } else {
    alertProps.onConfirm = () => CloseAlert(alertProps, true)(dispatch);
  }

  // auto-close on cancel
  if (alertProps.onCancel) {
    const { onCancel } = alertProps;
    alertProps.onCancel = (...args) => {
      onCancel(...args);
      CloseAlert(alertProps, false)(dispatch);
    };
  } else {
    alertProps.onCancel = () => CloseAlert(alertProps, false)(dispatch);
  }

  if (alertProps.routes) {
    dispatch(RedirectRouteRequest(alertProps.routes));
    dispatch(RedirectRouteRequest(null));
  }


  dispatch(AddAlert(alertProps));

  return alertProps;
};

export const getVisibleAlert = (state) => (state.alerts && state.alerts.length > 0 ? state.alerts[0] : null);


export const RequestFailed = (payload) => ShowAlert({
    type: 'warning',
    title: 'Atenção!',
    content: payload.response ? payload.response.data.message : '',
    showCancel: false,
    status: payload.response ? payload.response.status : '',
    callback: () => {},
  });
export const RequestSuccess = (payload, routes = null, type = 'success', title = 'Sucesso!') => ShowAlert({
  type,
  title,
  content: payload.data ? payload.data.message : payload,
  showCancel: false,
  routes,
  status: '',
  callback: () => {},
});

export const RequestAlertConfirm = (payload, routes = '', callback = () => {}) => ShowAlert({
  type: 'warning',
  title: 'Atenção!',
  content: payload,
  showCancel: true,
  routes,
  callback,
});
