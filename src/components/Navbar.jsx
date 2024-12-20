// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../api'; // Ensure you have the logout function imported

const Navbar = () => {
  const [userName, setUserName] = useState(localStorage.getItem('name'));  // State to track user's name
  const [userRole, setUserRole] = useState(localStorage.getItem('role'));  // State to track user's role

  useEffect(() => {
    // If the user is logged in, set the username and role from localStorage
    setUserName(localStorage.getItem('name'));
    setUserRole(localStorage.getItem('role'));
  }, []);  // Empty dependency array ensures this runs only on mount

  const handleLogout = () => {
    logout();  // Call the logout function to clear localStorage
    setUserName(null);  // Update state to reflect the logged-out user
    setUserRole(null);  // Update state to reflect the logged-out user
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/">Event Management</Link>
        </div>
        <ul className="flex space-x-4 items-center">
          <li>
            <Link to="/" className="text-white hover:text-gray-300 transition duration-300">Home</Link>
          </li>
          {userRole === 'organizer' ? (
            <li>
              <Link to="/dashboard" className="text-white hover:text-gray-300 transition duration-300">Dashboard</Link>
            </li>
          ) : (
            <li>
              <Link to="/events" className="text-white hover:text-gray-300 transition duration-300">Events</Link>
            </li>
          )}
          {userName ? (
            <>
              <li className="text-white">Hello, {userName}</li>  {/* Display user's name */}
              <li>
                <button
                  onClick={handleLogout}  // Trigger logout function
                  className="text-white bg-red-500 py-2 px-4 rounded hover:bg-red-700 transition duration-300"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="text-white hover:text-gray-300 transition duration-300">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-white hover:text-gray-300 transition duration-300">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
