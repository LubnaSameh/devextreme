import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components";

// Lazy loading for performance optimization
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Reports = lazy(() => import("./pages/Reports"));
const Scheduler = lazy(() => import("./pages/Scheduler"));
const EnhancedDevExtremeFormPage = lazy(() => import("./pages/form"));
//import { CustomDataGrid, CustomChart } from "../components";
const Loading = () => <div>Loading...</div>; // Fallback UI while loading

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/scheduler" element={<Scheduler />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/form" element={<EnhancedDevExtremeFormPage />} />
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;