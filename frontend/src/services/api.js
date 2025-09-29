// src/services/api.js
import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://localhost:5001/api', // URL của backend NodeJS
    baseURL: 'https://library-api-tjkl.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Thêm một interceptor để đính kèm token vào mỗi request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;