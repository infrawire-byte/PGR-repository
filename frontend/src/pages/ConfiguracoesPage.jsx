import { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function ConfiguracoesPage(){
  const [cfg, setCfg] = useState({ coletaGPS: true, intervaloSegundos: 60 });

  useEffect(()=>{
    api.get('/settings').then(setCfg).catch(()=>{});
  },[]);

  async function salvar(){
    try{ await api.put('/settings', cfg); alert('Configurações salvas'); }
    catch(e){ alert(e.message); }
  }

  return (
    <>
      <h1>Configurações</h1>
      <div className="card">
        <label style={{display:'block', marginBottom:8}}>
          <input
            type="checkbox"
            checked={cfg.coletaGPS}
            onChange={e=>setCfg(c=>({ ...c, coletaGPS: e.target.checked }))}
          /> Coleta de GPS ativa
        </label>
        <label style={{display:'block', marginBottom:8}}>
          Intervalo de coleta (segundos)
          <input className="input" type="number" min="5"
            value={cfg.intervaloSegundos}
            onChange={e=>setCfg(c=>({ ...c, intervaloSegundos: Number(e.target.value) }))}
          />
        </label>
        <button className="btn" onClick={salvar}>Salvar</button>
      </div>
    </>
  );
}
