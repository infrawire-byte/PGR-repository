import { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function HistoricoVisitasPage(){
  const [filtro, setFiltro] = useState({ repId:'', de:'', ate:'' });
  const [visitas, setVisitas] = useState([]);
  const [erro, setErro] = useState('');

  function onChange(e){ setFiltro(f=>({ ...f, [e.target.name]: e.target.value })); }

  async function buscar(){
    try{
      const params = new URLSearchParams({
        repId: filtro.repId,
        de: filtro.de,
        ate: filtro.ate
      });
      const data = await api.get(`/visits?${params.toString()}`);
      setVisitas(data);
      setErro('');
    }catch(e){ setErro(e.message); }
  }

  useEffect(()=>{ buscar(); },[]);

  return (
    <>
      <h1>Histórico de Visitas</h1>
      <div className="card row">
        <input className="input" name="repId" placeholder="ID do Representante" value={filtro.repId} onChange={onChange} />
        <input className="input" type="date" name="de" value={filtro.de} onChange={onChange} />
        <input className="input" type="date" name="ate" value={filtro.ate} onChange={onChange} />
        <button className="btn" onClick={buscar}>Filtrar</button>
      </div>

      {erro && <div className="card">Erro: {erro}</div>}

      <div className="card">
        <table className="table">
          <thead><tr><th>Data/Hora</th><th>Representante</th><th>Loja</th><th>Status</th></tr></thead>
          <tbody>
            {visitas.map(v=>(
              <tr key={v._id}>
                <td>{new Date(v.dataHora).toLocaleString()}</td>
                <td>{v.rep?.nome || v.repId}</td>
                <td>{v.loja?.nome || v.lojaId}</td>
                <td>{v.status}</td>
              </tr>
            ))}
            {visitas.length===0 && <tr><td colSpan="4">Sem registros</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
