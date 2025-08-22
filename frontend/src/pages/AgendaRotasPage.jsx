import { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function AgendaRotasPage(){
  const [agenda, setAgenda] = useState([]);
  const [form, setForm] = useState({ repId:'', lojaId:'', data:'', ordem:1 });
  const [erro, setErro] = useState('');

  async function load(){
    try{ setAgenda(await api.get('/routes')); }
    catch(e){ setErro(e.message); }
  }
  useEffect(()=>{ load(); },[]);

  function onChange(e){ setForm(f=>({ ...f, [e.target.name]: e.target.value })); }

  async function onSubmit(e){
    e.preventDefault();
    try{
      await api.post('/routes', { ...form, ordem: Number(form.ordem) });
      await load();
      setForm({ repId:'', lojaId:'', data:'', ordem:1 });
    }catch(e){ setErro(e.message); }
  }

  return (
    <>
      <h1>Agenda / Rotas</h1>
      {erro && <div className="card">Erro: {erro}</div>}
      <form className="card" onSubmit={onSubmit}>
        <div className="row">
          <input className="input" name="repId" placeholder="ID do Representante" value={form.repId} onChange={onChange} required />
          <input className="input" name="lojaId" placeholder="ID da Loja" value={form.lojaId} onChange={onChange} required />
          <input className="input" type="date" name="data" value={form.data} onChange={onChange} required />
          <input className="input" type="number" name="ordem" min="1" value={form.ordem} onChange={onChange} />
        </div>
        <button className="btn">Agendar</button>
      </form>

      <div className="card">
        <table className="table">
          <thead><tr><th>Data</th><th>Representante</th><th>Loja</th><th>Ordem</th></tr></thead>
          <tbody>
            {agenda.map((a)=>(
              <tr key={a._id}>
                <td>{new Date(a.data).toLocaleDateString()}</td>
                <td>{a.rep?.nome || a.repId}</td>
                <td>{a.loja?.nome || a.lojaId}</td>
                <td>{a.ordem}</td>
              </tr>
            ))}
            {agenda.length===0 && <tr><td colSpan="4">Sem itens agendados</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
