import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const storedToken = localStorage.getItem('token');
      
      if (!storedToken) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
       
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        
        const userResponse = await api.get('user');
        const rolesResponse = await api.get('user/roles');
        
        setToken(storedToken);
        setUser(userResponse.data);
        setRoles(rolesResponse.data.map(role => role.name));
        setIsAuthenticated(true);
      } catch (error) {
        // 401 Unauthorized errors
        if (error.response?.status === 401) {
          logout();
        } else {
          console.error('Authentication check error:', error);
          setIsAuthenticated(false);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []); 

  const getUser = async () => {
    const response = await api.get('user');
    setUser(response.data);
  }

  const login = async (identifiers) => {
    try {
      const { data } = await api.post('login', identifiers);
      localStorage.setItem('token', data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`; 
      setToken(data.token);
      setUser(data.user);
      
      // Get roles  after login
      try {
        const rolesResponse = await api.get('user/roles');
        setRoles(rolesResponse.data.map(role => role.name));
      } catch (rolesError) {
        console.error('Failed to fetch roles:', rolesError);
      }
      
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
    if (!roles || roles.length === 0) return false;
    return requiredRoles.some(role => roles.includes(role));
  };

  const registerf = async (identifiers) => {
    try {
      const { data } = await api.post('register', identifiers);
      localStorage.setItem('token', data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`; // Set token in headers immediately
      setToken(data.token);
      setUser(data.user);
      
      // Get roles after registration
      try {
        const rolesResponse = await api.get('user/roles');
        setRoles(rolesResponse.data.map(role => role.name));
      } catch (rolesError) {
        console.error('Failed to fetch roles:', rolesError);
      }
      
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
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
      setRoles([]);
      setIsAuthenticated(false);
      delete api.defaults.headers.common['Authorization'];
    }
  };


  const updateProfile = async(profileForm) => {
    try{
      // console.log(profileForm);
      const response = await api.post('user/update/profile', profileForm , {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
      setUser(response.data.user)
      console.log(response.data.user);
      
    }catch(error){
      console.error('update profile failed:', error);
    }
  }
  

  const deleteAccount = async() => {
      const response = await api.post('user/delete/profile');
      logout();
  }
  
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        login,
        hasRole,
        roles,
        registerf,
        logout,
        getUser,
        updateProfile,
        deleteAccount
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
