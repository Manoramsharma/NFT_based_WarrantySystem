import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AccountProvider } from "../src/context/Accounts";
ReactDOM.createRoot(document.getElementById("root")).render(
  <AccountProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AccountProvider>
);
