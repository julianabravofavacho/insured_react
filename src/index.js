import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Login } from './pages/login';
import { Insureds } from './pages/insureds';         // seu componente existente
import { Navbar, Footer } from './pages/layout';    // caso queira manter layout
import { Logout } from './pages/logout';
import { AuthProvider } from './auth/AuthContext';  // ajuste o caminho se necessário

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Navbar />

      <Routes>
        {/* Redireciona "/" para "/login" */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Rota de Login */}
        <Route path="/login" element={<Login />} />

        {/* Rota protegida (após login) */}
        <Route path="/insureds" element={<Insureds />} />

        {/* 404 simples */}
        <Route path="*" element={<h2 className="text-center my-5">Página não encontrada</h2>} />

        <Route path="/logout" element={<Logout />} />

      </Routes>

      <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);