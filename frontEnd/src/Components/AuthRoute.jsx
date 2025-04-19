import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';



const AuthRoute = () => {

  const { isAuthenticated, roles } = useAuth();

  if (isAuthenticated) {
    if (roles.includes("donor")) {
      return <Navigate to="/donneur" replace />;
    }
    if(roles.includes("centre_manager")){
      return <Navigate to="/centre" replace />;
    }
    else if(roles.includes("patient")) {
      return <Navigate to="/patient" replace />;
    }
  }
  return <Outlet />;

};

export default AuthRoute;
