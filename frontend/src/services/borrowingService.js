// src/services/borrowingService.js
import api from './api';

const borrowBook = (bookId) => {
    return api.post(`/borrowings/borrow/${bookId}`);
};

const returnBook = (borrowingId) => {
    return api.put(`/borrowings/return/${borrowingId}`);
};

const getMyHistory = () => {
    return api.get('/borrowings/myhistory');
};

const borrowingService = {
    borrowBook,
    returnBook,
    getMyHistory,
};

export default borrowingService;