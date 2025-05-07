import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH_LOGOUT_URL } from "../config/api";

export function Logout() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const didLogout = useRef(false);

  useEffect(() => {
    if (didLogout.current) return;
    didLogout.current = true;

    async function doLogout() {
      const token = localStorage.getItem('token');
      if (!token) {
        return navigate('/login', { replace: true });
      }

      try {
        const resp = await fetch(
          `${AUTH_LOGOUT_URL}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        if (!resp.ok) {
          const body = await resp.json().catch(() => null);
          throw new Error(
            body?.mensagem 
              ? body.mensagem 
              : `Erro ${resp.status} ao deslogar`
          );
        }

        localStorage.removeItem('token');
        localStorage.removeItem('abilities');
        
        navigate('/login', { replace: true });
      } catch (err) {
        console.error('Logout falhou:', err);
        setError(err.message);
      }
    }

    doLogout();
  }, [navigate]);

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      {error
        ? <div className="alert alert-danger">{error}</div>
        : <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Saindo...</span></div>}
    </div>
  );
}
