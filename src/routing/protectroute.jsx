import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element: Element, ...rest }) {
  const { isAuthenticated } = sessionStorage.getItem("token") !== "";

  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/signup" />;
}

export default ProtectedRoute;
