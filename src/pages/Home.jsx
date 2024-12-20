import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import eventImage from '../assets/event.png'; // Adjust the path if necessary

const Home = () => {
  const [userRole, setUserRole] = useState(localStorage.getItem('role'));  // State to track user's role

  useEffect(() => {
    // If the user is logged in, set the role from localStorage
    setUserRole(localStorage.getItem('role'));
  }, []);  // Empty dependency array ensures this runs only on mount

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${eventImage})` }}>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-black bg-opacity-50">
        <h1 className="text-5xl text-white font-bold mb-4">Welcome to the Event Management System</h1>
        <p className="text-xl text-white mb-8">Manage your events efficiently and effortlessly</p>
        <Link to={userRole === 'organizer' ? '/dashboard' : '/events'}>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition duration-300">
            Get Started
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
