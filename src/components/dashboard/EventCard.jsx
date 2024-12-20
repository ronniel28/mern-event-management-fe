import React from 'react';
import PropTypes from 'prop-types';

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
        <tr className="hover:bg-gray-50 border-b transition duration-300 cursor-pointer" onClick={onClick}>
            <td className="p-3">
                <h3 className="font-semibold">{event.name}</h3>
            </td>
            <td className="p-3">
                <p className="text-sm text-gray-700">{event.description}</p>
            </td>
            <td className="p-3">
                <p className="text-sm">{formattedDate}</p>
            </td>
            <td className="p-3">
                <span className={`px-2 py-1 rounded ${statusClass}`}>{event.status}</span>
            </td>
        </tr>
    );
};

// Prop validation
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
