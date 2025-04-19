import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';



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
      } catch (err) {
        console.error('Authentication check failed:', err);
        logout();
      }
    };

    checkAuth();
  }, [token]);

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

  const hasRole = (requiredRoles) => {
    if (!requiredRoles || requiredRoles.length === 0) return false;
    if (!roles) return false;
    return requiredRoles.some(role => roles.includes(role));
 };

  return (
    <AuthContext.Provider
    value={{
      user,
      token,
      isAuthenticated,
      login,
      hasRole,
      roles
    }}
  >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);