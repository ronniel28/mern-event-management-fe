import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { fetchAllEvents, updateEvent, createEvent } from "../../api";
import EventModal from "./EventModal";
import SuccessModal from './SuccessModal';
import noEventImage from '../../assets/no-event.png';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const eventsData = await fetchAllEvents();
                setEvents(eventsData);
            } catch (err) {
                setError("Failed to load events.");
            } finally {
                setLoading(false);
            }
        };
        loadEvents();
    }, []); // Empty dependency array to fetch events only once

    const openModal = (event = null) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedEvent(null);
        setIsModalOpen(false);
    };

    const handleSaveEvent = async (eventData) => {
        try {
            if (selectedEvent) {
                await updateEvent(selectedEvent._id, eventData);
                setSuccessMessage('Event updated successfully!');
            } else {
                await createEvent(eventData);
                setSuccessMessage('Event created successfully!');
            }
            setIsSuccessModalOpen(true);
            closeModal();
            const eventsData = await fetchAllEvents();
            setEvents(eventsData);
        } catch (err) {
            setError("Failed to save event.");
        }
    };

    if (loading) return <p>Loading events...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            {/* Add Event Button */}
            <button
                className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out mt-4 mb-4"
                onClick={() => openModal()}
            >
                + Add Event
            </button>

            <div className="overflow-x-auto">
                {events.length === 0 ? (
                    <div className="flex flex-col items-center justify-center">
                        <img
                            src={noEventImage}
                            alt="No events available"
                            className="mb-4"
                        />
                        <p className="text-gray-500">No events available.</p>
                    </div>
                ) : (
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 text-left">
                                <th className="p-3">Event Name</th>
                                <th className="p-3">Description</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Location</th>
                                <th className="p-3">Organizer</th>
                                <th className="p-3">Price (₱)</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event, index) => (
                                <tr key={event._id || `${event.name}-${index}`} onClick={() => openModal(event)} className="hover:bg-gray-50 transition duration-300 cursor-pointer">
                                    <td className="p-3">{event.name}</td>
                                    <td className="p-3">{event.description}</td>
                                    <td className="p-3">{new Date(event.date).toLocaleDateString()}</td>
                                    <td className="p-3">{event.location}</td>
                                    <td className="p-3">{event.organizer.name}</td>
                                    <td className="p-3">₱{(event.price || 0).toFixed(2)}</td> {/* Ensure price is defined */}
                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded ${getStatusClass(event.status)}`}>
                                            {event.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {isModalOpen && (
                <EventModal
                    event={selectedEvent}
                    onClose={closeModal}
                    onSave={handleSaveEvent}
                />
            )}

            {isSuccessModalOpen && (
                <SuccessModal
                    message={successMessage}
                    onClose={() => setIsSuccessModalOpen(false)}
                />
            )}
        </div>
    );
};

const getStatusClass = (status) => {
    const statusClasses = {
        upcoming: "bg-blue-100 text-blue-700",
        completed: "bg-green-100 text-green-700",
        canceled: "bg-gray-100 text-gray-700",
    };
    return statusClasses[status] || "bg-red-100 text-red-700"; // Default fallback
};

export default EventList;
