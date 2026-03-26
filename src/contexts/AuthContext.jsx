import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('stulytics_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('stulytics_users') || '[]');
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      avatar: '🧑‍🎓',
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem('stulytics_users', JSON.stringify(users));
    const sessionUser = { id: newUser.id, name, email, avatar: '🧑‍🎓' };
    localStorage.setItem('stulytics_user', JSON.stringify(sessionUser));
    setUser(sessionUser);
    return { success: true };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('stulytics_users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) {
      return { success: false, error: 'Invalid email or password' };
    }
    const sessionUser = { id: found.id, name: found.name, email: found.email, avatar: '🧑‍🎓' };
    localStorage.setItem('stulytics_user', JSON.stringify(sessionUser));
    setUser(sessionUser);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('stulytics_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
