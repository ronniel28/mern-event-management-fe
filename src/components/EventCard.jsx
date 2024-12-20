import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const EventCard = ({ event, onClick }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE;
  const eventPhotoUrl = event.eventPhoto ? `${API_BASE_URL}${event.eventPhoto}` : 'https://via.placeholder.com/400x300?text=Event+Image';

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const statusClasses = {
    upcoming: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    canceled: "bg-gray-100 text-gray-700",
  };

  const statusClass = statusClasses[event.status] || "bg-red-100 text-red-700"; // Default fallback

  return (
    <div
      className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 cursor-pointer"
      onClick={onClick}
    >
      <img src={eventPhotoUrl} alt={event.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
        <p className="text-gray-600 mb-2">
          <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
          {formattedDate}
        </p>
        <p className="text-gray-600">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
          {event.location}
        </p>
        <p className="text-gray-700 mb-4">{event.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-blue-600">₱{event.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    organizer: PropTypes.shape({
      name: PropTypes.string,
    }),
    status: PropTypes.oneOf(['upcoming', 'completed', 'canceled']),
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default EventCard;