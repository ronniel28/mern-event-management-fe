import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Event from './pages/Events';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists in localStorage

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />} />
          <Route path="/dashboard" element={
            <ProtectedRoute requiredRole="organizer">
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/events" element={
            <ProtectedRoute requiredRole="attendee">
              <Event />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
