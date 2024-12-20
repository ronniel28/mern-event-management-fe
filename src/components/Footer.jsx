import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer className="bg-blue-600 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">Event Management</h2>
          <p className="text-sm">© {currentYear} Event Management. All rights reserved.</p>
        </div>
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-gray-300 transition duration-300">Home</Link>
          <Link to="/events" className="hover:text-gray-300 transition duration-300">Events</Link>
          <Link to="/about" className="hover:text-gray-300 transition duration-300">About</Link>
          <Link to="/contact" className="hover:text-gray-300 transition duration-300">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;