import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../provider/authcontext';

export const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated, userRoleId } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signup" replace />
  }

  return <Outlet />;
}
