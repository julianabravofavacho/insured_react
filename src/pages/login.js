// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../auth/AuthContext";
import { AUTH_LOGIN_URL } from "../config/api";

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setAlert({ type: '', message: '' });

    if (!email || !password) {
      setAlert({ type: 'warning', message: 'E-mail e senha são obrigatórios.' });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(AUTH_LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      //  Mesmo quando retorna 400, ainda damos response.json()
      const result = await response.json();

      if (!response.ok || result.sucesso === false) {
        setAlert({ type: 'danger', message: result.mensagem || 'Erro desconhecido.' });
      } else {
        // sucesso: grava token e avança para insureds
        //localStorage.setItem('token', result.dados.token);
        //localStorage.setItem("abilities", JSON.stringify(result.dados.abilities));
        login(result.dados.token, result.dados.abilities);

        navigate('/insureds');
      }
    } catch (err) {
      //console.error(err);
      setAlert({ type: 'danger', message: 'Falha ao conectar com o servidor.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card p-4" style={{ width: '100%', maxWidth: 400 }}>
        <h3 className="card-title text-center mb-3">Login</h3>

        {alert.message && (
          <div className={`alert alert-${alert.type} text-center`} role="alert">
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">E-mail</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
