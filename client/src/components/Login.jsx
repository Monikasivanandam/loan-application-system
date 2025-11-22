import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/App.css"
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setEmail('');
        setPassword('');
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            navigate('/home');
        } catch (err) {
            alert('Login failed: ' + (err.response?.data?.message || 'Unknown error'));
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="off"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="off"
                />
                <button className="btn-bl" type="submit">Login</button>
            </form>
            <a href="/register" style={{textDecoration:"underline"}}>Don't have an account? Register</a>
            <Link style={{textDecoration:"underline"}} to="/admin-login">Admin</Link>
            {/* <Link style={{textDecoration:"underline"}} to="/admin-dashboard">Admin dashboard</Link> */}
        </div>
    );
}

export default Login;