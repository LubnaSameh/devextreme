//npm install -g json-server
//npm install react-router-dom
//npm install devextreme devextreme-react
//npm install @tanstack/react-query
//  npx json-server --watch server/db.json --port 5000

//npm run build

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "devextreme/dist/css/dx.light.css";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </QueryClientProvider>
);
