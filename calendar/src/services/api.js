import axios from 'axios';

const API_URL = 'http://localhost:8000';

// Create axios instance with default config
const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Required for cookies
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' 
    }
});

export const api = {
    async login(email, password) {
        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);
        
        return await apiClient.post('/login', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true
        });
    },

    async checkAdmin() {
        return await apiClient.get('/adminboard/');
    },

    async getEvents() {
        return await apiClient.get('/events');
    },

    async getEmployees() {
        return await apiClient.get('/employees');
    },

    async createEvent(eventData) {
        return await apiClient.post('/adminboard/createevent', eventData);
    },

    async createUser(userData) {
        return await apiClient.post('/adminboard/createuser', userData);
    }
};