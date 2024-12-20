// In EventModal.jsx
import React, { useState, useEffect } from 'react';

const EventModal = ({ event, onClose, onSave }) => {
    const [updatedEvent, setUpdatedEvent] = useState({
        name: "",
        description: "",
        date: "",
        location: "",
        status: "upcoming",
        price: 0,
        eventPhoto: null // Initialize eventPhoto for creating new event
    });
    const [previewPhoto, setPreviewPhoto] = useState(null);

    useEffect(() => {
        if (event) {
            setUpdatedEvent({
                ...event,
                date: event.date ? new Date(event.date).toISOString().split('T')[0] : "", // Format date to YYYY-MM-DD
                eventPhoto: null // Reset eventPhoto
            });
            setPreviewPhoto(event.eventPhoto ? `http://localhost:5001${event.eventPhoto}` : null);
        }
    }, [event]); // Runs whenever the event prop changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedEvent((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setUpdatedEvent((prev) => ({
            ...prev,
            eventPhoto: file,
        }));
        setPreviewPhoto(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(updatedEvent);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-3xl h-4/5 overflow-y-auto mx-4"> {/* Adjusted height */}
                <h2 className="text-xl font-semibold text-gray-800 mb-4">{event ? "Edit Event" : "Add New Event"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={updatedEvent.name}
                            onChange={handleChange}
                            className="mt-2 p-2 w-full border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={updatedEvent.description}
                            onChange={handleChange}
                            className="mt-2 p-2 w-full border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="date" className="block text-gray-700">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={updatedEvent.date}
                            onChange={handleChange}
                            className="mt-2 p-2 w-full border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="location" className="block text-gray-700">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={updatedEvent.location}
                            onChange={handleChange}
                            className="mt-2 p-2 w-full border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="status" className="block text-gray-700">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={updatedEvent.status}
                            onChange={handleChange}
                            className="mt-2 p-2 w-full border border-gray-300 rounded"
                            required
                        >
                            <option value="upcoming">Upcoming</option>
                            <option value="completed">Completed</option>
                            <option value="canceled">Canceled</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700">Price (₱)</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={updatedEvent.price}
                            onChange={handleChange}
                            className="mt-2 p-2 w-full border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="eventPhoto" className="block text-gray-700">Event Photo</label>
                        <input
                            type="file"
                            id="eventPhoto"
                            name="eventPhoto"
                            onChange={handlePhotoChange}
                            className="mt-2 p-2 w-full border border-gray-300 rounded"
                        />
                        {previewPhoto && (
                            <img src={previewPhoto} alt="Event Preview" className="mt-4 w-full h-48 object-cover rounded" />
                        )}
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventModal;
