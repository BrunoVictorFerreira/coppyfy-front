import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistReducer, persistStore, createTransform } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import thunk from 'redux-thunk';
import CryptoJS from 'crypto-js';
import RootReducer from './rootReducer';
import RootSaga from './rootSaga';


const createNoopStorage = () => ({
  getItem(_key) {
    return Promise.resolve(null);
  },
  setItem(_key, value) {
    return Promise.resolve(value);
  },
  removeItem(_key) {
    return Promise.resolve();
  },
});

const storage = typeof window === "undefined" ? createNoopStorage() : createWebStorage("local");

const sagaMiddleware = createSagaMiddleware();
const encrypt = createTransform(
  (inboundState) => {
    if (!inboundState) {
      return inboundState;
    }

    const cryptedText = CryptoJS.AES.encrypt(
      JSON.stringify(inboundState),
      // UTILIZAMOS PARA CRIPTOGRAFAR OS DADOS DE AUTH DATA
      "abc"
    );

    return cryptedText.toString();
  },
  (outboundState) => {
    if (!outboundState) {
      return outboundState;
    }
  // UTILIZAMOS PARA CRIPTOGRAFAR OS DADOS DE AUTH DATA
    const bytes = CryptoJS.AES.decrypt(outboundState, "abc");
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    return JSON.parse(decrypted);
  }
);

const persistConfig = {
  whitelist: ['auth'],
  key: 'auth_data',
  storage,
  transforms: [encrypt],
};
const persistedReducer = persistReducer(persistConfig, RootReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware, thunk)
);
const persistor = persistStore(store);
sagaMiddleware.run(RootSaga);


export { store, persistor, encrypt };
