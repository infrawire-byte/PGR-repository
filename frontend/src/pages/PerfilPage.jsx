import { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function PerfilPage(){
  const [perfil, setPerfil] = useState(null);
  const [senha, setSenha] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(()=>{
    api.get('/auth/me').then(setPerfil).catch(e=>setMsg(e.message));
  },[]);

  async function trocarSenha(e){
    e.preventDefault();
    setMsg('');
    try{
      await api.post('/auth/change-password', { senha });
      setMsg('Senha atualizada!');
      setSenha('');
    }catch(e){ setMsg(e.message); }
  }

  return (
    <>
      <h1>Meu Perfil</h1>
      <div className="card">
        {perfil ? (
          <>
            <p><b>Nome:</b> {perfil.nome}</p>
            <p><b>Email:</b> {perfil.email}</p>
          </>
        ) : 'Carregando...'}
      </div>

      <form className="card" onSubmit={trocarSenha}>
        <h3>Alterar senha</h3>
        <input className="input" type="password" placeholder="Nova senha" value={senha} onChange={e=>setSenha(e.target.value)} />
        <button className="btn">Salvar</button>
        {msg && <p style={{marginTop:8}}>{msg}</p>}
      </form>
    </>
  );
}
