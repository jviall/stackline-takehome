import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App/App";
import { Provider } from "react-redux";
import store from "./redux/store";

import "./index.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
