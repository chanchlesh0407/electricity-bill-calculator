import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Router>

      <Routes>

        {/* ✅ Landing Page (with its own navbar) */}
        <Route path="/" element={<Home />} />

        {/* ✅ Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Dashboard (NO landing navbar here) */}
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>

    </Router>
  );
}