import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import Routes from "./Routes";
import { AuthContextProvider } from "./hooks/auth";
import "react-toastify/dist/ReactToastify.css";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer theme="dark" />
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  </React.StrictMode>
);
