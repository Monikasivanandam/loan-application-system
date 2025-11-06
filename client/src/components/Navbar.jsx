import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../css/style.css"

function Navbar() {
    const [isOpen, setIsOpen] = useState(false); 
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear(); 
        navigate('/');
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="navbar">

            <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
                <Link to="/home" onClick={() => setIsOpen(false)}>Home</Link>
                <Link to="/loans" onClick={() => setIsOpen(false)}>Loans</Link>
                <Link to="/applied" onClick={() => setIsOpen(false)}>Applied Loans</Link>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
            <div className="hamburger" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    );
}

export default Navbar;