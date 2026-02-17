import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentUser(user);
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.find(u => u.email === userData.email)) {
      return { success: false, message: 'User already exists' };
    }
    
    const newUser = {
      id: Date.now(),
      ...userData,
      bookings: []
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};