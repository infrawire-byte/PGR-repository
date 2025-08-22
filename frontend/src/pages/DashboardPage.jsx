import { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function DashboardPage(){
  const [info, setInfo] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(()=>{
    api.get('/dashboard/summary')
      .then(setInfo)
      .catch(e=>setErro(e.message));
  },[]);

  return (
    <>
      <h1>Dashboard</h1>
      {erro && <div className="card">Erro: {erro}</div>}
      <div className="row">
        <div className="card">Representantes: {info?.reps ?? '...'}</div>
        <div className="card">Lojas: {info?.stores ?? '...'}</div>
        <div className="card">Visitas hoje: {info?.visitsToday ?? '...'}</div>
      </div>
    </>
  );
}
