import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  email: string;
  name: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  loggedIn: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const BASE_URL = 'http://localhost/tennis_shop/backend';

  const checkAuth = async () => {
    try {
      const res = await fetch(`${BASE_URL}/user.php`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (data.loggedIn && data.user) {
        setUser(data.user);
        setLoggedIn(true);
      } else {
        setUser(null);
        setLoggedIn(false);
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      setUser(null);
      setLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${BASE_URL}/login.php`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        setLoggedIn(true);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error('Login failed:', err);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const res = await fetch(`${BASE_URL}/register.php`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      if (data.success) {
        // After registration, auto-login
        return await login(email, password);
      } else {
        return false;
      }
    } catch (err) {
      console.error('Register failed:', err);
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch(`${BASE_URL}/logout.php`, {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
      setLoggedIn(false);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loggedIn, loading, login, register, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};
