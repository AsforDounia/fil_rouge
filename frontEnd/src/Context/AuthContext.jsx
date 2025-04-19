import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);



  const login = async (identifiers) => {
    try {
      const { data } = await api.post('login', identifiers);
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      return { success: true};
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };



  return (
    <AuthContext.Provider
    value={{
      user,
      token,
      isAuthenticated,
      login,
    }}
  >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);