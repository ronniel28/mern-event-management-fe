import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children, requiredRole }) => {
    const isAuthenticated = !!localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    if(!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

  // If the user doesn't have the required role, redirect accordingly
  if (requiredRole === 'organizer' && userRole !== 'organizer') {
    // If an attendee tries to access the dashboard
    return <Navigate to="/events" replace />;
  }

  if (requiredRole === 'attendee' && userRole !== 'attendee') {
    // If an organizer tries to access the events page
    return <Navigate to="/dashboard" replace />;
  }


    return children;
}

export default ProtectedRoute;