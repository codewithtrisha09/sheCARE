import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const TOKEN_KEY = "shecare-token";
const USER_KEY = "shecare-user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(true);

  const persistSession = useCallback((nextToken, nextUser) => {
    if (nextToken) localStorage.setItem(TOKEN_KEY, nextToken);
    else localStorage.removeItem(TOKEN_KEY);
    if (nextUser) localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    else localStorage.removeItem(USER_KEY);
    setToken(nextToken);
    setUser(nextUser);
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    } catch {
      /* offline logout is fine */
    }
    persistSession(null, null);
  }, [persistSession]);

  const refreshSession = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/refresh", { method: "POST", credentials: "include" });
      if (!response.ok) throw new Error("Session expired");
      const data = await response.json();
      persistSession(data.token, data.user);
      return data.token;
    } catch {
      persistSession(null, null);
      return null;
    }
  }, [persistSession]);

  useEffect(() => {
    let active = true;
    (async () => {
      if (token) {
        setLoading(false);
        return;
      }
      const refreshed = await refreshSession();
      if (active && !refreshed) setLoading(false);
      else if (active) setLoading(false);
    })();
    return () => { active = false; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const login = useCallback(async (email, password) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Sign in failed.");
    persistSession(data.token, data.user);
    return data;
  }, [persistSession]);

  const register = useCallback(async (name, email, password) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Registration failed.");
    persistSession(data.token, data.user);
    return data;
  }, [persistSession]);

  const authFetch = useCallback(async (url, options = {}) => {
    const headers = { ...options.headers, Authorization: `Bearer ${token}` };
    let response = await fetch(url, { ...options, headers, credentials: "include" });
    if (response.status === 401 && token) {
      const newToken = await refreshSession();
      if (newToken) {
        response = await fetch(url, {
          ...options,
          headers: { ...options.headers, Authorization: `Bearer ${newToken}` },
          credentials: "include",
        });
      }
    }
    return response;
  }, [token, refreshSession]);

  const value = useMemo(() => ({
    user,
    token,
    loading,
    isAuthenticated: Boolean(user && token),
    login,
    register,
    logout,
    authFetch,
    refreshSession,
  }), [user, token, loading, login, register, logout, authFetch, refreshSession]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
