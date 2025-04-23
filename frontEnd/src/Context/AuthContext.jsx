import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { toast } from "react-toastify";



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (token) {
          const { userData } = await api.get('user');
          const response = await api.get('user/roles');
          setRoles(response.data.map(role => role.name));
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        toast.error("Authentication check failed :" + error);
        logout();
      }
    };

    checkAuth();
  }, [token]);

  const getUser = async () => {
    const response = await api.get('user'); 
    setUser(response.data);
  }

  const login = async (identifiers) => {
    try {
      const { data } = await api.post('login', identifiers);
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message
      };
    }
  };

  const hasRole = (requiredRoles) => {
    if (!requiredRoles || requiredRoles.length === 0) return false;
    if (!roles) return false;
    return requiredRoles.some(role => roles.includes(role));
  };


  const registerf = async (identifiers) => {
    try {
      const { data } = await api.post('register', identifiers);
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Register failed' };
    }
  };

  const logout = async () => {
    try {
      await api.post('logout');
    } catch (error) {
      toast.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      delete api.defaults.headers.common['Authorization'];
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        hasRole,
        roles,
        registerf,
        logout,
        getUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);