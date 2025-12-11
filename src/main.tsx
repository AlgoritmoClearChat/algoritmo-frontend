import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Dashboard from "./pages/Dashboard";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="min-h-screen bg-slate-50">
      <Dashboard />
    </div>
  </React.StrictMode>
);
