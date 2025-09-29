// src/pages/LoginPage.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const DEMO_ACCOUNTS = {
    admin: { username: 'admin', password: 'admin' },
    user: { username: 'user', password: 'user' },
};

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(username, password);
            navigate('/');
        } catch (err) {
            setError('Tên đăng nhập hoặc mật khẩu không đúng.');
        }
    };

    return (
        <div className="form-container">
            <h2>Đăng nhập</h2>
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
                <button type="submit">Đăng nhập</button>
            </form>
            <div className="demo-accounts">
                <h3>Tài khoản dùng thử:</h3>
                <p>Admin - Tên đăng nhập: <strong>admin</strong>, Mật khẩu: <strong>admin</strong></p>
                <p>User - Tên đăng nhập: <strong>user</strong>, Mật khẩu: <strong>user</strong></p>
            </div>
        </div>
        
    );
};

export default LoginPage; 
