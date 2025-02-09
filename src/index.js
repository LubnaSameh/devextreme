//npm install -g json-server
//npm install react-router-dom
//npm install devextreme devextreme-react
//npm run build

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "devextreme/dist/css/dx.light.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

    <React.StrictMode>
      <App />
    </React.StrictMode>

);
