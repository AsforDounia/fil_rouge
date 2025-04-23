import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';


const ProtectedRoute = ({ roles , children }) => {
  const {isAuthenticated, hasRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (roles) {
    const hasRequiredRoles = hasRole(roles);
    if (!hasRequiredRoles) {
      return <Navigate to="/unauthorized" replace />;
    }
  }
  return children;
};

export default ProtectedRoute;
