import React from "react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <div className="container">
      <div className="card">
        <h2>Dashboard</h2>
        <p>Bem-vindo, {user.name || "Usuário"}.</p>
        <div className="row mt-4">
          <Link className="btn" to="/mapa">Mapa</Link>
          <Link className="btn" to="/agenda">Agenda</Link>
          <Link className="btn" to="/lojas">Lojas</Link>
          <Link className="btn" to="/representantes">Representantes</Link>
          <Link className="btn" to="/relatorios">Relatórios</Link>
          <Link className="btn" to="/config">Configurações</Link>
        </div>
      </div>
    </div>
  );
}
