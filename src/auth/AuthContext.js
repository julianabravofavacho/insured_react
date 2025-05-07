// src/auth/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [abilities, setAbilities] = useState(() => {
    const json = localStorage.getItem("abilities");
    return json ? JSON.parse(json) : [];
  });

  function login(token, abilities) {
    setToken(token);
    setAbilities(abilities);
    localStorage.setItem("token", token);
    localStorage.setItem("abilities", JSON.stringify(abilities));
  }

  function logout() {
    setToken(null);
    setAbilities([]);
    localStorage.removeItem("token");
    localStorage.removeItem("abilities");
  }

  return (
    <AuthContext.Provider value={{ token, abilities, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
      throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return ctx;
}
