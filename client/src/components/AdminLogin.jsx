import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/admin.css";

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/auth/admin-login', { email, password });
            console.log('Login response:', res.data);
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                navigate('/admin-dashboard');
            } else {
                alert('No token received');
            }
        } catch (err) {
            console.error('Login error:', err.response?.data);
            alert('Admin login failed: ' + (err.response?.data?.message || 'Unknown error'));
        }
    };


    return (
        <div className="container">
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button style={{ backgroundColor: "#4a90e2" }} type="submit">Login as Admin</button>
            </form>
        </div>
    );
}

export default AdminLogin;