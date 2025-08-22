import { useState } from 'react';
import { api } from '../services/api';

export default function CadastroRepresentantePage(){
  const [form, setForm] = useState({ nome:'', email:'', telefone:'', documento:'', senha:'' });
  const [msg, setMsg] = useState('');

  function onChange(e){ setForm(f=>({ ...f, [e.target.name]: e.target.value })); }

  async function onSubmit(e){
    e.preventDefault();
    setMsg('');
    try{
      await api.post('/reps', form);
      setMsg('Representante cadastrado!');
      setForm({ nome:'', email:'', telefone:'', documento:'', senha:'' });
    }catch(e){ setMsg(e.message); }
  }

  return (
    <>
      <h1>Cadastrar Representante</h1>
      <form className="card" onSubmit={onSubmit}>
        <div className="row">
          <input className="input" name="nome" placeholder="Nome" value={form.nome} onChange={onChange} required />
          <input className="input" name="email" placeholder="Email" value={form.email} onChange={onChange} required />
          <input className="input" name="telefone" placeholder="Telefone" value={form.telefone} onChange={onChange} />
          <input className="input" name="documento" placeholder="CPF/CNPJ" value={form.documento} onChange={onChange} />
          <input className="input" name="senha" type="password" placeholder="Senha inicial" value={form.senha} onChange={onChange} />
        </div>
        <button className="btn">Salvar</button>
      </form>
      {msg && <div className="card">{msg}</div>}
    </>
  );
}
