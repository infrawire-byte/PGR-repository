import React, { useEffect, useState } from "react";
import api from "../api/client.js";

export default function RepresentantesPage(){
  const [reps, setReps] = useState([]);
  const [form, setForm] = useState({ name:"", email:"", password:"", region:"", phone:"" });

  const load = async () => {
    const { data } = await api.get("/api/reps");
    setReps(data);
  };
  useEffect(()=>{ load(); },[]);

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/api/reps", form);
    setForm({ name:"", email:"", password:"", region:"", phone:"" });
    load();
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Representantes</h2>
        <form className="row mt-4" onSubmit={submit}>
          <input className="input" placeholder="Nome" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <input className="input" placeholder="E-mail" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
          <input className="input" placeholder="Senha" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
          <input className="input" placeholder="Região" value={form.region} onChange={e=>setForm({...form,region:e.target.value})}/>
          <input className="input" placeholder="Telefone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
          <button className="btn">Criar</button>
        </form>
        <ul className="mt-4">
          {reps.map(r => (<li key={r._id}>{r.user?.name} — {r.user?.email} — {r.region}</li>))}
        </ul>
      </div>
    </div>
  );
}
