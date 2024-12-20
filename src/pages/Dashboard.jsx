import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DashboardSummary from '../components/dashboard/DashboardSummary';
import EventList from '../components/dashboard/EventList';
import EventModal from '../components/dashboard/EventModal';
import { createEvent } from '../api';
import MessageModal from '../components/MessageModal';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
  });

  const [loading, setLoading] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState({ isOpen: false, message: '', isError: false });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(formData.date) <= Date.now()) {
      setFeedbackModal({
        isOpen: true,
        message: 'Event date must be in the future.',
        isError: true,
      });
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem('token');
      await createEvent(formData, token);

      setFeedbackModal({
        isOpen: true,
        message: 'Event created successfully!',
        isError: false,
      });

      setFormData({
        name: '',
        description: '',
        date: '',
        location: '',
      });
      setIsModalOpen(false);
    } catch (error) {
      setFeedbackModal({
        isOpen: true,
        message: error.message || 'Failed to create event.',
        isError: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const closeFeedbackModal = () => {
    setFeedbackModal({ isOpen: false, message: '', isError: false });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="bg-gray-50 flex-grow p-6">
        <div className="container mx-auto">
          <header className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-800">Events</h1>
              <p className="text-gray-500 mt-1">
                Manage and view all your events in one place.
              </p>
            </div>
            <button
              onClick={handleOpenModal}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Add Event
            </button>
          </header>

          <section aria-label="Dashboard Summary">
            <DashboardSummary />
          </section>

          <section aria-label="Event List" className="mt-8">
            <EventList />
          </section>
        </div>
        {isModalOpen && (
          <EventModal onClose={handleCloseModal}>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Event</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
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
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-2 p-2 w-full border border-gray-300 rounded"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="date" className="block text-gray-700">Date</label>
                <input
                  type="datetime-local"
                  id="date"
                  name="date"
                  value={formData.date}
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
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-2 p-2 w-full border border-gray-300 rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Save
              </button>
            </form>
          </EventModal>
        )}
        {feedbackModal.isOpen && (
          <MessageModal onClose={closeFeedbackModal}>
            <p
              className={`text-center ${
                feedbackModal.isError ? 'text-red-500' : 'text-green-500'
              }`}
            >
              {feedbackModal.message}
            </p>
          </MessageModal>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
