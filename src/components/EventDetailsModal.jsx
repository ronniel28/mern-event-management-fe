import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { registerForEvent, cancelRegistration, checkRegistrationStatus } from '../api';
import MessageModal from './MessageModal';

const EventDetailsModal = ({ event, onClose, currentUserId }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [message, setMessage] = useState(null);
  const [attendees, setAttendees] = useState(event.attendees || []);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationId, setRegistrationId] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE;
  const eventPhotoUrl = event.eventPhoto ? `${API_BASE_URL}${event.eventPhoto}` : 'https://via.placeholder.com/400x300?text=Event+Image';

  useEffect(() => {
    const checkRegistration = async () => {
      try {
        const status = await checkRegistrationStatus(event._id);
        setIsRegistered(status.isRegistered);
        setRegistrationId(status.registrationId);
      } catch (error) {
        console.error('Error checking registration status:', error);
      }
    };
    checkRegistration();
  }, [event._id]);

  const handleRegister = async () => {
    setIsRegistering(true);
    try {
      const response = await registerForEvent({ eventId: event._id });
      const newAttendee = response.registration.user; // Assuming the backend returns the user object
      setMessage('Registered successfully!');
      setAttendees([...attendees, newAttendee]);
      setIsRegistered(true);
      setRegistrationId(response.registration._id); // Assuming the backend returns the registration ID
    } catch (error) {
      console.error('Error registering for event:', error);
      setMessage('Failed to register for the event.');
    } finally {
      setIsRegistering(false);
    }
  };

  const handleCancelRegistration = async () => {
    setIsCancelling(true);
    try {
      await cancelRegistration(registrationId);
      setMessage('Registration cancelled successfully!');
      setAttendees(attendees.filter(attendee => attendee._id !== currentUserId));
      setIsRegistered(false);
      setRegistrationId(null);
    } catch (error) {
      console.error('Error cancelling registration:', error);
      setMessage('Failed to cancel registration.');
    } finally {
      setIsCancelling(false);
    }
  };

  const handleCloseMessageModal = () => {
    setMessage(null);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-h-screen overflow-y-auto">
        <h3 className="font-semibold text-xl mb-4">{event.name}</h3>
        <img src={eventPhotoUrl} alt={event.name} className="w-full h-48 object-cover rounded mb-4" />
        <p className="text-gray-700 mb-2"><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
        <p className="text-gray-700 mb-2"><strong>Location:</strong> {event.location}</p>
        <p className="text-gray-700 mb-2"><strong>Description:</strong> {event.description}</p>
        <p className="text-gray-700 mb-2"><strong>Price:</strong> ₱{event.price.toFixed(2)}</p>
        <p className="text-gray-700 mb-4"><strong>Organizer:</strong> {event.organizer ? event.organizer.name : 'Unknown'}</p>
        <h4 className="font-semibold text-lg mb-2">Attendees:</h4>
        <ul className="list-disc list-inside mb-4">
          {attendees && attendees.length > 0 ? (
            attendees.map(attendee => (
              attendee && attendee.name ? (
                <li key={attendee._id}>{attendee.name}</li>
              ) : null
            ))
          ) : (
            <li>No attendees yet.</li>
          )}
        </ul>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Close
          </button>
          {isRegistered ? (
            <button
              type="button"
              onClick={handleCancelRegistration}
              className="bg-red-500 text-white px-4 py-2 rounded"
              disabled={isCancelling}
            >
              {isCancelling ? 'Cancelling...' : 'Cancel Registration'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleRegister}
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={isRegistering}
            >
              {isRegistering ? 'Registering...' : 'Register'}
            </button>
          )}
        </div>
      </div>
      {message && <MessageModal message={message} onClose={handleCloseMessageModal} />}
    </div>
  );
};

EventDetailsModal.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    organizer: PropTypes.shape({
      name: PropTypes.string,
    }),
    attendees: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })),
    price: PropTypes.number.isRequired,
    eventPhoto: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  currentUserId: PropTypes.string.isRequired,
};

export default EventDetailsModal;