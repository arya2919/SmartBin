import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { token, adminToken } = useAuth();

  if (adminOnly) {
    if (!adminToken) return <Navigate to="/admin/login" replace />;
    return children;
  }

  if (!token) return <Navigate to="/login" replace />;
  return children;
}
