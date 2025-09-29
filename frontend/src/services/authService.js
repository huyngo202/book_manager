// src/services/authService.js
import api from './api';
import { jwtDecode } from 'jwt-decode';

const login = async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

const register = (username, password) => {
    return api.post('/auth/register', { username, password });
};

const logout = () => {
    localStorage.removeItem('token');
};

const getCurrentUser = () => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            return jwtDecode(token);
        }
        return null;
    } catch (error) {
        return null;
    }
};

const authService = {
    login,
    register,
    logout,
    getCurrentUser,
};

export default authService;