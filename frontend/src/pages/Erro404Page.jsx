import { Link } from 'react-router-dom';

export default function Erro404Page(){
  return (
    <div className="card">
      <h1>404</h1>
      <p>Página não encontrada.</p>
      <Link className="btn" to="/">Voltar ao Dashboard</Link>
    </div>
  );
}
    