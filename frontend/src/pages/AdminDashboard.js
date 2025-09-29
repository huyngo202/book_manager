// src/pages/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import bookService from '../services/bookService';

const AdminDashboard = () => {
    const [books, setBooks] = useState([]);
    const [formData, setFormData] = useState({ title: '', author: '', genre: '', quantity: 1 });
    const [isEditing, setIsEditing] = useState(false);
    const [currentBookId, setCurrentBookId] = useState(null);

    const fetchBooks = () => {
        bookService.getAllBooks().then((response) => setBooks(response.data));
    }

    useEffect(() => {
        fetchBooks();
    }, []);

    
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setFormData({ title: '', author: '', genre: '', quantity: 1 });
        setIsEditing(false);
        setCurrentBookId(null);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            // Logic Sửa
            await bookService.updateBook(currentBookId, formData);
            alert('Cập nhật sách thành công!');
        } else {
            // Logic Thêm
            await bookService.createBook(formData);
            alert('Thêm sách thành công!');
        }
        resetForm();
        fetchBooks();
    };

    const handleEditClick = (book) => {
        setIsEditing(true);
        setCurrentBookId(book._id);
        setFormData({
            title: book.title,
            author: book.author,
            genre: book.genre,
            quantity: book.quantity
        });
    };

    const handleDeleteBook = async (bookId) => {
        if (window.confirm('Bạn có chắc muốn xóa sách này?')) {
            try {
                await bookService.deleteBook(bookId);
                alert('Xóa sách thành công!');
                fetchBooks();
            } catch (error) {
                alert('Lỗi khi xóa sách.');
            }
        }
    }

    return (
        <div className="container">
            <h2>Trang quản lý</h2>
            <div className="admin-section">
                <h3>{isEditing ? 'Chỉnh sửa sách' : 'Thêm sách mới'}</h3>
                <form onSubmit={handleFormSubmit} className="add-book-form">
                    <input type="text" name="title" placeholder="Tên sách" value={formData.title} onChange={handleInputChange} required />
                    <input type="text" name="author" placeholder="Tác giả" value={formData.author} onChange={handleInputChange} required />
                    <input type="text" name="genre" placeholder="Thể loại" value={formData.genre} onChange={handleInputChange} />
                    <input type="number" name="quantity" placeholder="Số lượng" value={formData.quantity} onChange={handleInputChange} min="0" required />
                    <button type="submit">{isEditing ? 'Cập nhật' : 'Thêm sách'}</button>
                    {isEditing && <button type="button" onClick={resetForm}>Hủy</button>}
                </form>
            </div>

            <div className="admin-section">
                <h3>Danh sách sách</h3>
                <table className="books-table">
                    <thead>
                        <tr>
                            <th>Tên sách</th><th>Tác giả</th><th>Số lượng</th><th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => (
                            <tr key={book._id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.quantity}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => handleEditClick(book)}>Sửa</button>
                                    <button className="delete-btn" onClick={() => handleDeleteBook(book._id)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default AdminDashboard;