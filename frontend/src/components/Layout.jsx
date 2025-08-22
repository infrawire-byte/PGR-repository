import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import '../assets/styles/global.css';

export default function Layout() {
  const navigate = useNavigate();
  const sair = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h2 className="brand">Representantes</h2>
        <nav className="menu">
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/lojas">Lojas</NavLink>
          <NavLink to="/lojas/novo">Cadastrar Loja</NavLink>
          <NavLink to="/representantes">Representantes</NavLink>
          <NavLink to="/representantes/novo">Cadastrar Representante</NavLink>
          <NavLink to="/agenda">Agenda/Rotas</NavLink>
          <NavLink to="/historico">Histórico de Visitas</NavLink>
          <NavLink to="/mapa">Mapa/Rastreamento</NavLink>
          <NavLink to="/perfil">Meu Perfil</NavLink>
          <NavLink to="/config">Configurações</NavLink>
        </nav>
        <button className="btn-logout" onClick={sair}>Sair</button>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
