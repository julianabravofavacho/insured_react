// src/components/Layout.jsx
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export function Navbar() {
  const { token } = useAuth();
  const location = useLocation();

  // Se quiser reagir a alterações de localStorage vindas de outra aba:
  useEffect(() => {
    function onStorage(e) {
      if (e.key === "token") {
        // força um re-render via um efeito colateral (poderia usar estado)
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const isLoginRoute = location.pathname === "/login";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom box-shadow py-3 mb-3">
      <div className="container">
        <Link className="navbar-brand" to="/">Sistema Insurance</Link>
        <button
          className="navbar-toggler"
          type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            {token && !isLoginRoute && (
              <li className="nav-item">
                <Link className="nav-link" to="/logout">Logout</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="container p-3 mt-5 border-top">
        <small className="d-block text-muted text-center">
          &copy; 2025 - Sistema Insurance
        </small>
      </div>
    </footer>
  );
}
