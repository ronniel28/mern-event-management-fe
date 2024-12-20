import React, { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';
import EventDetailsModal from '../components/EventDetailsModal';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchAllEvents } from '../api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch the current user's ID from local storage or context
  const currentUserId = localStorage.getItem('userId'); // Adjust this line based on your authentication implementation

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const eventsData = await fetchAllEvents();
        setEvents(eventsData);
      } catch (err) {
        console.error('Failed to load events:', err);
      }
    };
    loadEvents();
  }, []);

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow p-8 bg-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map(event => (
            <EventCard key={event._id} event={event} onClick={() => handleViewDetails(event)} />
          ))}
        </div>
        {isModalOpen && selectedEvent && (
          <EventDetailsModal event={selectedEvent} onClose={handleCloseModal} currentUserId={currentUserId} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Events;