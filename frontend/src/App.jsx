import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import MapPage from "./pages/MapPage.jsx";
import AgendaPage from "./pages/AgendaPage.jsx";
import LojasPage from "./pages/LojasPage.jsx";
import RepresentantesPage from "./pages/RepresentantesPage.jsx";
import RelatoriosPage from "./pages/RelatoriosPage.jsx";
import ConfigPage from "./pages/ConfigPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/mapa" element={<MapPage />} />
        <Route path="/agenda" element={<AgendaPage />} />
        <Route path="/lojas" element={<LojasPage />} />
        <Route path="/representantes" element={<RepresentantesPage />} />
        <Route path="/relatorios" element={<RelatoriosPage />} />
        <Route path="/config" element={<ConfigPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
