import React from "react";
import ReactDOM from "react-dom";
import "./global.css";
import App from "./Components/App/App";
import { store } from "./app/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
