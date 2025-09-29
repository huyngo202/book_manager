// src/pages/HistoryPage.js
import React, { useState, useEffect } from 'react';
import borrowingService from '../services/borrowingService';
import './HistoryPage.css'; // Tạo file CSS mới cho trang này

const HistoryPage = () => {
    const [history, setHistory] = useState([]);

    const fetchHistory = () => {
        borrowingService.getMyHistory()
            .then(response => {
                setHistory(response.data);
            })
            .catch(error => console.error("Lỗi khi lấy lịch sử mượn sách:", error));
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const handleReturnBook = async (borrowingId) => {
        try {
            await borrowingService.returnBook(borrowingId);
            alert('Trả sách thành công!');
            fetchHistory(); // Tải lại lịch sử sau khi trả sách
        } catch (error) {
            alert('Lỗi khi trả sách.');
        }
    };

    return (
        <div className="container">
            <h2>Lịch sử mượn sách</h2>
            <table className="history-table">
                <thead>
                    <tr>
                        <th>Tên sách</th>
                        <th>Tác giả</th>
                        <th>Ngày mượn</th>
                        <th>Ngày trả</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {history.length > 0 ? history.map(item => (
                        <tr key={item._id}>
                            <td>{item.book?.title || 'Sách đã bị xóa'}</td>
                            <td>{item.book?.author || '-'}</td>
                            <td>{new Date(item.borrowDate).toLocaleDateString()}</td>
                            <td>{item.returnDate ? new Date(item.returnDate).toLocaleDateString() : '-'}</td>
                            <td>
                                <span className={`status ${item.status}`}>
                                    {item.status === 'borrowed' ? 'Đang mượn' : 'Đã trả'}
                                </span>
                            </td>
                            <td>
                                {item.status === 'borrowed' && (
                                    <button onClick={() => handleReturnBook(item._id)}>Trả sách</button>
                                )}
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="6">Bạn chưa mượn cuốn sách nào.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default HistoryPage;