import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

export default function ListaLojasPage(){
  const [lojas, setLojas] = useState([]);
  const [q, setQ] = useState('');
  const [erro, setErro] = useState('');

  async function load(){
    try{
      const data = await api.get(`/stores?q=${encodeURIComponent(q)}`);
      setLojas(data);
    }catch(e){ setErro(e.message); }
  }

  useEffect(()=>{ load(); },[]);

  return (
    <>
      <h1>Lojas</h1>
      <div className="card row">
        <input className="input" placeholder="Buscar por nome/endereço..." value={q} onChange={e=>setQ(e.target.value)} />
        <button className="btn" onClick={load}>Buscar</button>
        <Link className="btn" to="/lojas/novo">+ Nova Loja</Link>
      </div>

      {erro && <div className="card">Erro: {erro}</div>}

      <div className="card">
        <table className="table">
          <thead><tr><th>Nome</th><th>Endereço</th><th>Ações</th></tr></thead>
          <tbody>
            {lojas.map(l=>(
              <tr key={l._id}>
                <td>{l.nome}</td>
                <td>{l.endereco}</td>
                <td>
                  {/* Ajuste as rotas de edição/remover quando o backend estiver pronto */}
                  <Link to={`/lojas/${l._id}`}>Editar</Link>
                </td>
              </tr>
            ))}
            {lojas.length===0 && <tr><td colSpan="3">Nenhuma loja</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
