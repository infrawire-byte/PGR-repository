import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

export default function ListaRepresentantesPage(){
  const [reps, setReps] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(()=>{
    api.get('/reps')
      .then(setReps)
      .catch(e=>setErro(e.message));
  },[]);

  return (
    <>
      <h1>Representantes</h1>
      <div className="card row">
        <Link className="btn" to="/representantes/novo">+ Novo Representante</Link>
      </div>
      {erro && <div className="card">Erro: {erro}</div>}
      <div className="card">
        <table className="table">
          <thead><tr><th>Nome</th><th>Email</th><th>Ações</th></tr></thead>
          <tbody>
            {reps.map(r=>(
              <tr key={r._id}>
                <td>{r.nome}</td>
                <td>{r.email}</td>
                <td><Link to={`/representantes/${r._id}`}>Editar</Link></td>
              </tr>
            ))}
            {reps.length===0 && <tr><td colSpan="3">Nenhum representante</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
