import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const register = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}auth/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
}

const login = async (credentials) => {
    try {
        console.log(`${API_BASE_URL}auth/login`, 'helloowwww');
        const response = await axios.post(`${API_BASE_URL}auth/login`, credentials);
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('name', user.name);
        localStorage.setItem('role', user.role);
        localStorage.setItem('userId', user.id); 
        return response.data;
    } catch (error) {
        console.error('Login failed:', error);
        throw error; 
    }
}

const logout = () => {
    // Clear user-related data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
}

const getToken = () => localStorage.getItem('token');

const fetchAllEvents = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}events`);
        return response.data; // Assuming the API returns an array of events with populated registrations
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
}

const createEvent = async (eventData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}events`, eventData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating event:', error);
        throw error;
    }
}

const updateEvent = async (eventId, eventData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}events/${eventId}`, eventData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating event:', error);
        throw error;
    }
}

const registerForEvent = async (eventData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}registrations`, eventData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error registering for event:', error);
        throw error;
    }
}

const cancelRegistration = async (registrationId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}registrations/${registrationId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error cancelling registration:', error);
        throw error;
    }
}

const checkRegistrationStatus = async (eventId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}registrations/status/${eventId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error checking registration status:', error);
        throw error;
    }
}

export { register, login, logout, fetchAllEvents, createEvent, updateEvent, registerForEvent, cancelRegistration, checkRegistrationStatus };