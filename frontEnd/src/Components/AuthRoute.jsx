import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';



const AuthRoute = () => {

  const { isAuthenticated, roles } = useAuth();

  if (isAuthenticated) {
    console.log(roles);
    if (roles.includes("centre_manager")) {
      return <Navigate to="/donneur" replace />;
    }
    else if(roles.includes("test")) {
      return <Navigate to="/test" replace />;
    }
  }
  return <Outlet />;

};

export default AuthRoute;
