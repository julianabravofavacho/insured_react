const API_BASE = process.env.REACT_APP_API_BASE_URL;

if (!API_BASE) {
  console.warn(
    "[API_BASE_URL] não definido em process.env.REACT_APP_API_BASE_URL"
  );
}

export const INSURED_URL    = `${API_BASE}/Insured`;
export const AUTH_LOGIN_URL = `${API_BASE}/Authentication/login`;
export const AUTH_LOGOUT_URL = `${API_BASE}/Authentication/logout`;
