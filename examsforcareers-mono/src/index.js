import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

if (typeof window !== "undefined") {
  window.addEventListener("load", () => {
    console.log("[log]Loaded App");
    setTimeout(() => {
      document.getElementById("Loading").style.display = "none";
      document.getElementById("App").style.display = "block";
    }, 5000);
  });
  ReactDOM.hydrate(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
  );
}
