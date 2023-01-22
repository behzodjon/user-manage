import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem('user')) || false);

  const login = async (inputs) => {
    console.log(inputs)
    const res = await axios.post('/auth/login', inputs);
    setCurrentUser(res.data);
    setAuthenticated(true);
  };

  const logout = async (inputs) => {
    await axios.post('/auth/logout');
    setCurrentUser(null);
    setAuthenticated(false);
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  return <AuthContext.Provider value={{ authenticated, currentUser, login, logout }}>{children}</AuthContext.Provider>;
};
