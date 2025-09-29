// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">Mini Library</Link>
            <div className="navbar-links">
                {user ? (
                    <>
                        <span>Chào, {user.username}!</span>
                        {user.role === 'user' && <Link to="/my-history">Lịch sử mượn</Link>}
                        {user.username === 'admin' && (
                            <Link to="/admin">Quản lý</Link>
                        )}
                        <button onClick={handleLogout} className="logout-btn">Đăng xuất</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Đăng nhập</Link>
                        <Link to="/register">Đăng ký</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;