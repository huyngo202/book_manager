// src/pages/HomePage.js
import React, { useState, useEffect, useContext } from 'react';
import bookService from '../services/bookService';
import borrowingService from '../services/borrowingService';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        bookService.getAllBooks().then((response) => {
            setBooks(response.data);
        });
    }, []);

    const handleBorrow = async (bookId) => {
        if (!user) {
            alert('Vui lòng đăng nhập để mượn sách!');
            return;
        }
        try {
            await bookService.borrowBook(bookId);
            alert('Mượn sách thành công!');
            // Cập nhật lại số lượng sách
            bookService.getAllBooks().then((response) => setBooks(response.data));
        } catch (error) {
            alert(error.response.data.message || 'Không thể mượn sách. Sách đã hết.');
        }
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <h1>Chào mừng đến với thư viện</h1>
            <input
                type="text"
                placeholder="Tìm kiếm sách theo tên hoặc tác giả..."
                className="search-bar"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="book-list">
                {filteredBooks.map((book) => (
                    <div key={book.id || book._id} className="book-card">
                        <h3>{book.title}</h3>
                        <p>Tác giả: {book.author}</p>
                        <p>Thể loại: {book.genre}</p>
                        <p>Số lượng còn lại: {book.quantity}</p>
                        {book.quantity > 0 && user && user.role === 'user' && (
                            <button onClick={() => handleBorrow(book.id || book._id)}>Mượn sách</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;