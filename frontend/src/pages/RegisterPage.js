// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Kiểm tra mật khẩu đơn giản (bạn có thể thêm các quy tắc phức tạp hơn)
        if (password.length < 4) {
            setError('Mật khẩu phải có ít nhất 4 ký tự.');
            return;
        }

        try {
            await authService.register(username, password);
            setSuccess('Đăng ký thành công! Bạn sẽ được chuyển đến trang đăng nhập.');

            // Chờ một chút để người dùng đọc thông báo rồi chuyển hướng
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            // Giả sử backend trả về lỗi với message cụ thể
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Đã xảy ra lỗi. Vui lòng thử lại.');
            }
        }
    };

    return (
        <div className="form-container">
            <h2>Đăng ký tài khoản</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <button type="submit">Đăng ký</button>
            </form>
        </div>
    );
};

export default RegisterPage;