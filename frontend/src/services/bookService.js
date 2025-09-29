// src/services/bookService.js
import api from './api';

const getAllBooks = () => {
    return api.get('/books');
};

const createBook = (bookData) => {
    return api.post('/books', bookData);
};

const updateBook = (id, bookData) => {
    return api.put(`/books/${id}`, bookData);
};

const deleteBook = (id) => {
    return api.delete(`/books/${id}`);
};

const borrowBook = (id) => {
    return api.post(`/borrowings/borrow/${id}`);
};

const returnBook = (borrowingId) => {
    // Backend cần một endpoint để xử lý việc trả sách
    return api.put(`/borrowings/return/${borrowingId}`);
}

const bookService = {
    getAllBooks,
    createBook,
    updateBook,
    deleteBook,
    borrowBook,
    returnBook,
};

export default bookService;