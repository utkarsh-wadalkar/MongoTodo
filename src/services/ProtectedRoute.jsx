import { Navigate } from 'react-router-dom';
import { message } from 'antd';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    const expiration = localStorage.getItem('tokenExpiration');
    
    if (!token) return false;
    
    // Check if token is expired
    if (expiration) {
      const now = new Date().getTime();
      if (now > parseInt(expiration)) {
        // Token expired - clear storage
        localStorage.clear();
        return false;
      }
    }
    
    return true;
  };
  
  if (!isAuthenticated()) {
    message.warning('Please login to access this page');
    return <Navigate to="/login" replace />;
  }
    return children;
};

export default ProtectedRoute;