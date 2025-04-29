import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const AuthRoute = () => {
  const { isAuthenticated, roles, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (isAuthenticated) {
    if (roles.includes("donor")) {
      return <Navigate to="/donneur/profile" replace />;
    }
    if (roles.includes("centre_manager")) {
      return <Navigate to="/centre/profile" replace />;
    }
    if (roles.includes("patient")) {
      return <Navigate to="/patient/profile" replace />;
    }
    if (roles.includes("patient")) {
      return <Navigate to="/patient/profile" replace />;
    }
    if (roles.includes("admin")) {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  return <Outlet />;
};

export default AuthRoute;