

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { MaterialUIControllerProvider } from "context";

import { Provider } from 'react-redux'
import { store } from "./modules/index"

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:8000/api/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.render(

  <BrowserRouter>
    <MaterialUIControllerProvider>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <App />
        </Provider>
      </ApolloProvider>
    </MaterialUIControllerProvider>
  </BrowserRouter >,
  document.getElementById("root")
);
