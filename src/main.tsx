import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { DefaultLayout } from "./modules";
import { store } from "./store";
import "./styles";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <DefaultLayout />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
