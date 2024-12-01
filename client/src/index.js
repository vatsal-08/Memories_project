import React from "react";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { thunk } from "redux-thunk";
import "./index.css";
import reducers from "./reducers";
import App from "./App";
import client_secret from "./client_secret.json";
const store = createStore(reducers, compose(applyMiddleware(thunk)));
const root = createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId={client_secret["web"]["client_id"]}>
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>
);
reportWebVitals();

