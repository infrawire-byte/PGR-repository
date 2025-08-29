import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client.js";

export default function LoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr(""); setLoading(true);
    try {
      const { data } = await api.post("/api/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      nav("/dashboard");
    } catch (e) {
      setErr(e?.response?.data?.error || "Falha no login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
      <form className="card" style={{ width: 420 }} onSubmit={handleLogin}>
        <h2>Entrar</h2>
        <div className="mt-4">
          <label>E-mail</label>
          <input className="input mt-2" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="seu@email.com" required />
        </div>
        <div className="mt-3">
          <label>Senha</label>
          <input className="input mt-2" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••••" required />
        </div>
        {err && <div className="mt-3" style={{ color: "#f87171" }}>{err}</div>}
        <button className="btn mt-4" disabled={loading}>{loading ? "Entrando..." : "Entrar"}</button>
      </form>
    </div>
  );
}
