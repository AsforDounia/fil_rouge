import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const AuthRoute = () => {
  const { isAuthenticated, roles, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (isAuthenticated) {
    if (roles.includes("donor")) {
      return <Navigate to="/donneur/dashboard" replace />;
    }
    if (roles.includes("centre_manager")) {
      return <Navigate to="/centre/dashboard" replace />;
    }
    if (roles.includes("patient")) {
      return <Navigate to="/patient/dashboard" replace />;
    }
  }

  return <Outlet />;
};

export default AuthRoute;