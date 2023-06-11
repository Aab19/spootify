import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/_main.scss";
import CoreLayout from "./layouts/CoreLayout";
import Routes from "./routes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CoreLayout>
      <Routes />
    </CoreLayout>
  </React.StrictMode>
);
