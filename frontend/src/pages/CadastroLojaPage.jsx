import { useState } from 'react';
import { api } from '../services/api';

export default function CadastroLojaPage(){
  const [form, setForm] = useState({ nome:'', cnpj:'', endereco:'', cidade:'', estado:'', lat:'', lng:'' });
  const [msg, setMsg] = useState('');

  function onChange(e){ setForm(f=>({ ...f, [e.target.name]: e.target.value })); }

  async function onSubmit(e){
    e.preventDefault();
    setMsg('');
    try{
      await api.post('/stores', { ...form, lat: Number(form.lat)||undefined, lng: Number(form.lng)||undefined });
      setMsg('Loja cadastrada!');
      setForm({ nome:'', cnpj:'', endereco:'', cidade:'', estado:'', lat:'', lng:'' });
    }catch(e){ setMsg(e.message); }
  }

  return (
    <>
      <h1>Cadastrar Loja</h1>
      <form className="card" onSubmit={onSubmit}>
        <div className="row">
          <input className="input" name="nome" placeholder="Nome" value={form.nome} onChange={onChange} required />
          <input className="input" name="cnpj" placeholder="CNPJ" value={form.cnpj} onChange={onChange} />
          <input className="input" name="endereco" placeholder="Endereço" value={form.endereco} onChange={onChange} />
          <input className="input" name="cidade" placeholder="Cidade" value={form.cidade} onChange={onChange} />
          <input className="input" name="estado" placeholder="UF" value={form.estado} onChange={onChange} />
          <input className="input" name="lat" placeholder="Latitude (opcional)" value={form.lat} onChange={onChange} />
          <input className="input" name="lng" placeholder="Longitude (opcional)" value={form.lng} onChange={onChange} />
        </div>
        <button className="btn">Salvar</button>
      </form>
      {msg && <div className="card">{msg}</div>}
    </>
  );
}
