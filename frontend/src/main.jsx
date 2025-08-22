import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

import LoginPage from './pages/LoginPage.js';
import DashboardPage from './pages/DashboardPage.jsx';
import ListaLojasPage from './pages/ListaLojasPage.jsx';
import CadastroLojaPage from './pages/CadastroLojaPage.jsx';
import ListaRepresentantesPage from './pages/ListaRepresentantesPage.jsx';
import CadastroRepresentantePage from './pages/CadastroRepresentantePage.jsx';
import AgendaRotasPage from './pages/AgendaRotasPage.jsx';
import HistoricoVisitasPage from './pages/HistoricoVisitasPage.jsx';
import MapaRastreamentoPage from './pages/MapaRastreamentoPage.jsx';
import PerfilPage from './pages/PerfilPage.jsx';
import ConfiguracoesPage from './pages/ConfiguracoesPage.jsx';
import Erro404Page from './pages/Erro404Page.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* pública */}
        <Route path="/login" element={<LoginPage />} />

        {/* privada */}
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/lojas" element={<ListaLojasPage />} />
            <Route path="/lojas/novo" element={<CadastroLojaPage />} />
            <Route path="/representantes" element={<ListaRepresentantesPage />} />
            <Route path="/representantes/novo" element={<CadastroRepresentantePage />} />
            <Route path="/agenda" element={<AgendaRotasPage />} />
            <Route path="/historico" element={<HistoricoVisitasPage />} />
            <Route path="/mapa" element={<MapaRastreamentoPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="/config" element={<ConfiguracoesPage />} />
          </Route>
        </Route>

        {/* fallback */}
        <Route path="*" element={<Erro404Page />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
