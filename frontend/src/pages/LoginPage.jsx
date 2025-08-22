import { useState } from 'react';
import '../assets/styles/LoginPage.css';
import { api } from '../services/api.js';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function onSubmit(e){
    e.preventDefault();
    setErro('');
    try{
      setCarregando(true);
      const { token } = await api.post('/auth/login', { email, senha });
      localStorage.setItem('token', token);
      window.location.href = '/'; // entra na área logada
    }catch(err){
      setErro(err.message || 'Falha no login');
    }finally{
      setCarregando(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        {erro && <div style={{color:'#fecaca', marginBottom:8}}>{erro}</div>}
        <form onSubmit={onSubmit}>
          <input className="input" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="input" type="password" placeholder="Senha" value={senha} onChange={e=>setSenha(e.target.value)} />
          <button className="btn" disabled={carregando}>{carregando ? 'Entrando...' : 'Entrar'}</button>
        </form>
      </div>
    </div>
  );
}
