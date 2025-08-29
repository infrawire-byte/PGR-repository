import React, { useEffect, useState } from "react";
import api from "../api/client.js";

export default function LojasPage(){
  const [stores, setStores] = useState([]);
  const [form, setForm] = useState({ name:"", address:"", phone:"", lat:"", lng:"" });

  const load = async () => {
    const { data } = await api.get("/api/stores");
    setStores(data);
  };
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/api/stores", form);
    setForm({ name:"", address:"", phone:"", lat:"", lng:"" });
    load();
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Lojas</h2>
        <form className="row mt-4" onSubmit={submit}>
          <input className="input" placeholder="Nome" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <input className="input" placeholder="Endereço" value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/>
          <input className="input" placeholder="Telefone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
          <input className="input" placeholder="Lat" value={form.lat} onChange={e=>setForm({...form,lat:e.target.value})}/>
          <input className="input" placeholder="Lng" value={form.lng} onChange={e=>setForm({...form,lng:e.target.value})}/>
          <button className="btn">Adicionar</button>
        </form>
        <ul className="mt-4">
          {stores.map(s => (<li key={s._id}>{s.name} — {s.address}</li>))}
        </ul>
      </div>
    </div>
  );
}
